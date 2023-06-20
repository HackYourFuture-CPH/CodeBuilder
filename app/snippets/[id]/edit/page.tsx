"use client";
import { mutate } from "swr";
import { updateSnippet } from "@/app/services/SnippetService";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const EditSnippet: React.FC<Props> = ({ params: { id } }) => {
  const router = useRouter();
  const newTitle = {
    title: "TEST",
  };

  const handleClick = async () => {
    const updatedSnippet = await updateSnippet(`/api/snippets/`, id, newTitle);

    mutate(`/api/snippets/${id}`, updatedSnippet, {
      optimisticData: (snippet: any) => ({ ...snippet, title: newTitle }),
      rollbackOnError: true,
    });

    router.push(`/snippets/${id}`);
  };

  return (
    <div>
      <button onClick={handleClick}>Change!</button>
    </div>
  );
};

export default EditSnippet;
