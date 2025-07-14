import { Nav } from "../components/nav";
import { Posts } from "../components/posts";

export default function Home() {
  return (
      <div className="min-h-screen text-gray-200">
        <Nav />
        <main className="max-w-4xl max-h mx-auto mt-6 px-4">
          <Posts />
        </main>
      </div>
  );
}
