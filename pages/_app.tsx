import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import {BackgroundProvider, useBackground} from "../lib/background-context";
import {linearGradient} from "framer-motion/m";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
      <div className="min-h-screen max-w-full justify-self-center bg-black/30 backdrop-blur-sm text-gray-200 overscroll-none">
          <BackgroundProvider>
              <LayoutWrapper>
                <SessionProvider session={session}>
                  <Component {...pageProps} />
                </SessionProvider>
              </LayoutWrapper>
          </BackgroundProvider>
      </div>
  );
    function LayoutWrapper({ children }) {
        const { background } = useBackground();

        return (
            <div
                className="min-h-screen transition-all duration-500"
                style={{
                    //backgroundImage: `url(/images/${background}.jpg)`,
                    //backgroundSize: 'cover',
                    //backgroundPosition: 'center',
                    //backgroundRepeat: 'no-repeat',
                    backgroundImage: "linear-gradient(to bottom, #020617, #064e3b, #0e7490)"
                    //backgroundImage: "linear-gradient(to bottom, #020617, #1e293b, #312e81)"
                    //backgroundImage: "linear-gradient(to bottom, #020617, #701a75, #0891b2)"
                }}
            >
                {children}
            </div>
        );
    }
}
