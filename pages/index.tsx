import { useSession, signIn, signOut } from "next-auth/react";
import {Nav} from "../components/nav";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="p-6">
      <Nav></Nav>
    </div>
  );
}
