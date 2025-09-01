"use client";

import { useState, useEffect } from "react";
import { Post } from "./posts";
import { CommentsSection } from "./comments-section";
import { PostSocialArea } from "./post-social-area";
import { useBackground } from "../lib/background-context";
import { formatLong, parseDateWithOrdinal } from "../utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import {MapIcon} from "@heroicons/react/24/outline";
import exifr from "exifr";
import * as url from "node:url";
import imageLocationMetaData from "../utils/image-meta.json";

export const PostDetails = ({ post }: { post: Post }) => {
    const { setBackground } = useBackground();
    const [showImageOnly, setShowImageOnly] = useState(false);
    const [imageMeta, setImageMeta] = useState<any>(null);
    const [imageLocationMeta, setImageLocationMeta] = useState<any>(null);

    // Set background and extract metadata
    useEffect(() => {
        setBackground(post.image);

        const fetchMeta = async () => {
            try {
                if (post.image) {
                    const metadata = await exifr.parse(`../images/${post.image}.jpg`);
                    const imageMetaData = imageLocationMetaData.find(img => img.id === Number.parseInt(post.image));
                    console.log(imageMetaData);
                    if (imageMetaData) {
                        setImageLocationMeta({
                           locationText: imageMetaData.location,
                            mapUrl: imageMetaData.map,
                        })
                    }

                    if (metadata) {
                        setImageMeta({
                            camera: metadata.Make
                                ? `${metadata.Make} ${metadata.Model || ""}`
                                : metadata.Model || "Unknown",
                            resolution:
                                metadata.ImageWidth && metadata.ImageHeight
                                    ? `${metadata.ImageWidth} × ${metadata.ImageHeight}`
                                    : null,
                            date: metadata.DateTimeOriginal || null,
                            location:
                                metadata.GPSLatitude && metadata.GPSLongitude
                                    ? `${metadata.GPSLatitude.toFixed(5)}, ${metadata.GPSLongitude.toFixed(5)}`
                                    : null,
                            exposure: metadata.ExposureTime || null,
                            iso: metadata.ISO || null,
                            focalLength: metadata.FocalLength || null,
                            aperture: metadata.FNumber || null,
                            shutterSpeed: metadata.ShutterSpeedValue || null,
                            lens: metadata.LensModel || null,
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to read EXIF:", err);
            }
        };

        fetchMeta();

        return () => setBackground("bk1");
    }, [post, setBackground]);

    return (
        <div className="relative flex h-full w-full overflow-hidden">
            {/* Toggle Button */}
            <button
                onClick={() => setShowImageOnly((prev) => !prev)}
                className="absolute top-4 right-4 z-30 bg-black/50 text-gray-200 px-4 py-2 rounded-lg hover:bg-black/70 transition"
            >
                {showImageOnly ? "Show Post" : "View Image"}
            </button>

            {/* Background Image Layer */}
            <motion.div
                key="background-image"
                className="absolute inset-0 bg-center bg-no-repeat z-10"
                style={{
                    backgroundImage: `url(/images/${post.image}.jpg)`,
                }}
                animate={
                    showImageOnly
                        ? {
                            width: "70vw",
                            height: "70vh",
                            top: "calc(50% - 35vh)",
                            left: "calc(50% - 35vw)",
                            //boxShadow: "0 2rem 3rem #000",
                            boxShadow: "0px 8px 30px rgba(0,0,0,0.7)",
                            filter: "brightness(1)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: { duration: 0.6, ease: "easeInOut" },
                        }
                        : {
                            width: "100%",
                            height: "100%",
                            top: "0%",
                            left: "0%",
                            boxShadow: "none",
                            filter: "brightness(0.4)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
                {!showImageOnly ? (
                    <motion.div
                        key="post-view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-20 flex flex-col max-w-3xl h-80% overflow-auto bg-[#2b2b2b]/70 backdrop-blur-sm text-gray-200 border border-[#3c3f41] p-6 m-3 rounded-xl shadow-md"
                    >
                        {/* Post Title */}
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-100 mb-1 tracking-tight">
                                {post.title}
                            </h3>
                            {post.date && (
                                <p className="text-xs text-gray-500 mb-3">
                                    Posted on {formatLong(parseDateWithOrdinal(post.date))}
                                </p>
                            )}
                        </div>

                        {/* Post Body */}
                        <div className="max-h-1/2 h-fit overflow-auto p-2">
                            <p className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                                {post.text}
                            </p>
                        </div>

                        {/* Social Area */}
                        <div className="h-fit mt-6 bg-[#2b2b2b]/50 p-2">
                            <PostSocialArea post={post} />
                        </div>

                        {/* Comments */}
                        <div className="mt-3 text-gray-300">
                            <h4 className="text-xl font-semibold text-gray-100 border-b border-gray-700 mb-4">
                                Comments
                            </h4>
                        </div>
                        <div className="grow h-1/3 overflow-auto">
                            <CommentsSection post={post} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="image-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative z-20 flex flex-col justify-end w-full h-full p-6 text-gray-100"
                    >
                        {/* location meta*/}
                        <div className="flex absolute left-1/3 bottom-2 bg-black/70 rounded-lg p-4 max-w-70vw text-md space-y-2">
                            {imageLocationMeta && (
                                <>
                                    {imageLocationMeta.locationText && (
                                        <span>
                                            {imageLocationMeta.locationText}
                                        </span>
                                    )}
                                    {imageLocationMeta.mapUrl && (
                                        <a href={imageLocationMeta.mapUrl} target="_blank" rel="noopener noreferrer"
                                           className="ml-2 inline-flex items-center">
                                            <MapIcon className="h-8 w-8"/>
                                        </a>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Metadata Overlay */}
                        <div className="bg-black/60 rounded-lg p-4 max-w-56 text-sm space-y-2">
                            <p>
                                <strong>Metadata</strong>
                            </p>
                            {imageMeta && (
                                <>
                                    {imageMeta.camera && (
                                        <p>
                                            <strong>Camera:</strong> {imageMeta.camera}
                                        </p>
                                    )}
                                    {imageMeta.lens && (
                                        <p>
                                            <strong>Lens:</strong> {imageMeta.lens.toString()}
                                        </p>
                                    )}
                                    {imageMeta.resolution && (
                                        <p>
                                            <strong>Resolution:</strong> {imageMeta.resolution}
                                        </p>
                                    )}
                                    {imageMeta.location && (
                                        <p>
                                            <strong>Location:</strong> {imageMeta.location}
                                        </p>
                                    )}
                                    {imageMeta.date && (
                                        <p>
                                            <strong>Taken on:</strong> {imageMeta.date.toLocaleString()}
                                        </p>
                                    )}
                                    {imageMeta.iso && (
                                        <p>
                                            <strong>ISO:</strong> {imageMeta.iso.toString()}
                                        </p>
                                    )}
                                    {imageMeta.aperture && (
                                        <p>
                                            <strong>Aperture:</strong> {imageMeta.aperture.toString()}
                                        </p>
                                    )}
                                    {imageMeta.shutterSpeed && (
                                        <p>
                                            <strong>Shutter Speed:</strong> {imageMeta.shutterSpeed.toString()}
                                        </p>
                                    )}
                                    {imageMeta.focalLength && (
                                        <p>
                                            <strong>Focal Length:</strong> {imageMeta.focalLength.toString()}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
