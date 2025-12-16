"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main
      className="
        relative w-screen text-white
        flex items-center justify-center
        min-h-[100dvh] h-auto sm:h-[100dvh]
        overflow-x-hidden overflow-y-auto sm:overflow-hidden
        px-4 py-10 sm:px-0 sm:py-0
      "
    >
      <motion.div
        initial={{ opacity: 0, zoom: 5 }}
        animate={{ opacity: 1, zoom: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="absolute inset-0 text-white"
        style={{
          background: "repeating-linear-gradient(108deg,white 0 20%,#001220 20% 60%)",
        }}
      ></motion.div>

      {/* Image on right (small screens) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className="
          absolute inset-0 pointer-events-none
          bg-no-repeat bg-bottom
          bg-right-bottom sm:bg-right-bottom
          opacity-30 sm:opacity-40 md:opacity-60
          bg-[length:140%] sm:bg-[length:90%] md:bg-contain
        "
        style={{
          backgroundImage: `url('images/main-tp.png')`,
        }}
      />

      {/* Content (bottom + left aligned on small screens) */}
      <div
        className="
          relative z-10 w-full max-w-[22rem] sm:max-w-none
          flex flex-col items-start sm:items-center
          text-left sm:text-center
          space-y-4
          mt-auto sm:mt-0
          pb-4 sm:pb-0
        "
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/60 to-white">
            Lalit Patil
          </span>
        </motion.h1>

        <motion.div
          className="
            w-fit max-w-[85vw] sm:w-auto
            flex flex-col sm:flex-row items-start sm:items-center justify-center
            gap-4 sm:gap-10
            bg-gray-950/40 sm:bg-gray-950/50
            backdrop-blur-sm
            px-4 py-3 sm:px-5 sm:py-4 rounded-lg
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
        >
          {/* Navigation */}
          <motion.nav
            className="flex items-center justify-start sm:justify-center gap-6 sm:gap-8 text-base sm:text-lg font-medium"
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
            className="flex items-center justify-start sm:justify-center gap-5 sm:gap-6 text-xl sm:text-2xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeIn" }}
            aria-label="Social links"
          >
            <a
              href="https://facebook.com/redlalitp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com/in/lalitrpatil/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com/redlalitp"
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
