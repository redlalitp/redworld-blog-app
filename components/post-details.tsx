"use client";

import {Post} from "./posts";
import {CommentsSection} from "./comments-section";
import {PostSocialArea} from "./post-social-area";


export const PostDetails = ({ post }:{post:Post}) => {

    return (
        <div key={post._id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="mt-2">{post.text}</p>
            {post.date && (
                <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.date).toLocaleDateString()}
                </p>
            )}
            <PostSocialArea post={post}></PostSocialArea>
            <CommentsSection post={post}></CommentsSection>
        </div>
    );
};
