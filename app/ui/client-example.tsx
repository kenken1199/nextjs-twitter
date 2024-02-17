"use client";

import { useSession } from "next-auth/react";
import SessionData from "./session-data";

export default function ClientExample() {
  const { data: session, status } = useSession();
  console.log(status);
  if (session) console.log(session.user);
  return (
    <>
      <SessionData session={session} />
    </>
  );
}
