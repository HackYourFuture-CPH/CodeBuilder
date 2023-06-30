"use client";
import useSWR from "swr";
import { Tag } from "./api/tags/route";
import React from "react";
import Link from "next/link";

import { useMediaQuery } from 'react-responsive';
import BurgerMenu from "./components/shared/burgerMenu/BurgerMenu";




const Home: React.FC = () => {

   const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
 
  return (
    <div className='main'>
          {isMobile && <BurgerMenu />}

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
