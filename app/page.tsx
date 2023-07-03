"use client";
import React from "react";
import Image from "next/image";
import "./page.css";

const Home: React.FC = () => {
  return (
    <div className="main">
      <div className="home-container">
        <div className="typewriter">
          <h1> Sharing Code, Shaping Futures</h1>
        </div>
        <a href="/explore">
          <button className="start-btn">Start now</button>
        </a>
      </div>
      <div>
        <Image
          src="/images/Background.gif"
          alt="background"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Home;
