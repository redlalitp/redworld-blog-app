import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import {BackgroundProvider, useBackground} from "../lib/background-context";

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
                    backgroundImage: `url(/images/${background}.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',

                }}
            >
                {children}
            </div>
        );
    }
}
