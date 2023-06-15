"use client";
import React from "react";
import "./header.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginBtn from "./loginBtn/login-btn";
// import logonotext from "../../../assets/images/logonotext.png";

const Header = () => {
  const { data: session } = useSession();
  return (
<React.Fragment>
    <nav className="navbar">
      <div className="corner-logo">
        {/* <img src={logonotext} alt="Logo" /> */}
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="/explore">Explore</a>
        </li>
        {session?.user ? // to test how it looks when the user logs in we can write {true? instead of this line. Also in line 26
        <li className="navbar-item">
          <a href="/snippets">My Snippets</a>
        </li>
        : null}
        {session?.user ?
        <li className="navbar-item">
          <a href="/snippets/create">Create </a>
        </li>
        : null}
        <li>
        <LoginBtn />
        </li>
        </ul>
    </nav>
    </React.Fragment>
  );
};

export default Header;