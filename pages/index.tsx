"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <main className="relative h-screen w-screen text-white flex items-center justify-center ">
            <motion.div
                initial={{ opacity: 0, zoom: 5}}
                animate={{ opacity: 1, zoom: 1 }}
                transition={{ duration: 1, ease: "easeIn"}}
                className="absolute h-screen w-screen text-white"
                style={{
                    //backgroundImage: "radial-gradient(circle at bottom right, white 35%, transparent 70%), linear-gradient(to left, #0f172a, #1e293b)"
                    //orange
                    //background: "repeating-linear-gradient(108deg,white 0 20%,#001220 20% 40%,#F7770F 40% 60%)"
                    background: "repeating-linear-gradient(108deg,white 0 20%,#001220 20% 60%)"
                }}>

            </motion.div>
            {/* Image on right */}
            <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="absolute bottom-0 right-0 w-screen h-full bg-no-repeat bg-contain bg-right-bottom"
                style={{
                    backgroundImage: `url('images/main-tp.png')`, // put your PNG in /public
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-4">
                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeIn" }}
                    className="text-6xl md:text-7xl font-extrabold tracking-tight"
                >
                  {/*<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">*/}
                  {/*  <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-black/70 to-black">*/}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/60 to-white">
                    Lalit Patil
                  </span>
                </motion.h1>
                <motion.div className="flex align-middle space-x-16 bg-gray-950/50 p-4 rounded-lg"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 1.2, ease: "easeIn" }}>
                    {/* Navigation */}
                    <motion.nav  className="flex space-x-8 text-lg font-medium"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeIn" }}
                    >
                        <Link href="/blog" className="hover:text-amber-400 transition">
                            Blog
                        </Link>
                        <Link href="/work" className="hover:text-amber-400 transition">
                            Work
                        </Link>
                    </motion.nav>

                    {/* Social Icons */}
                    <motion.div className="flex space-x-6 text-2xl"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeIn" }}>
                        <a
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition"
                        >
                            <FaInstagram />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
