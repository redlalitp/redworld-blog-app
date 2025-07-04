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
    <div className="mt-4">
        <h4 className="text-lg font-medium">Comments</h4>

        {/* Comment Form - Only visible to signed-in users */}
        {session ? (
            <form onSubmit={handleSubmitComment} className="mt-3 mb-4">
                <div className="flex flex-col">
                    <textarea
                        className="border rounded p-2 mb-2"
                        rows={3}
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 self-end"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </div>
            </form>
        ) : (
            <p className="text-sm text-gray-500 mt-2 mb-4">
                Please <a href="#" onClick={() => signIn()} className="text-blue-500 hover:underline">sign in</a> to add
                a comment.
            </p>
        )}

        {loading && <p className="text-sm text-gray-500">Loading comments...</p>}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && comments.length === 0 && (
            <p className="text-sm text-gray-500">No comments yet</p>
        )}

        {comments.map((comment) => (
            <div key={comment._id} className="border-t mt-2 pt-2">
                <p className="text-sm">{comment.text}</p>
                {comment.author && <p className="text-xs text-gray-600">By: {comment.author}</p>}
                {comment.date && (
                    <p className="text-xs text-gray-500">
                        {new Date(comment.date).toLocaleDateString()}
                    </p>
                )}
            </div>
        ))}
    </div>
)
}