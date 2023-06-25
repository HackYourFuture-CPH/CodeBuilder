"use client";
import useSWR from "swr";
import styles from "./page.module.css";
import { snippetModel } from "../snippetModel-DB";
import CodeEditor from "../components/shared/codeEditor/code-editor";
import Header from "../components/shared/header/header";

const TagsPage: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    "/api/snippets",
    async (url) => {
      try {
        const response = await fetch(url);
        const dataSnippets = await response.json();
        return dataSnippets;
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className={styles.main}>
        {snippets?.map((snippet) => (
          <div
            key={snippet._id}
            style={{ width: "50%", margin: "0 auto", borderRadius: "5px" }}
          >
            <CodeEditor
              initialValue={snippet.snippetCode}
              readOnly={true}
              tags={snippet.tags}
            />
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                paddingBottom: "20px",
                marginBottom: "30px",
                padding: "20px",
              }}
            >
              <h2 style={{ marginTop: 0 }}>{snippet.title}</h2>
              <p>{snippet.description}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default TagsPage;