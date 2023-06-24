import { Progress } from '@chakra-ui/react';
import { FC } from 'react';

interface ProgressBarProps {
  lettersTyped: number;
  totalLetters: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ lettersTyped, totalLetters }) => {
  return (
    <Progress
      size="md"
      value={lettersTyped}
      max={totalLetters}
      sx={{
        '& > div:first-child': {
          transitionProperty: 'width',
          backgroundColor: '#f44c7f',
        },
      }}
    />
  );
};

export default ProgressBar;
