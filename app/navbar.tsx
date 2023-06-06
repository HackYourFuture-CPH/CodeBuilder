import React from "react";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import UserIcon from "@/app/icons/user";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className={styles.navbar}>
            <h1>SNIPPETS</h1>
            {session?.user ? (
                <>
                    {/* Logout */}
                    <button
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            signOut();
                        }}
                    >
                        <UserIcon />
                        {session.user.name}
                    </button>
                </>
            ) : (
                <>
                    {/* Login */}
                    <button
                        className={styles.button}
                        onClick={(e) => {
                            e.preventDefault();
                            signIn();
                        }}
                    >
                        <UserIcon />
                        <span>Login</span>
                    </button>
                </>
            )}
        </nav>
    );
}

