import { ChangeEvent } from 'react';
import { StyledTextarea } from './styles';

interface TextareaInterface {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  darkBorder?: boolean;
  height?: number;
  maxLength?: number,
}


export default function Textarea({
  value,
  placeholder,
  onChange,
  darkBorder = false,
  height = 150,
  maxLength = undefined,
}: TextareaInterface) {
  return (
    <StyledTextarea
      placeholder={placeholder}
      onChange={onChange}
      darkBorder={darkBorder}
      height={height}
      value={value}
      maxLength={maxLength}
    />
  );
}
