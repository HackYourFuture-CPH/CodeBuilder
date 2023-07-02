"use client";
import React from "react";
import Image from "next/image";
import "./page.css";

const Home: React.FC = () => {
  return (
    <div className="main">
      <div className="home-container">
        <div className="typewriter">
          <h1> Sharing Code, <br></br>Shaping Futures</h1>
        </div>
        <a href="/explore">
          <button className="start-btn">Start now</button>
        </a>
      </div>
      <Image
        src="/images/StudentsCoding.png"
        alt="Students-coding"
        width={400}
        height={400}
      />
    </div>
  );
};

export default Home;
