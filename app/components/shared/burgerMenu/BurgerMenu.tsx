"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { FaBars, FaUser } from "react-icons/fa";
import styles from "./BurgerMenu.module.css";
import Image from "next/image";
import Link from "next/link";
import LoginBtn from "../header/loginBtn/login-btn";
import { IoRocket } from "react-icons/io5";
import { BiCube } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.container} logo-container`}>
      <div>
        <Link href="/">
          <Image src="/images/Logo.png" alt="Logo" width={245} height={58} />
        </Link>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <div style={{ transform: "rotate(90deg)" }}>
          <FaBars className={styles.FaBars} size={24} />
        </div>
        <span
          className={`${styles.menuIcon} ${isOpen ? styles.open : ""}`}
        ></span>
      </button>
      <ul
        className={`${styles.menu} ${isOpen ? styles.open : ""} ${
          isOpen ? "" : styles.reverse
        }`}
      >
        <li className={styles.FaSpaceShuttle}>
          <Link href="/snippets" onClick={toggleMenu}>
            <IoRocket size={20} />
            Explore
          </Link>
        </li>
        <li className={styles.FaSpaceShuttle}>
          <Link href="/about" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faLightbulb} className="icon" />
            About
          </Link>
        </li>
        {session?.user ? (
          <li>
            <Link href="/snippets/my" onClick={toggleMenu}>
              <BiCube size={20} />
              My Snippets
            </Link>
          </li>
        ) : null}
        {session?.user ? (
          <li className={styles.CreateSnippet}>
            <Link href="/snippets/create" onClick={toggleMenu}>
              Create snippet
            </Link>
          </li>
        ) : null}
        <li className="navbar-item">
          <LoginBtn />
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
