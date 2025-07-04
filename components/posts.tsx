"use client"

import { useState, useEffect } from 'react';
import {PostDetails} from "./post-details";

// Define a type for our post
interface Post {
    _id: string;
    title: string;
    text: string;
    date?: Date;
    // Add any other fields your posts might have
}

export const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center p-4">No posts found.</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.map((post) => (
                <PostDetails key={post._id} post={post}></PostDetails>
            ))}
        </div>
    );
};