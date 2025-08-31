"use client";

import { Post } from "./posts";
import { CommentsSection } from "./comments-section";
import { PostSocialArea } from "./post-social-area";
import {useBackground} from "../lib/background-context";
import {useEffect} from "react";
import {formatDDMMYYYY, formatLong, parseDateWithOrdinal} from "../utils/utils";

export const PostDetails = ({ post }: { post: Post }) => {

    const { setBackground } = useBackground();

    useEffect(() => {
        setBackground(post.image);

        // Optional cleanup
        return () => setBackground('bk1');
    }, [post, setBackground]);

    return (
        <div
            key={post._id}
            className="flex flex-col max-w-3xl h-full overflow-auto bg-[#2b2b2b]/70 backdrop-blur-sm text-gray-200 border border-[#3c3f41] p-6 m-3 rounded-xl shadow-md transition hover:shadow-lg"
        >
            {/* Post Title */}
            <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-100 mb-1 tracking-tight">
                    {post.title}
                </h3>
                {/* Post Date */}
                {post.date && (
                    <p className="text-xs text-gray-500 mb-3">
                        Posted on {formatLong(parseDateWithOrdinal(post.date))}
                    </p>
                )}
            </div>
            <div className="max-h-1/2 h-fit overflow-auto  p-2">
                <div className="">
                    {/* Post Body */}
                    <p className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                        {post.text}
                    </p>
                </div>

            </div>

            {/* Likes, comments, etc. */}
            <div className="h-fit mt-6 bg-[#2b2b2b]/50 p-2">
                <PostSocialArea post={post} />
            </div>

            {/* Comments */}
            <div className="mt-3 text-gray-300">
                <h4 className="text-xl font-semibold text-gray-100 border-b border-gray-700 mb-4">Comments</h4>
            </div>
            <div className="grow h-1/3 overflow-auto">
                <CommentsSection post={post} />
            </div>
        </div>
    );
};
