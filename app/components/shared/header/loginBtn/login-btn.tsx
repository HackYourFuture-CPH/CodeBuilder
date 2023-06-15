import { useSession, signIn, signOut } from "next-auth/react";
import UserIcon from "@/app/icons/user";
import "./login-btn.css";

export default function LoginBtn() {
    const { data: session } = useSession();

    return (
        <>
            {/* Logout or Login */}
            <button
                className={"button"}
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