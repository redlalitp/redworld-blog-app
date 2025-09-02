"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const Nav = () => {
    const { data: session } = useSession();

    return (
        <nav className="flex items-center justify-end px-6 py-3 bg-slate-950/30 shadow-md">
            <div className="flex items-center space-x-8 pr-5">
                <Link href="/">
                    <h1 className="text-lg font-medium text-gray-200 hover:text-orange-400 transition">
                        Home
                    </h1>
                    {/*<h4 className="font-mono text-opacity-50">A blog by Lalit Patil.</h4>*/}
                </Link>

                <Link href="/blog">
                    <h1 className="text-lg font-medium text-gray-200 hover:text-orange-400 transition">
                        Blog
                    </h1>
                    {/*<h4 className="font-mono text-opacity-50">A blog by Lalit Patil.</h4>*/}
                </Link>
            </div>

            {session ? (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-8 h-8 rounded-full border"
                            src={session.user?.image ?? ""}
                            alt="user"
                        />
                        <div className="text-sm text-gray-200">
                            <p className="font-medium">{session.user?.name}</p>
                            <p className="text-xs text-gray-500">{session.user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    Sign In
                </button>
            )}
        </nav>
    );
};
