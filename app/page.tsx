/** @format */

'use client';
import Link from 'next/link';
import useSWR from 'swr';
import styles from './page.module.css';
import { Tag } from './api/tags/route';
import CreateSnippet from './components/CreateSnippet';

const Home: React.FC = () => {
  return (
    <main className={styles.main}>
      <div>
        <Link href="/create-snippet">Create snippet</Link>
        <CreateSnippet />
      </div>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
      </div>
      <h1>Categories from the database</h1>
      <div className={styles.grid}>
        {tags?.map((tag) => (
          <div
            className={styles.card}
            key={tag.shortName}>
            <h2>{tag.displayName}</h2>
            <p>{tag.shortName}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Home;
