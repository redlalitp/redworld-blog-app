import { PostcardFooter } from "./postcard-footer";

export const PostCard = ({ post }) => {
    return (
        <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-[#2b2b2b] border border-[#3c3f41] transition hover:shadow-xl hover:border-[#4e5254]">
            <img
                className="w-full h-40 object-cover"
                src="images/pawn-king.jpg"
                alt="Post image"
            />

            <div className="px-6 py-4">
                <h2 className="font-semibold text-lg text-gray-100 mb-2 truncate">
                    {post.title}
                </h2>
                <p className="text-sm text-gray-400 line-clamp-3">
                    {post.text}
                </p>
            </div>

            <div className="px-6 pb-4">
                <PostcardFooter post={post} />
            </div>
        </div>
    );
};
