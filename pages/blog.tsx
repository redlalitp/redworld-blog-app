import dynamic from "next/dynamic";
import { Nav } from "../components/nav";
// import { Posts } from "../components/posts";

const PostsClient = dynamic(() => import("../components/posts").then(m => m.Posts), {
  ssr: false,
});

export default function Blog() {
  return (
      <div className="min-h-screen text-gray-200">
        <div className="sticky top-0 z-10">
          <Nav />
        </div>
        <main className="max-w-full mx-auto mt-8 px-4 h-[calc(100vh-80px)] overflow-y-auto overscroll-none" style={{ scrollbarWidth: 'none' }}>
            <div className="absolute left-100 top-36 sm:top-10 md:top-10 lg:top-3 flex items-end justify-center w-400 z-10">
                <div className="flex sm:flex-col items-center font-extrabold">
                    <span className="text-amber-600 text-4xl sm:text-6xl font-kalam">प्रतिबिंब</span>
                    <span className="text-amber-700 text-4xl sm:text-6xl font-kalam pl-4">मनाचे !</span>
                </div>
                <img src="/images/feather-pen.png" alt="Pen" className="hidden md:block w-48 h-48 mx-auto mt-4"/>
            </div>
            <div className="sticky top-44 sm:top-40">
              <PostsClient />
            </div>
            {/* Add extra vertical space to enable scrolling */}
            <div className="h-[200vh]"></div>
        </main>
      </div>
  );
}