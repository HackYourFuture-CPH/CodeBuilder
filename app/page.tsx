"use client";
import React from "react";
import Image from "next/image";
import "./page.css";

const Home: React.FC = () => {
  return (
    <div className="main">
    <div className="background-container">
      <div>
        <Image src="/images/Background.gif" alt="Background" width={494} height={119} />
      </div>
    </div>
    <div className="home-container">
      <div className="typewriter">
        <h1>Sharing Code, Shaping Futures</h1>
      </div>
      <a href="/explore">
        <button className="start-btn">Start now</button>
      </a>
    </div>
  </div>
  );
};

export default Home;
