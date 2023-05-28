import { FC } from 'react';

interface TextFieldProps {
  type: string;
  placeholder: string;
}

const TextField: FC<TextFieldProps> = ({ type, placeholder }) => {
  return (
    <input
      className="bg-transparent border-solid border-2 border-lightgrey-8008 rounded p-2"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TextField;
