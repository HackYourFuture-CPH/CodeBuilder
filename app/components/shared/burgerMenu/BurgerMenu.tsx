"use client";
import React, { useState } from 'react';
import { FaBars, FaUser } from "react-icons/fa";
import styles from "./BurgerMenu.module.css";
import Image from "next/image";
import { IoRocket } from "react-icons/io5";
import { BiCube } from "react-icons/bi";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.container} logo-container`}>
      <div>
        <Image src="/images/Logo.png" alt="Logo" width={300} height={70} />
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <div style={{ transform: "rotate(90deg)" }}>
          <FaBars className={styles.faBars} size={24} />
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
          <a href="/explore">
            <IoRocket size={20} />
            Explore
          </a>
        </li>
        <li>
          <a href="/snippets">
            <BiCube size={20} />
            My Snippets
          </a>
        </li>
        <li>
          <a>
            <FaUser size={18} />
            User Name
          </a>
        </li>
        <li className={styles.CreateSnippet}>
          <a href="/snippets/create">Create snippet</a>
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
