"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { PostCard } from "./post-card";
import Link from "next/link";

// Define a type for our post
export interface Post {
    _id: string;
    title: string;
    text: string;
    date?: Date;
    author?: string;
}

export const Posts = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Post creation form states
    const [showPostForm, setShowPostForm] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts. Please try again later.');
            setLoading(false);
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();

        if (!postTitle.trim() || !postText.trim()) {
            setFormError('Title and content are required');
            return;
        }

        setIsSubmitting(true);
        setFormError('');

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: postTitle,
                    text: postText,
                }),
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create post');
            }

            // Clear the form
            setPostTitle('');
            setPostText('');
            setShowPostForm(false);

            // Refresh posts
            await fetchPosts();
        } catch (err) {
            console.error('Error creating post:', err);
            setFormError(err.message || 'Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchPostLikesCount = async (post) => {
        try {
            const response = await fetch(`/api/likeCount?postId=${post._id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load posts. Please try again later.');
            setLoading(false);
        }
    };

    // Text markup functions
    const insertMarkup = (markupType) => {
        const textarea = document.getElementById('post-text') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let newText = '';

        switch (markupType) {
            case 'bold':
                newText = `**${selectedText}**`;
                break;
            case 'italic':
                newText = `*${selectedText}*`;
                break;
            case 'heading':
                newText = `# ${selectedText}`;
                break;
            case 'link':
                newText = `[${selectedText}](url)`;
                break;
            case 'list':
                newText = `\n- ${selectedText}`;
                break;
            case 'code':
                newText = `\`${selectedText}\``;
                break;
            default:
                return;
        }

        const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
        setPostText(newValue);

        // Set focus back to textarea and position cursor after the inserted markup
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + newText.length, start + newText.length);
        }, 0);
    };

    if (loading) {
        return <div className="text-center p-4">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>

            {session && session.user.role === 'admin' ? (
                <>
                    <button
                        onClick={() => setShowPostForm(!showPostForm)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {showPostForm ? 'Cancel' : 'Add Post'}
                    </button>

                    {showPostForm && (
                        <div className="mt-4 p-4 border rounded-lg">
                            <h3 className="text-xl font-semibold mb-3">Create New Post</h3>

                            {formError && (
                                <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmitPost}>
                                <div className="mb-4">
                                    <label htmlFor="post-title" className="block mb-1 font-medium">
                                        Title
                                    </label>
                                    <input
                                        id="post-title"
                                        type="text"
                                        value={postTitle}
                                        onChange={(e) => setPostTitle(e.target.value)}
                                        className="w-full border rounded p-2"
                                        placeholder="Enter post title"
                                        required
                                    />
                                </div>

                                <div className="mb-2">
                                    <label htmlFor="post-text" className="block mb-1 font-medium">
                                        Content
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2 bg-gray-100 p-2 rounded">
                                        <button
                                            type="button"
                                            onClick={() => insertMarkup('bold')}
                                            className="px-2 py-1 bg-white border rounded hover:bg-gray-200"
                                            title="Bold"
                                        >
                                            <strong>B</strong>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertMarkup('italic')}
                                            className="px-2 py-1 bg-white border rounded hover:bg-gray-200"
                                            title="Italic"
                                        >
                                            <em>I</em>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertMarkup('heading')}
                                            className="px-2 py-1 bg-white border rounded hover:bg-gray-200"
                                            title="Heading"
                                        >
                                            H
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertMarkup('link')}
                                            className="px-2 py-1 bg-white border rounded hover:bg-gray-200"
                                            title="Link"
                                        >
                                            🔗
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertMarkup('list')}
                                            className="px-2 py-1 bg-white border rounded hover:bg-gray-200"
                                            title="List"
                                        >
                                            •
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => insertMarkup('code')}
                                            className="px-2 py-1 bg-white border rounded hover:bg-gray-200"
                                            title="Code"
                                        >
                                            &lt;/&gt;
                                        </button>
                                    </div>
                                    <textarea
                                        id="post-text"
                                        value={postText}
                                        onChange={(e) => setPostText(e.target.value)}
                                        className="w-full border rounded p-2"
                                        rows={8}
                                        placeholder="Write your post content here... Use the formatting buttons above to add markup."
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Supports Markdown: **bold**, *italic*, # heading, [link](url), - list item, `code`
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            ) : (<h3></h3>)
            }

            {posts.length === 0 ? (
                <div className="text-center p-4">No posts found.</div>
            ) : (
                <div className="flex justify-evenly">
                    {posts.map((post) => (
                        <Link href={`/blog/${post._id}`} key={post._id}>
                            <PostCard post={post}></PostCard>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};