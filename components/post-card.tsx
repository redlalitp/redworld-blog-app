import {PostcardFooter} from "./postcard-footer";

export const PostCard = ({post}) => {
    return(
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src="images/pawn-king.jpg" alt="Sunset in the mountains"/>
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{post.title}</div>
            <p className="text-gray-700 text-base truncate">
                {post.text}
            </p>
        </div>
        <PostcardFooter post={post}></PostcardFooter>
    </div>
    )
}