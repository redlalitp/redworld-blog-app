import { NextApiRequest, NextApiResponse } from 'next';
import {clientPromise} from '../../../lib/mongodb';
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get user session to check authentication
    const session = await getServerSession(req, res, authOptions);


    // Handle GET request (fetch comments)
    if (req.method === 'GET') {
        try {
            const { postId } = req.query;

            if (!postId) {
                return res.status(400).json({ error: "Post ID is required" });
            }

            const client = await clientPromise;
            const db = client.db("redworld-blog-app");

            // Fetch commentsCount for a specific post from collection
            const commentsCount = await db.collection("comments")
                .countDocuments({ post_id: new ObjectId(postId.toString()) })

            res.status(200).json(commentsCount);
        } catch (error) {
            console.error("Error fetching commentsCount:", error);
            res.status(500).json({ error: "Failed to fetch commentsCount" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}