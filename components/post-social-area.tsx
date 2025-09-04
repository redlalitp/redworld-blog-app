import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {ObjectId} from "bson";
import {Post} from "./posts";
import {SocialShareButtons} from "./social-share-buttons";

// Define a type for our Like
interface Like {
    _id: ObjectId;
    post_id: string;
    author?: string;
    user_email: string;
    date?: Date;
}


export const PostSocialArea = ({post}:{post:Post}) => {
    const { data: session } = useSession();

    const [likes, setLikes] = useState<Like[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userLikedPost, setUserLikedPost] = useState(false);

    const fetchLikeStatus = async () => {
        console.log("Fetching like status");
        try {
            const res = await fetch(`/api/likes/check?postId=${post._id}`);
            console.log("Got response", res);
            const data = await res.json();

            setUserLikedPost(data.liked); // should be true or false
        } catch (err) {
            console.error("Failed to check like status:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLikes = async () => {
        try {
            const response = await fetch(`/api/likes?postId=${post._id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch likes');
            }

            const data = await response.json();
            setLikes(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching likes:', err);
            setError('Failed to load likes');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, [post._id]);

    useEffect(() => {
        fetchLikeStatus();
    }, [post._id]);

    const handleSubmitLike = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        if(userLikedPost) {
            try {
                const response = await fetch('/api/likes', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: post._id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to remove like');
                }

                // Refresh likes
                await fetchLikeStatus();
                await fetchLikes();

            } catch (err) {
                console.error('Error removing like:', err);
                setError('Failed to remove like. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
        else {

            try {
                const response = await fetch('/api/likes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        postId: post._id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to add like');
                }

                // Refresh likes
                await fetchLikeStatus();
                await fetchLikes();

            } catch (err) {
                console.error('Error adding like:', err);
                setError('Failed to add like. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleMobileShare = async () => {
        const url = `${window.location.origin}/blog/${post._id}`;
        try {
            if (navigator.share) {
                await navigator.share({ title: post.title, url });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                alert("Link copied!");
            } else {
                alert(url);
            }
        } catch {
            // ignore if user cancels
        }
    };

    return (
        <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
            {session ? (
                <form onSubmit={handleSubmitLike}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center gap-1 sm:gap-2 rounded-md transition
                            ${userLikedPost
                                ? 'bg-pink-600 hover:bg-pink-700 text-white'
                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                            px-2 py-1 sm:px-4 sm:py-2
                        `}
                        aria-label={userLikedPost ? 'Unlike' : 'Like'}
                        title={userLikedPost ? 'Unlike' : 'Like'}
                    >
                        {/* Like Icon */}
                        {userLikedPost ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777Z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904"
                                />
                            </svg>
                        )}

                        {/* Label hidden on mobile for compactness */}
                        <span className="hidden sm:inline text-sm font-medium">
                            {userLikedPost ? 'Unlike' : 'Like'}
                        </span>
                    </button>
                </form>
            ) : (
                <>
                    {/* Minimal signed-out control on mobile: small sign-in icon button */}
                    <button
                        onClick={() => signIn()}
                        className="sm:hidden inline-flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 px-2 py-1"
                        aria-label="Sign in to like"
                        title="Sign in to like"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm-9 9a9 9 0 0 1 18 0H3Z" />
                        </svg>
                    </button>
                    {/* Full prompt on tablet/desktop */}
                    <div className="hidden sm:flex text-sm text-gray-400 items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632..." />
                        </svg>
                        <button onClick={() => signIn()} className="underline hover:text-gray-300">
                            Please sign in to like this post
                        </button>
                    </div>
                </>
            )}

            {/* Minimal status on mobile: hide to save space */}
            {loading && (
                <p className="hidden sm:block text-sm text-gray-400 italic mb-0">Loading likes...</p>
            )}
            {error && <p className="hidden sm:block text-sm text-red-400 mb-0">{error}</p>}

            {/* Like count: compact on mobile */}
                <div className="text-xs sm:text-sm text-gray-400 mx-1 sm:mx-2">
                    <span className="sm:hidden">{likes.length}</span>
                    <span className="hidden sm:inline">
                        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
                    </span>
                </div>
            </div>

            {/* Share: mobile gets a tiny single button; tablet/desktop show full buttons */}
            <div className="flex items-center">
                <button
                    onClick={handleMobileShare}
                    className="sm:hidden inline-flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200 px-2 py-1"
                    aria-label="Share"
                    title="Share"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 8a3 3 0 1 0-2.816-4H15a3 3 0 0 0 .184 1.02l-7.1 3.55A3 3 0 0 0 6 8a3 3 0 0 0 2.082.57l7.102 3.55A3 3 0 0 0 15 13h.184A3 3 0 1 0 18 8Z" />
                    </svg>
                </button>
                <div className="hidden sm:block">
                    <SocialShareButtons title={post.title} url={`http://localhost:3000/blog/${post._id}`}/>
                </div>
            </div>

        </div>


)
}