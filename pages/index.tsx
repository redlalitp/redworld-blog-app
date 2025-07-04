import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Simple Blog</h1>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
            <p>{session.user?.email}</p>
            <img src={session.user?.image} alt="user-image"></img>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}
