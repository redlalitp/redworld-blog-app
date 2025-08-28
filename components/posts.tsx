"use client"

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { PostCard } from "./post-card";
import Link from "next/link";
import {MdPostAdd} from "react-icons/md";

// Define a type for our post
export interface Post {
    _id: string;
    title: string;
    text: string;
    date?: Date;
    author?: string;
    image: string;
    likes: number;
    user_email: string;
    comments: {
        _id: string;
        post_id: string;
    }
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

    // Effect for vertical-to-horizontal scroll translation
    useEffect(() => {
        let rafId: number | null = null;
        let running = false;

        // Animated state
        let current = 0; // current animated scrollLeft
        let target = 0;  // target scrollLeft

        // Tunables
        const SMOOTHING = 0.2; // 0.08–0.25; higher = snappier
        const EPSILON = 0.8;    // when to stop animating (px difference)

        const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const postsContainer = document.getElementById('posts-container') as HTMLDivElement | null;
        const mainContainer = document.querySelector('main') as HTMLElement | null;
        if (!postsContainer || !mainContainer) return;

        const animate = () => {
            const delta = target - current;
            if (Math.abs(delta) > EPSILON) {
                // Simple exponential smoothing toward target
                current += delta * SMOOTHING;
                postsContainer.scrollLeft = current;
                rafId = requestAnimationFrame(animate);
            } else {
                // Snap to final pixel and stop
                current = target;
                postsContainer.scrollLeft = current;
                running = false;
                rafId = null;
            }
        };

        const start = () => {
            if (!running) {
                running = true;
                rafId = requestAnimationFrame(animate);
            }
        };

        const handleScroll = () => {
            // Calculate eased vertical scroll percentage
            const maxV = Math.max(1, mainContainer.scrollHeight - mainContainer.clientHeight);
            const rawPct = Math.min(1, Math.max(0, mainContainer.scrollTop / maxV));
            const easedPct = easeInOutCubic(rawPct);

            // Map to horizontal
            const maxH = Math.max(0, postsContainer.scrollWidth - postsContainer.clientWidth);
            target = easedPct * maxH;

            // Kick the short animation toward the new target
            start();
        };

        // Initialize current to whatever the container is at
        current = postsContainer.scrollLeft || 0;
        // Do an initial sync so it's smooth from first frame
        handleScroll();

        mainContainer.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            mainContainer.removeEventListener('scroll', handleScroll as EventListener);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [posts]);

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
            const response = await fetch(`/api/likes/count?postId=${post._id}`);

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

            {session && session.user.role === 'admin' ? (
                <>
                    <button
                        onClick={() => setShowPostForm(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
                    >
                        <MdPostAdd /> Create Post
                    </button>

                    {/* Dialog Box for Create Post Form */}
                    {showPostForm && (
                        <>
                            {/* Backdrop with blur effect */}
                            <div 
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                onClick={() => setShowPostForm(false)}
                            ></div>

                            {/* Dialog Box */}
                            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                                <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg text-zinc-200 max-w-3xl mx-auto w-full max-h-[90vh] overflow-y-auto">
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-2xl font-bold text-white">📝 Create New Post</h3>
                                            <button 
                                                onClick={() => setShowPostForm(false)}
                                                className="text-zinc-400 hover:text-white"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {formError && (
                                            <div className="mb-4 p-3 bg-red-500/10 text-red-400 border border-red-500 rounded">
                                                {formError}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmitPost}>
                                            {/* Title */}
                                            <div className="mb-6">
                                                <label htmlFor="post-title" className="block mb-1 font-semibold text-sm">
                                                    Title
                                                </label>
                                                <input
                                                    id="post-title"
                                                    type="text"
                                                    value={postTitle}
                                                    onChange={(e) => setPostTitle(e.target.value)}
                                                    className="w-full bg-zinc-800 border border-zinc-600 text-white rounded px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter post title"
                                                    required
                                                />
                                            </div>

                                            {/* Text Editor Controls */}
                                            <div className="mb-4">
                                                <label htmlFor="post-text" className="block mb-1 font-semibold text-sm">
                                                    Content
                                                </label>
                                                <div className="flex flex-wrap gap-2 mb-2 bg-zinc-800 border border-zinc-600 p-3 rounded">
                                                    {[
                                                        { type: "bold", label: "B", title: "Bold" },
                                                        { type: "italic", label: "I", title: "Italic" },
                                                        { type: "heading", label: "H", title: "Heading" },
                                                        { type: "link", label: "🔗", title: "Link" },
                                                        { type: "list", label: "•", title: "List" },
                                                        { type: "code", label: "< />", title: "Code" },
                                                    ].map((btn) => (
                                                        <button
                                                            key={btn.type}
                                                            type="button"
                                                            onClick={() => insertMarkup(btn.type)}
                                                            className="text-sm bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded border border-zinc-600 transition"
                                                            title={btn.title}
                                                        >
                                                            {btn.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Textarea */}
                                                <textarea
                                                    id="post-text"
                                                    value={postText}
                                                    onChange={(e) => setPostText(e.target.value)}
                                                    className="w-full bg-zinc-800 border border-zinc-600 text-white rounded px-3 py-2 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    rows={8}
                                                    placeholder="Write your post content here... Use the formatting buttons above."
                                                    required
                                                />
                                                <p className="text-xs text-zinc-400 mt-1">
                                                    Markdown supported: **bold**, *italic*, # heading, [link](url), - list item, `code`
                                                </p>
                                            </div>

                                            {/* Submit and Cancel Buttons */}
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPostForm(false)}
                                                    className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium px-5 py-2 rounded shadow transition"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow disabled:bg-blue-400 transition"
                                                >
                                                    {isSubmitting ? "Creating..." : "Create Post"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (<h3></h3>)
            }

            {posts.length === 0 ? (
                <div className="text-center p-4 scroll-auto">No posts found.</div>
            ) : (
                <div 
                    id="posts-container"
                    className="flex flex-nowrap gap-6 pb-4 snap-none"
                    style={{ 
                        scrollBehavior: 'smooth',
                        willChange: 'scroll-position',
                        overscrollBehaviorX: 'contain',
                        overflow: 'hidden',
                        scrollSnapType: 'none'
                    }}
                >
                    {posts.map((post, index) => (
                        <Link 
                            href={`/blog/${post._id}`} 
                            key={post._id} 
                            className="flex-shrink-0 min-w-[300px]"
                        >
                            <PostCard post={post}></PostCard>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
