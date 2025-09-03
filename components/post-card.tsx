import { PostcardFooter } from "./postcard-footer";

export const PostCard = ({ post }) => {
    return (
        <div className="group flex flex-col w-[86vw] sm:w-96 h-full rounded-xl overflow-hidden shadow-md bg-gradient-to-t from-zinc-900/90 to-transparent border border-[#3c3f41] transition hover:shadow-xl hover:border-[#4e5254]">

            {/* Image */}
            <div className="relative w-full h-40 md:h-44 overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                    src={`images/${post.image}.jpg`}
                    alt="Post image"
                />
                <div className="absolute inset-0 "></div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-3 py-3 md:px-5 md:py-4">
                <h2 className="font-bold text-base md:text-lg text-white mb-1 md:mb-2 line-clamp-2 leading-snug">
                    {post.title}
                </h2>
                <p className="text-xs md:text-sm text-zinc-200 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {post.text}
                </p>
            </div>

            {/* Footer */}
            <div className="px-3 py-2 md:px-5 md:py-3 border-t border-zinc-700">
                <PostcardFooter post={post} />
            </div>
        </div>
    );
};
