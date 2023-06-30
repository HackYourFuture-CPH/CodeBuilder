"use client";
import React from "react";
import "./header.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginBtn from "./loginBtn/login-btn";
import Image from "next/image";
import Logo from "../../../assets/logo/logo.png";

import { IoRocket } from "react-icons/io5";
import { BiCube } from "react-icons/bi";

const Header = () => {
  const { data: session } = useSession();
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="corner-logo">
          <Image src="/images/Logo.png" alt="Logo" width={494} height={119} />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/snippets" className="explore-btn">
              <IoRocket className="icon" />
              Explore
            </a>
          </li>
          {session?.user ? ( // to test how it looks when the user logs in we can write {true? instead of this line.
            <li className="navbar-item">
              <a href="/snippets">
                <BiCube className="icon" />
                My Snippets
              </a>
            </li>
          ) : null}
          {session?.user ? ( //also replace it here
            <li className="navbar-item">
              <a href="/snippets/create" className="create-btn">
                Create snippet
              </a>
            </li>
          ) : null}
          <li className="navbar-item">
            <LoginBtn />
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;
