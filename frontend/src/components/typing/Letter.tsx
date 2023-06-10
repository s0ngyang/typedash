import { FC, memo } from 'react';

interface LetterProps {
  status: string;
  char: string;
}

const Letter: FC<LetterProps> = ({ status, char }) => {
  return <div className={`${status}`}>{char}</div>;
};

export default memo(Letter);
