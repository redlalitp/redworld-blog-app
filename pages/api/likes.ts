import { NextApiRequest, NextApiResponse } from 'next';
import {clientPromise} from '../../lib/mongodb';
import { ObjectId } from "mongodb";
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
            const likes = await db.collection("likes")
                .find({ post_id: new ObjectId(postId.toString()) })
                .sort({ date: -1 })
                .toArray();

            res.status(200).json(likes);
        } catch (error) {
            console.error("Error fetching likes:", error);
            res.status(500).json({ error: "Failed to fetch likes" });
        }
    }



    // Handle POST request (add new like)
    else if (req.method === 'POST') {
        // Check if user is authenticated
        if (!session) {
            return res.status(401).json({ error: "You must be signed in to like a post" });
        }

        try {
            const { postId } = req.body;

            if (!postId ) {
                return res.status(400).json({ error: "Post ID is required" });
            }

            const client = await clientPromise;
            const db = client.db("redworld-blog-app");

            // Create new like document
            const newLike = {
                post_id: new ObjectId(postId),
                author: session.user.name,
                date: new Date(),
                user_email: session.user.email
            };

            // Insert like into database
            const result = await db.collection("likes").insertOne(newLike);

            res.status(201).json({
                success: true,
                comment: {
                    _id: result.insertedId,
                    ...newLike
                }
            });
        } catch (error) {
            console.error("Error adding like:", error);
            res.status(500).json({ error: "Failed to add like" });
        }
    }
    // Handle DELETE request (remove like)
    else if (req.method === 'DELETE') {
        console.log("inside delete like route");

        // Check if user is authenticated
        if (!session) {
            return res.status(401).json({ error: "You must be signed in to remove a like on post" });
        }

        try {
            let { postId } = req.body;

            if (!postId ) {
                return res.status(400).json({ error: "Post ID is required" });
            }

            const client = await clientPromise;
            const db = client.db("redworld-blog-app");

            const userEmail = session.user.email;
            console.log("userEmail:", userEmail);
            console.log("postId:", postId);

            postId = new ObjectId(postId);

            // Delete like from database
            const result = await db.collection("likes").deleteOne({"post_id": postId, "user_email":userEmail});

            console.log("result:", result);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Like not found or already deleted" });
            }

            return res.status(200).json({ message: "Like removed successfully" });
        } catch (error) {
            console.error("Error removing like:", error);
            res.status(500).json({ error: "Failed to remove like" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}