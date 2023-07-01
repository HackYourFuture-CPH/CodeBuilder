"use client";
import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h4>
            <a href="/about">About</a>
          </h4>
          <p>
            At <b>CodeBuilder</b>, we believe that sharing code snippets is an
            essential part of the learning process.<br></br> Whether you are a
            beginner or an experienced developer, <b>this is your place.</b>
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
