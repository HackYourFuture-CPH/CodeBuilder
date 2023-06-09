import { useSession, signIn, signOut } from "next-auth/react";
import UserIcon from "@/app/icons/user";
import styles from "./page.module.css";

export default function Component() {
    const { data: session } = useSession();

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
                <UserIcon />
                <span>{session?.user ? session.user.name : "Login"}</span>
            </button>
        </>
    );

}