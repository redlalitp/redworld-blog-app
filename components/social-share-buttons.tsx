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
        const locUrl = window.location.href;
        setCurrentUrl(locUrl);
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

    const links = [
        {
            icon: <FaTwitter />,
            href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:text-sky-500",
            label: "Share on Twitter",
        },
        {
            icon: <FaWhatsapp />,
            href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:text-green-500",
            label: "Share on WhatsApp",
        },
        {
            icon: <FaLinkedin />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: "hover:text-blue-600",
            label: "Share on LinkedIn",
        },
        {
            icon: <FaFacebook />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:text-blue-700",
            label: "Share on Facebook",
        },
        {
            icon: <FaReddit />,
            href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
            color: "hover:text-orange-500",
            label: "Share on Reddit",
        },
    ];

    return (
        <div className="flex flex-wrap items-center gap-3 text-gray-400">
      <span className="flex items-center gap-1 text-sm font-medium text-gray-500">
        <FaShareAlt /> Share:
      </span>

            {links.map((link, idx) => (
                <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link.color} transition`}
                    title={link.label}
                    aria-label={link.label}
                >
                    {link.icon}
                </a>
            ))}

            <button
                onClick={handleCopy}
                className="hover:text-indigo-400 transition"
                title="Copy link"
                aria-label="Copy link"
            >
                <FaLink />
            </button>

            {canShare && (
                <button
                    onClick={handleNativeShare}
                    className="hover:text-pink-500 transition"
                    title="Share on device"
                    aria-label="Share on device"
                >
                    <FaMobileAlt />
                </button>
            )}

            {copied && <span className="text-xs text-green-400">Copied!</span>}
        </div>
    );
};
