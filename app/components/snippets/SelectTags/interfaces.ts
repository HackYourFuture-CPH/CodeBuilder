export interface Option {
  label: string;
  value: string | any;
};

export interface SelectTagProps {
  placeholder?: string;
  options: Option[];
  value: Option[] | any;
  isMulti: boolean;
  onChange: (value: Option[] | null | any) => void;
}