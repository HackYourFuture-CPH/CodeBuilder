import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
//import UserIcon from "@/app/icons/user";
import styles from "./tags/page.module.css";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      {/* Logout or Login */}
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          session?.user ? signOut() : signIn();
        }}
      >
        {/* <UserIcon /> */}
        <span>{session?.user ? session.user.name : "Login"}</span>
      </button>
    </>
  );
}
