import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>signOut</button>
      </>
    );
  }
  return (
    <>
      Not Signed in
      <br />
      <button onClick={() => signIn()}>SignIn</button>
    </>
  );
}
