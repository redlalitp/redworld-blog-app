"use client"

import { useState, useEffect } from 'react';
import {PostDetails} from "./post-details";
import {PostCard} from "./post-card";
import Link from "next/link";

// Define a type for our post
export interface Post {
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
                <Link href={`/blog/${post._id}`} key={post._id}>
                    <PostCard post={post}></PostCard>
                </Link>
            ))}
        </div>
    );
};