import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ObjectId } from "bson";
import { Post } from "./posts";
import {TiDelete} from "react-icons/ti";
import {IoSend} from "react-icons/io5";

// Extended Comment type with user_email
interface Comment {
    _id: ObjectId;
    post_id: string;
    text: string;
    author?: string;
    authorImage?: string;
    user_email: string;
    date?: Date;
}

export const CommentsSection = ({ post }: { post: Post }) => {
    const { data: session } = useSession();

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?postId=${post._id}`);
            if (!response.ok) throw new Error('Failed to fetch comments');
            const data = await response.json();
            setComments(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError('Failed to load comments');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post._id]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: post._id, text: commentText }),
            });

            if (!response.ok) throw new Error('Failed to add comment');
            setCommentText('');
            await fetchComments();
        } catch (err) {
            console.error('Error adding comment:', err);
            setError('Failed to add comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        setDeletingId(commentId);

        try {
            const response = await fetch('/api/comments', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId }),
            });

            if (!response.ok) throw new Error('Failed to delete comment');
            await fetchComments();
        } catch (err) {
            console.error('Error deleting comment:', err);
            setError('Failed to delete comment');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            {session ? (
                <form onSubmit={handleSubmitComment} className="mb-6 bg-[#2f2f2f] border border-[#3c3f41] p-4 rounded-lg shadow">
                    <textarea
                        id="comment"
                        className="bg-[#1e1e1e] text-gray-200 border border-[#444] rounded-md p-3 w-full focus:ring-blue-500 mb-3 resize-none"
                        rows={4}
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                    />
                    <div className="text-right">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-blue-400"
                        >
                            {isSubmitting ? "Posting..." : <IoSend />}
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-sm text-gray-400 mb-6">
                    Please <a href="#" onClick={() => signIn()} className="text-blue-400 hover:underline">sign in</a> to add a comment.
                </p>
            )}

            {loading && <p className="text-sm text-gray-400 italic mb-4">Loading comments...</p>}
            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
            {!loading && !error && comments.length === 0 && (
                <p className="text-sm text-gray-500 italic mb-4">No comments yet.</p>
            )}

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment._id.toString()} className="bg-[#2a2a2a] border border-[#3f3f3f] p-4 rounded-lg flex items-start space-x-4">
                        {/* Avatar */}
                        <div>
                            {comment.authorImage ? (
                                <img
                                    src={comment.authorImage}
                                    alt={comment.author || "Avatar"}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center font-semibold text-sm border border-gray-600">
                                    {comment.author?.charAt(0).toUpperCase() || "?"}
                                </div>
                            )}
                        </div>

                        {/* Comment Body */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-200">{comment.text}</p>
                            <div className="text-xs text-gray-500 mt-2 space-x-2 flex items-center">
                                {comment.author && <span>By: {comment.author}</span>}
                                {comment.date && <span>{new Date(comment.date).toLocaleDateString()}</span>}
                            </div>
                        </div>

                        {/* Delete Button */}
                        {session?.user?.email === comment.user_email && (
                            <div className="ml-auto text-sm">
                                <button
                                    onClick={() => handleDeleteComment(comment._id.toString())}
                                    disabled={deletingId === comment._id.toString()}
                                    className="text-red-400 hover:text-red-600 disabled:text-gray-500"
                                    title="Delete comment"
                                >
                                    {deletingId === comment._id.toString() ? 'Deleting...' : <TiDelete className="w-5 h-5" />}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
