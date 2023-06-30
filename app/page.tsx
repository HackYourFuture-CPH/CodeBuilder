"use client"
import React from "react";
import { useMediaQuery } from 'react-responsive';
import BurgerMenu from "./components/shared/burgerMenu/BurgerMenu";
import Header from "./components/shared/header/header";



const Home: React.FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  return (
    
    <div className='main'>
          {isDesktopOrLaptop &&  <Header />}
          {isBigScreen && <Header />}
          {isTablet &&  <Header />}
          {isMobile && <BurgerMenu />}
          {isRetina && <BurgerMenu />}


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
