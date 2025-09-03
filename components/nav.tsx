"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export const Nav = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <nav className="z-30 relative flex items-center justify-end px-4 sm:px-6 py-2 sm:py-3 bg-slate-950/30 shadow-md">
            {/* Left: Brand / Home */}
            <div className="flex items-center gap-3 pr-3">
                <Link href="/" className="text-base sm:text-lg font-medium text-gray-200 hover:text-orange-400 transition">
                    Home
                </Link>
                {/* Desktop links */}
                <div className="hidden sm:flex items-center gap-6 pl-2">
                    <Link href="/blog" className="text-lg font-medium text-gray-200 hover:text-orange-400 transition">
                        Blog
                    </Link>
                </div>
            </div>

            {/* Right: Auth + Desktop actions */}
            <div className="hidden sm:flex items-center gap-4">
                {session ? (
                    <>
                        <div className="flex items-center gap-2">
                            <img
                                className="w-8 h-8 rounded-full border object-cover"
                                src={session.user?.image ?? ""}
                                alt="user"
                            />
                            <div className="text-sm text-gray-200">
                                <p className="font-medium leading-tight">{session.user?.name}</p>
                                <p className="text-xs text-gray-500 leading-tight">{session.user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut()}
                            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        Sign In
                    </button>
                )}
            </div>

            {/* Mobile: hamburger */}
            <button
                className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:bg-white/10 transition"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {open ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <>
                            <path d="M3 6h18" />
                            <path d="M3 12h18" />
                            <path d="M3 18h18" />
                        </>
                    )}
                </svg>
            </button>

            {/* Mobile panel */}
            {open && (
                <div className="z-100 absolute top-full left-0 w-full sm:hidden bg-slate-950/90 backdrop-blur-md border-t border-white/10 shadow-lg">
                    <div className="px-4 py-3 flex flex-col gap-3">
                        <Link
                            href="/blog"
                            className="block text-base text-gray-200 hover:text-orange-400 transition"
                            onClick={() => setOpen(false)}
                        >
                            Blog
                        </Link>

                        {session ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="w-7 h-7 rounded-full border object-cover"
                                        src={session.user?.image ?? ""}
                                        alt="user"
                                    />
                                    <span className="text-sm text-gray-200 truncate max-w-[50vw]">{session.user?.name}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                        signOut();
                                    }}
                                    className="px-3 py-1.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    signIn();
                                }}
                                className="w-full px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
