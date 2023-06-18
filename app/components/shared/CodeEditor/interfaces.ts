export interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: string;
}