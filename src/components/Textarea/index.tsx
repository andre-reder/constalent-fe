import PropTypes from 'prop-types';
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
  darkBorder,
  height,
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

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  darkBorder: PropTypes.bool,
  height: PropTypes.number,
  // error: PropTypes.string,
};

Textarea.defaultProps = {
  darkBorder: false,
  height: 150,
  // error: '',
};
