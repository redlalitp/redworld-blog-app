"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <main className="relative h-[100dvh] w-screen overflow-hidden text-white flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, zoom: 5}}
                animate={{ opacity: 1, zoom: 1 }}
                transition={{ duration: 1, ease: "easeIn"}}
                className="absolute inset-0 text-white"
                style={{
                    //backgroundImage: "radial-gradient(circle at bottom right, white 35%, transparent 70%), linear-gradient(to left, #0f172a, #1e293b)"
                    //orange
                    //background: "repeating-linear-gradient(108deg,white 0 20%,#001220 20% 60%)"
                    background: "repeating-linear-gradient(108deg,white 0 20%,#001220 20% 60%)"
                }}>
            </motion.div>
            {/* Image on right */}
            <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="
                    absolute inset-0 pointer-events-none
                    bg-no-repeat bg-bottom
                    bg-center sm:bg-right-bottom
                    opacity-30 sm:opacity-40 md:opacity-60
                    bg-[length:130%] sm:bg-[length:90%] md:bg-contain
                "
                style={{
                    backgroundImage: `url('images/main-tp.png')`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4 sm:px-6">
                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeIn" }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
                >
                  {/*<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">*/}
                  {/*  <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-black/70 to-black">*/}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/60 to-white">
                    Lalit Patil
                  </span>
                </motion.h1>
                <motion.div
                    className="
                        flex flex-col sm:flex-row items-center justify-center
                        gap-4 sm:gap-10
                        bg-gray-950/50 backdrop-blur-sm
                        px-4 py-3 sm:px-5 sm:py-4 rounded-lg
                    "
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 1.2, ease: "easeIn" }}
                >
                    {/* Navigation */}
                    <motion.nav
                        className="flex items-center justify-center gap-6 sm:gap-8 text-base sm:text-lg font-medium"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeIn" }}
                        aria-label="Primary"
                    >
                        <Link href="/blog" className="hover:text-amber-400 transition">
                            Blog
                        </Link>
                        <Link href="/about" className="hover:text-amber-400 transition">
                            About
                        </Link>
                    </motion.nav>

                    {/* Divider on small screens */}
                    <div className="h-px w-full bg-white/10 sm:hidden" />

                    {/* Social Icons */}
                    <motion.div
                        className="flex items-center justify-center gap-5 sm:gap-6 text-xl sm:text-2xl"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeIn" }}
                        aria-label="Social links"
                    >
                        <a
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
