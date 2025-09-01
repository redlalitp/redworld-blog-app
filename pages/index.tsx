import {Nav} from "../components/nav";

export default function Home() {
  return (
    <main className="h-screen w-screen">
        <Nav />
        <div className="min-h-screen flex items-center justify-center">
            <span className="text-4xl font-bold">home</span>
        </div>
    </main>
  );
}