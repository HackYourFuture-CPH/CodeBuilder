"use client";
import SnippetDetails from "../snippet/page";
import useSWR from "swr";
import { getSnippets } from "../../services/SnippetService";
import { snippetModel } from "../../snippetModel-DB";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const SnippetsId: React.FC<Props> = ({ params: { id } }) => {
  const { data: snippets } = useSWR<snippetModel>(
    `/api/snippets/${id}`,
    getSnippets
  );

  return (
    <>
      <div>Here we have snippets by id</div>
      <SnippetDetails />
    </>
  );
};
export default SnippetsId;
// "use client";
// import { useRouter } from "next/router";
// import useSWR from "swr";
// import { snippetModel } from "@/app/snippetModel-DB";
// import { getSnippets } from "@/app/services/SnippetService";

// type Props = {
//   params: {
//     id: string;
//   };
// };

// const SnippetDetails: React.FC<Props> = () => {
//   const id = useRouter();
//   console.log(id);

//   // const { id } = router.query;
//   // const SnippetsId: React.FC<Props> = ({ params: { id } }) => {
//   //   const { data: snippets } = useSWR<snippetModel>(
//   //     `/api/snippets/${id}`,
//   //     getSnippets
//   //   );
//   //   console.log(snippets);
//   // };
//   // Fetch data or perform actions based on the `id`

//   return (
//     <div>
//       <h1>Single Component</h1>
//       <p>ID: {id}</p>
//       {/* Rest of your component */}
//     </div>
//   );
// };

// export default SnippetDetails;
