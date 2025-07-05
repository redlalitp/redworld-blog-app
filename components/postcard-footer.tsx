import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Post} from "./posts";


export const PostcardFooter = ({post}:{post:Post}) => {
    const { data: session } = useSession();

    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchLikesCount = async () => {
        try {
            const response = await fetch(`/api/likes/count?postId=${post._id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch likes count');
            }

            const data = await response.json();
            setLikesCount(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching likes count:', err);
            setError('Failed to load likes count');
            setLoading(false);
        }
    };

    const fetchCommentsCount = async () => {
        try {
            const response = await fetch(`/api/comments/count?postId=${post._id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch comments count');
            }

            const data = await response.json();
            setCommentsCount(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching comments count:', err);
            setError('Failed to load comments count');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLikesCount();
        fetchCommentsCount();
    }, [post._id]);



    return (
        <div className="mt-4 text-sm text-gray-400">
            {loading && <p>Loading footer...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {!loading && !error && !likesCount && (
                <p className="italic text-gray-500">Not likeable, maybe!</p>
            )}

            <div className="flex justify-between items-center px-6 pt-4 pb-2 border-t border-gray-700 mt-4">
                {/* Likes Section */}
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-pink-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904"
                        />
                    </svg>
                    <span className="text-sm text-gray-300 font-medium">{likesCount}</span>
                </div>

                {/* Comments Section */}
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-blue-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                    </svg>
                    <span className="text-sm text-gray-300 font-medium">{commentsCount}</span>
                </div>
            </div>
        </div>

    )
}