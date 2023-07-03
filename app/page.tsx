"use client";
import React from "react";
import "./page.css";

const Home: React.FC = () => {
  return (
    <div
      className="background"
      style={{ backgroundImage: 'url("/public/images/Background.gif")' }}
    >
      <div className="main">
        <div className="home-container">
          <div className="typewriter">
            <h1> Sharing Code, Shaping Futures</h1>
          </div>
          <a href="/explore">
            <button className="start-btn">Start now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
