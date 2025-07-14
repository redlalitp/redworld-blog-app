"use client";

import { Post } from "./posts";
import { CommentsSection } from "./comments-section";
import { PostSocialArea } from "./post-social-area";
import {useBackground} from "../lib/background-context";
import {useEffect} from "react";

export const PostDetails = ({ post }: { post: Post }) => {

    const { setBackground } = useBackground();

    useEffect(() => {
        setBackground(post.image);

        // Optional cleanup
        return () => setBackground('16');
    }, [post, setBackground]);

    return (
        <div
            key={post._id}
            className="justify-self-center max-w-3xl bg-[#2b2b2b] text-gray-200 border border-[#3c3f41] p-6 my-3 rounded-xl shadow-md transition hover:shadow-lg"
        >
            {/* Post Title */}
            <h3 className="text-2xl font-semibold text-gray-100 mb-3 tracking-tight">
                {post.title}
            </h3>

            {/* Post Body */}
            <p className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                {post.text}
            </p>

            {/* Post Date */}
            {post.date && (
                <p className="text-xs text-gray-500 mt-4">
                    Posted on {new Date(post.date).toLocaleDateString()}
                </p>
            )}

            {/* Likes, comments, etc. */}
            <div className="mt-6">
                <PostSocialArea post={post} />
            </div>

            {/* Comments */}
            <div className="mt-8">
                <CommentsSection post={post} />
            </div>
        </div>
    );
};
