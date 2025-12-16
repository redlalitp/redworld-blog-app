import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { clientPromise } from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    console.log("session:", session);
    if (!session?.user?.email) {
        return;
    }

    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
        return res.status(400).json({ liked: false, message: "Missing postId" });
    }

    try {
        const client = await clientPromise;
        const db = client.db("redworld-blog-app");

        console.log("postId:", postId);

        const like = await db.collection("likes").findOne({
            post_id: new ObjectId(postId),
            user_email: session.user.email,
        });

        console.log("like:", like);

        return res.status(200).json({ liked: !!like });
    } catch (error) {
        console.error("Check like error:", error);
        return res.status(500).json({ liked: false });
    }
}
