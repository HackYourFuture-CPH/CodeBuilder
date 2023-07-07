"use client";
import EditSnippets from "@/app/components/snippets/[id]/edit/page";

type Props = {
  params: {
    id: string;
  };
};

const EditSnippet: React.FC<Props> = ({ params: { id } }) => {
  
  return (
    <div>
      < EditSnippets params={{
        id: id
      }}/>
    </div>
  );
};

export default EditSnippet;
