"use client";
import React from "react";
import "./page.css";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="main">
      <video className="video-background" autoPlay loop muted>
        <source src="/videos/Background.mp4" type="video/mp4" />
      </video>
      <div className="home-container">
        <div className="typewriter">
          <h1>Sharing Code, Shaping Futures</h1>
        </div>
        <Link href="/snippets">
          <button className="start-btn">Start now</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
