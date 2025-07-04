"use client";

import {useSession, signIn, signOut} from "next-auth/react";

export const Nav = () => {
    const { data: session } = useSession();
    return (
        <div className={"flex justify-between"} style={{height: "5vh"}}>
        <h1 className="text-2xl font-bold float-left">Pratibimb Manache!!!</h1>
        {
            session ? (
                <>
                    <div className="flex flex-col">
                        <div className={"flex"}>
                            <img className={"size-8 border rounded-full"} src={session.user?.image} alt="user-image"></img>
                            <p>{session.user?.name}</p>
                        </div>
                        <div>
                            <p>{session.user?.email}</p>
                        </div>
                    </div>
                    <button onClick={() => signOut()}>Sign Out</button>

                </>
            ) : (
                <button onClick={() => signIn()}>Sign In</button>
            )
        }
        </div>
    )
}
