"use client";
import React from "react";
import "./page.css";

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
        <a href="/snippets">
          <button className="start-btn">Start now</button>
        </a>
      </div>
    </div>
  );
};

export default Home;
