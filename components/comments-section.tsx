import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {ObjectId} from "bson";
import {Post} from "./posts";

// Define a type for our comment
interface Comment {
    _id: ObjectId;
    post_id: string;
    text: string;
    author?: string;
    date?: Date;
}


export const CommentsSection = ({post}:{post:Post}) => {
    const { data: session } = useSession();

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?postId=${post._id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: post._id,
                    text: commentText,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            // Clear the form
            setCommentText('');

            // Refresh comments
            await fetchComments();

        } catch (err) {
            console.error('Error adding comment:', err);
            setError('Failed to add comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8 text-gray-300">
            <h4 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2 mb-4">
                Comments
            </h4>

            {/* Comment Form */}
            {session ? (
                <form
                    onSubmit={handleSubmitComment}
                    className="mb-6 bg-[#2f2f2f] border border-[#3c3f41] p-4 rounded-lg shadow"
                >
                    <label htmlFor="comment" className="sr-only">
                        Write a comment
                    </label>
                    <textarea
                        id="comment"
                        className="bg-[#1e1e1e] text-gray-200 border border-[#444] rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3 resize-none"
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
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-blue-400 disabled:cursor-not-allowed transition"
                        >
                            {isSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-sm text-gray-400 mb-6">
                    Please{" "}
                    <a
                        href="#"
                        onClick={() => signIn()}
                        className="text-blue-400 hover:underline"
                    >
                        sign in
                    </a>{" "}
                    to add a comment.
                </p>
            )}

            {/* Loading / Error / Empty States */}
            {loading && (
                <p className="text-sm text-gray-400 italic mb-4">Loading comments...</p>
            )}
            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
            {!loading && !error && comments.length === 0 && (
                <p className="text-sm text-gray-500 italic mb-4">No comments yet.</p>
            )}
        <div className="space-y-4">
            {comments.map((comment) => (
                <div
                    key={comment._id}
                    className="bg-[#2a2a2a] border border-[#3f3f3f] p-4 rounded-lg flex items-start space-x-4"
                >
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

                    {/* Text Content */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-200">{comment.text}</p>
                        <div className="text-xs text-gray-500 mt-2">
                            {comment.author && <p>By: {comment.author}</p>}
                            {comment.date && (
                                <p>{new Date(comment.date).toLocaleDateString()}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}