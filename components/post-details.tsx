"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Post } from "./posts";
import { CommentsSection } from "./comments-section";
import { PostSocialArea } from "./post-social-area";
import { useBackground } from "../lib/background-context";
import { formatLong, parseDateWithOrdinal } from "../utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import {MapIcon} from "@heroicons/react/24/outline";
import exifr from "exifr";
import imageLocationMetaData from "../utils/image-meta.json";

export const PostDetails = ({ post }: { post: Post }) => {
  const { setBackground } = useBackground();
  const router = useRouter();

  const [showImageOnly, setShowImageOnly] = useState(false);
  const [imageMeta, setImageMeta] = useState<any>(null);
  const [imageLocationMeta, setImageLocationMeta] = useState<any>(null);
  // Responsive flag for small screens
  const [isSmall, setIsSmall] = useState(false);

  const [isWide, setIsWide] = useState(false);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const update = () => setIsSmall(window.matchMedia("(max-width: 640px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const update = () => setIsWide(window.matchMedia("(min-width: 1200px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!isWide) return;

    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) return;

        const data = await res.json();

        const posts: Post[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.posts)
            ? data.posts
            : [];

        if (!cancelled) setAllPosts(posts);
      } catch {
        // ignore
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [isWide]);

  // Set background and extract metadata
  useEffect(() => {
    setBackground(post.image);

    const fetchMeta = async () => {
      try {
        if (post.image) {
          const metadata = await exifr.parse(`../images/${post.image}.jpg`);
          const imageMetaData = imageLocationMetaData.find(
            (img) => img.id === Number.parseInt(post.image),
          );
          console.log(imageMetaData);
          if (imageMetaData) {
            setImageLocationMeta({
              locationText: imageMetaData.location,
              mapUrl: imageMetaData.map,
            });
          }

          if (metadata) {
            setImageMeta({
              camera: metadata.Make ? `${metadata.Make} ${metadata.Model || ""}` : metadata.Model || "Unknown",
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
        className="absolute top-3 right-3 z-30 bg-black/50 text-gray-200 rounded-lg hover:bg-black/70 transition px-3 py-1.5 text-xs sm:text-sm sm:top-4 sm:right-4"
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
                width: isSmall ? "92vw" : "70vw",
                height: isSmall ? "56vh" : "70vh",
                top: isSmall ? "calc(50% - 28vh)" : "calc(50% - 35vh)",
                left: isSmall ? "calc(50% - 46vw)" : "calc(50% - 35vw)",
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
            className="
              relative z-20
              flex flex-col min-[1200px]:flex-row
              w-[92vw] sm:w-[90vw] md:w-[80vw] max-w-3xl min-[1200px]:max-w-[1100px]
              lg:h-[90vh] sm:h-[82vh]
              overflow-hidden
              bg-[#2b2b2b]/70 backdrop-blur-sm text-gray-200
              border border-[#3c3f41]
              p-4 sm:p-6
              m-3 rounded-xl shadow-md
            "
          >
            {/* Main Post Content */}
            <div className="flex min-w-0 flex-1 flex-col">
              {/* Post Title */}
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-1 tracking-tight">
                  {post.title}
                </h3>
                {post.date && (
                  <p className="text-[11px] sm:text-xs text-gray-400 sm:text-gray-500 mb-3">
                    Posted on {formatLong(parseDateWithOrdinal(post.date))}
                  </p>
                )}
              </div>

              {/* Post Body */}
              <div className="modern-scrollbar basis-2/3 min-h-0 overflow-auto p-2 rounded">
                <p className="text-sm sm:text-base leading-relaxed text-gray-300 whitespace-pre-wrap">
                  {post.text}
                </p>
              </div>

              {/* Social Area */}
              <div className="mt-4 sm:mt-6 bg-[#2b2b2b]/50 p-2 sm:p-3 rounded">
                <PostSocialArea post={post} />
              </div>

              <div className="modern-scrollbar grow min-h-0 overflow-auto">
                <CommentsSection post={post} />
              </div>
            </div>

            {/* Right-side navigation (only >= 1200px) */}
            <aside className="hidden min-[1200px]:flex min-[1200px]:w-[320px] min-[1200px]:shrink-0 min-[1200px]:pl-5">
              <div className="flex h-full w-full flex-col border-l border-white/10 pl-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-100">More posts</p>
                  <button
                    type="button"
                    onClick={() => router.push("/blog")}
                    className="text-xs text-gray-300 hover:text-white transition"
                  >
                    View all
                  </button>
                </div>

                <div className="modern-scrollbar min-h-0 flex-1 overflow-auto pr-1">
                  <ul className="space-y-2">
                    {allPosts.map((p: any) => {
                      const id = (p?._id ?? p?.id ?? "").toString();
                      const isActive = id && post?._id?.toString?.() ? id === post._id.toString() : false;

                      return (
                        <li key={id || p?.title}>
                          <Link
                            href={`/blog/${id}`}
                            className={`
                              group flex items-center gap-3 rounded-lg p-2
                              transition
                              ${isActive ? "bg-black/35" : "hover:bg-black/25"}
                            `}
                          >
                            <div
                              className="
                                h-10 w-14 shrink-0 rounded-md
                                bg-black/30 border border-white/10
                                bg-center bg-cover
                              "
                              style={{
                                backgroundImage: p?.image ? `url(/images/${p.image}.jpg)` : "none",
                              }}
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm text-gray-200 group-hover:text-white">
                                {p?.title ?? "Untitled"}
                              </p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </aside>
          </motion.div>
        ) : (
          <motion.div
            key="image-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-20 flex flex-col justify-end w-full h-full p-3 sm:p-6 text-gray-100"
          >
            {/* location meta*/}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 bg-black/70 rounded-md sm:rounded-lg px-3 py-2 sm:p-4 max-w-[90vw] sm:max-w-[70vw] text-xs sm:text-sm flex items-center gap-2">
              {imageLocationMeta && (
                <>
                  {imageLocationMeta.locationText && <span className="truncate">{imageLocationMeta.locationText}</span>}
                  {imageLocationMeta.mapUrl && (
                    <a
                      href={imageLocationMeta.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 inline-flex items-center"
                      aria-label="Open location"
                      title="Open location"
                    >
                      <MapIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                  )}
                </>
              )}
            </div>

            {/* Metadata Overlay */}
            <div className="bg-black/60 rounded-md sm:rounded-lg p-3 sm:p-4 max-w-[80vw] sm:max-w-56 text-xs sm:text-sm space-y-1.5 sm:space-y-2">
              <p className="font-semibold">Metadata</p>
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
                      <strong>Taken on:</strong> {new Date(imageMeta.date).toLocaleString()}
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
