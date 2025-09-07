import {SessionProvider} from "next-auth/react";
import type {AppProps} from "next/app";
import "../styles/globals.css";
import {BackgroundProvider, useBackground} from "../lib/background-context";
import type {ReactNode} from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

// Centralize the container classes for clarity and reuse
const ROOT_CONTAINER_CLASS =
    "h-[100dvh] w-screen max-w-full justify-self-center bg-black/30 backdrop-blur-sm text-gray-200";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    return (
        <div className={ROOT_CONTAINER_CLASS}>
            <BackgroundProvider>
                <LayoutWrapper>
                    <SessionProvider session={session}>
                        <Component {...pageProps} />
                    </SessionProvider>
                    <SpeedInsights />
                    <Analytics />
                </LayoutWrapper>
            </BackgroundProvider>
        </div>
    );
}

// Extracted and typed for clarity; avoids redefining this component on every App render
function LayoutWrapper({children}: { children: ReactNode }) {
    const {background} = useBackground();
    return (
        <div
            className="h-full w-full transition-all duration-500 overflow-y-auto"
            style={{
                //backgroundImage: `url(/images/${background}.jpg)`,
                //backgroundSize: 'cover',
                //backgroundPosition: 'center',
                //backgroundRepeat: 'no-repeat',
                //backgroundImage: "linear-gradient(to bottom, #020617, #064e3b, #0e7490)"
                //backgroundImage: "linear-gradient(to bottom, #020617, #1e293b, #312e81)"
                //backgroundImage: "linear-gradient(to bottom, #020617, #701a75, #0891b
                backgroundColor: "#191919",
            }}
        >
            {children}
        </div>
    );
}
