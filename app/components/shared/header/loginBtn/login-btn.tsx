import { useSession, signIn, signOut } from "next-auth/react";
import "./login-btn.css";
import { FaUserAlt } from 'react-icons/fa';

export default function LoginBtn() {
    const { data: session } = useSession();

    return (
        <>
            {/* Logout or Login */}
            <FaUserAlt className="icon" /><button
                className={"login-btn"}
                onClick={(e) => {
                    e.preventDefault();
                    session?.user ? signOut() : signIn();
                }}
            >
                <span>{session?.user ? session.user.name : "Login"}</span>
            </button>
        </>
    );

}