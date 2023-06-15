import React from "react";
import Link from "next/link";
import Header from "./components/shared/header/header";

const Home: React.FC = () => {
  return (
    <main>
      <div>This is a home page</div>
      <p>
        {/* Don't mind about this link, I've tested meta */}
        <Link href="/tags">Tags</Link>
      </p>
    </main>
  );
};

export default Home;
