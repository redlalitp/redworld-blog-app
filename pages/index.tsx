import { Nav } from "../components/nav";
import { Posts } from "../components/posts";

export default function Home() {
  return (
      <div className="min-h-screen text-gray-200">
        <div className="sticky top-0 z-10">
          <Nav />
        </div>
        <main className="max-w-full mx-auto mt-80 px-4 h-[calc(100vh-80px)] overflow-y-auto overscroll-none" style={{ scrollbarWidth: 'none' }}>
          <div className="sticky top-20">
            <Posts />
          </div>
          {/* Add extra vertical space to enable scrolling */}
          <div className="h-[200vh]"></div>
        </main>
      </div>
  );
}
