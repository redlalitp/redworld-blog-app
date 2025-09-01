import { ObjectId } from 'mongodb';
import { clientPromise } from '../../lib/mongodb';
import { PostDetails } from "../../components/post-details";
import { Post } from "../../components/posts";
import { Nav } from "../../components/nav";

export default function PostDetail({ post }: { post: Post }) {
    return (
        <div className="w-lvw h-svh flex flex-col">
            <Nav />
            <PostDetails post={post} />
        </div>
    );
}

// Use SSR for this dynamic route.
// Ensure there is NO getStaticProps or getStaticPaths exported from this file.
export async function getServerSideProps(context: { params: { id: string } }) {
    const { id } = context.params;

    try {
        const client = await clientPromise;
        const db = client.db("redworld-blog-app");

        const objectId = new ObjectId(id as string);
        const post = await db.collection("posts").findOne({ _id: objectId });

        if (!post) {
            return { notFound: true };
        }

        return {
            props: {
                post: JSON.parse(JSON.stringify({
                    ...post,
                    _id: post._id.toString(),
                })),
            },
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return { notFound: true };
    }
}