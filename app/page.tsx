"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import { Tag } from "./api/tags/route";
 import React from "react";
import Link from "next/link";

import MediaQuery from "react-responsive";
import BurgerMenu from "./components/shared/burgerMenu/BurgerMenu";
import Header from "./components/shared/header/header";



export default function Home() {
  const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
    const response = await fetch(url);
    return response.json();
  });


const Home: React.FC = () => {
  return (
    <div className={styles.main}>
      <Navbar />
      <MediaQuery minWidth={1824}>
        <Header />
      </MediaQuery>

      <MediaQuery minWidth={414}>
        <BurgerMenu />
      </MediaQuery>

      {/*
        <h1>Categories from the database</h1>
        
    
  
        
        <div className={styles.grid}>
          {tags?.map((tag) => (
            <div className={styles.card} key={tag.shortName}>
              <h2>{tag.displayName}</h2>
              <p>{tag.shortName}</p>
            </div>
          ))}
        </div>
         */}
    </div>
  );
};

export default Home;
