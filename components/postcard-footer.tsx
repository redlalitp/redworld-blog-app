import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Post} from "./posts";
import {AiFillLike} from "react-icons/ai";
import {FcComments} from "react-icons/fc";


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
        fetchLikesCount().then(r => console.log(r));
        fetchCommentsCount().then(r => console.log(r));
    }, [post._id]);



    return (
        <div className="mt-4 text-sm text-gray-400">
            {loading && <p>Loading footer...</p>}
            {error && <p className="text-red-400">{error}</p>}
            {/*{!loading && !error && !likesCount && (*/}
            {/*    <p className="italic text-gray-500">Not likeable, maybe!</p>*/}
            {/*)}*/}

            <div className="flex justify-between items-center px-6 pt-4 pb-2 mt-4">
                {/* Likes Section */}
                <div className="flex items-center space-x-2">
                    <AiFillLike className="w-5 h-5 text-pink-600"/>
                    <span className="text-sm text-gray-300 font-medium">{likesCount}</span>
                </div>

                {/* Comments Section */}
                <div className="flex items-center space-x-2">
                    <FcComments className="w-5 h-5"/>
                    <span className="text-sm text-gray-300 font-medium">{commentsCount}</span>
                </div>
            </div>
        </div>

    )
}