"use client";
import React from "react";
import "./header.css";
import { useSession } from "next-auth/react";
import LoginBtn from "./loginBtn/login-btn";
import Image from "next/image";
import Link from "next/link";
import { IoRocket } from "react-icons/io5";
import { BiCube } from "react-icons/bi";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { data: session } = useSession();
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  if (isMobile) {
    return <BurgerMenu />;
  }
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="corner-logo">
          <Image src="/images/Logo.png" alt="Logo" width={494} height={119} />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link href="/snippets" className="explore-btn">
              <IoRocket className="icon" />
              Explore
            </Link>
          </li>
          <li className="navbar-item">
            <Link href="/about">
              <FontAwesomeIcon icon={faLightbulb} className="icon" />
              About
            </Link>
          </li>
          {session?.user ? ( // to test how it looks when the user logs in we can write {true? instead of this line.
            <li className="navbar-item">
              <Link href="/snippets/my">
                <BiCube className="icon" />
                My Snippets
              </Link>
            </li>
          ) : null}
          {session?.user ? ( //also replace it here
            <li className="navbar-item">
              <Link href="/snippets/create" className="create-btn">
                Create snippet
              </Link>
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
