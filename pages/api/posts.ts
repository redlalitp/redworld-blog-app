import { NextApiRequest, NextApiResponse } from 'next';
import {adminClientPromise, clientPromise} from '../../lib/mongodb';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get the current user session
    const session = await getServerSession(req, res, authOptions);

    // Handle GET request (fetch posts)
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db("redworld-blog-app");

            // Fetch posts from the posts collection
            const posts = await db.collection("posts").find({}).sort({ date: -1 }).toArray();

            res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: "Failed to fetch posts" });
        }
    }

    // Handle POST request (create new post)
    else if (req.method === 'POST') {
        // Check if user is authenticated
        if (!session) {
            return res.status(401).json({ error: "You must be signed in to create a post" });
        }

        try {
            const client = await clientPromise;
            let db = client.db("redworld-blog-app");

            // Get user from database to check privileges
            const userEmail = session.user.email;
            const user = await db.collection("users").findOne({ email: userEmail });

            // Check if user has dbAdmin privilege
            if (!user || user.role !== 'admin') {
                return res.status(403).json({
                    error: "Only users with admin privilege can create posts"
                });
            }

            console.log("reached here");
            // user has admin privileges
            const adminClient = await adminClientPromise;
            db = adminClient.db("redworld-blog-app");

            console.log(`User has admin privileges: ${adminClient}`);

            // Extract post data from request body
            const { title, text, date, image } = req.body;

            if (!title || !text) {
                return res.status(400).json({ error: "Title and text are required" });
            }

            // Create new post document
            const newPost = {
                title,
                text,
                author: session.user.name,
                date: date? date : new Date(),
                image: image? image : "default.png",
            };

            // Insert post into database
            const result = await db.collection("posts").insertOne(newPost);

            console.log("New post created:", newPost);

            res.status(201).json({
                success: true,
                post: {
                    _id: result.insertedId,
                    ...newPost
                }
            });
        } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ error: "Failed to create post" });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}