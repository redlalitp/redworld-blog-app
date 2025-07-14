import { GetServerSideProps } from 'next';
import { ObjectId } from 'mongodb';
import {clientPromise} from '../../lib/mongodb';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;

    try {
        const client = await clientPromise;
        const db = client.db("redworld-blog-app");

        // Convert string ID to MongoDB ObjectId
        const objectId = new ObjectId(id as string);

        // Fetch the post by ID
        const post = await db.collection("posts").findOne({ _id: objectId });

        // If post not found, return 404
        if (!post) {
            return {
                notFound: true
            };
        }

        // Convert MongoDB _id to string for serialization
        return {
            props: {
                post: JSON.parse(JSON.stringify({
                    ...post,
                    _id: post._id.toString()
                }))
            }
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            notFound: true
        };
    }
}