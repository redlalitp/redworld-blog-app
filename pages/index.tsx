import dynamic from "next/dynamic";
import { Nav } from "../components/nav";
// import { Posts } from "../components/posts";

const PostsClient = dynamic(() => import("../components/posts").then(m => m.Posts), {
  ssr: false,
});

export default function Home() {
  return (
      <div className="min-h-screen text-gray-200">
        <div className="sticky top-0 z-10">
          <Nav />
        </div>
        <main className="max-w-full mx-auto mt-8 px-4 h-[calc(100vh-80px)] overflow-y-auto overscroll-none" style={{ scrollbarWidth: 'none' }}>
            <div className="absolute left-100 top-3 flex items-end justify-center w-400 z-10">
                <div className="flex flex-col items-center font-extrabold">
                    <span className="text-amber-600 text-6xl font-kalam">प्रतिबिंब</span>
                    <span className="text-amber-700 text-6xl font-kalam pl-4">मनाचे !</span>
                </div>
                <img src="/images/feather-pen.png" alt="Pen" className="w-48 h-48 mx-auto mt-4" />
            </div>
            <div className="sticky top-40">
              <PostsClient />
            </div>
            {/* Add extra vertical space to enable scrolling */}
            <div className="h-[200vh]"></div>
        </main>
      </div>
  );
}
