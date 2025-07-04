import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from "bson";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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

            // Fetch comments for a specific post from collection
            const comments = await db.collection("comments")
                .find({ post_id: new ObjectId(postId.toString()) })
                .sort({ date: -1 })
                .toArray();

            res.status(200).json(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ error: "Failed to fetch comments" });
        }
    }
    // Handle POST request (add new comment)
    else if (req.method === 'POST') {
        // Check if user is authenticated
        if (!session) {
            return res.status(401).json({ error: "You must be signed in to comment" });
        }

        try {
            const { postId, text } = req.body;

            if (!postId || !text) {
                return res.status(400).json({ error: "Post ID and comment text are required" });
            }

            const client = await clientPromise;
            const db = client.db("redworld-blog-app");

            // Create new comment document
            const newComment = {
                post_id: new ObjectId(postId),
                text: text,
                author: session.user.name,
                date: new Date(),
                user_email: session.user.email
            };

            // Insert comment into database
            const result = await db.collection("comments").insertOne(newComment);

            res.status(201).json({
                success: true,
                comment: {
                    _id: result.insertedId,
                    ...newComment
                }
            });
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ error: "Failed to add comment" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}