"use client";

import {
    FaTwitter,
    FaWhatsapp,
    FaLinkedin,
    FaFacebook,
    FaReddit,
    FaLink,
    FaShareAlt,
    FaMobileAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

interface SocialShareButtonsProps {
    title: string;
    url?: string;
}

export const SocialShareButtons = ({ title, url }: SocialShareButtonsProps) => {
    const [currentUrl, setCurrentUrl] = useState("");
    const [canShare, setCanShare] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setCurrentUrl(url || window.location.href);
        setCanShare(typeof navigator !== "undefined" && !!navigator.share);
    }, [url]);

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(currentUrl);

    const handleNativeShare = async () => {
        try {
            await navigator.share({
                title,
                text: title,
                url: currentUrl,
            });
        } catch (err) {
            console.error("Native sharing failed", err);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="mt-6 flex flex-wrap items-center gap-4 text-gray-400">
      <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
        <FaShareAlt /> Share:
      </span>

            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition"
                title="Share on Twitter"
            >
                <FaTwitter />
            </a>

            <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
                title="Share on WhatsApp"
            >
                <FaWhatsapp />
            </a>

            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
                title="Share on LinkedIn"
            >
                <FaLinkedin />
            </a>

            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition"
                title="Share on Facebook"
            >
                <FaFacebook />
            </a>

            <a
                href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition"
                title="Share on Reddit"
            >
                <FaReddit />
            </a>

            <button
                onClick={handleCopy}
                className="hover:text-indigo-400 transition"
                title="Copy link"
            >
                <FaLink />
            </button>

            {canShare && (
                <button
                    onClick={handleNativeShare}
                    className="hover:text-pink-500 transition"
                    title="Share on device"
                >
                    <FaMobileAlt />
                </button>
            )}

            {copied && <span className="text-xs text-green-400">Copied!</span>}
        </div>
    );
};
