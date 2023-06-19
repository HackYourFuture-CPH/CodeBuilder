"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import { Tag } from "./api/tags/route";
import BurgerMenu from "./api/components/shared/burgerMenu/BurgerMenu";

export default function Home() {
  const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  return (
    <div className={styles.main}>
      <BurgerMenu />


      {
        /*
        <h1>Categories from the database</h1>
        
    
  
        
        <div className={styles.grid}>
          {tags?.map((tag) => (
            <div className={styles.card} key={tag.shortName}>
              <h2>{tag.displayName}</h2>
              <p>{tag.shortName}</p>
            </div>
          ))}
        </div>
         */
      }

    </div>
  );
}
