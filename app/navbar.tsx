import React from "react";
import styles from "./tags/page.module.css";
import LoginButton from "./login-btn";

export default function Navbar() {

    return (
        <nav className={styles.navbar}>
            <h1>SNIPPETS</h1>
            <LoginButton />
        </nav>
    );
}

