"use client";
import React from "react";
import "./footer.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const showFooter = pathname != "/";
  if (!showFooter) {
    return null;
  }
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h4>
            <Link href="/about">About</Link>
          </h4>
          <p>
            At <b>CodeBuilder</b>, we believe that sharing code snippets is an
            essential part of the learning process.
          </p>
          <p>
            {" "}
            Whether you are a beginner or an experienced developer,{" "}
            <b>this is your place.</b>
          </p>
        </div>
        <div className="footer-content">
          <h4>Contact Us</h4>
          <p>Adress: Søren Nymarks Vej 6, 8270 Højbjerg</p>
          <p>Email: class24@hackyourfuture.dk</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 CodeBuilder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
