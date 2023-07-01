"use client";
import { updateSnippet } from "@/app/service/SnippetService";
import { mutate } from "swr";

type Props = {
  params: {
    id: string;
  };
};

const EditSnippet: React.FC<Props> = ({ params: { id } }) => {
  const newTitle = {
    title: "NEWTEST",
  };

  const handleClick = async () => {
    const updatedSnippet = await updateSnippet(`/api/snippets/`, id, newTitle);

    mutate(`/api/snippets/${id}`, updatedSnippet, {
      optimisticData: (snippet: any) => ({ ...snippet, title: newTitle }),
      rollbackOnError: true,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Change!</button>
    </div>
  );
};

export default EditSnippet;
