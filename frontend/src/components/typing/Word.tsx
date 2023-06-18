import { FC, memo } from 'react';
import Caret from './Caret';
import Letter from './Letter';

interface WordProps {
  word: string;
  typedWord: string;
  status: string;
}

const Word: FC<WordProps> = ({ word, typedWord, status }) => {
  const letters = word.split('').map((char, i) => {
    let letterStatus = 'letter-idle';
    if (status === 'completed') {
      letterStatus = 'letter-correct';
    } else if (status === 'active') {
      if (typedWord?.charAt(i) === char) {
        letterStatus = 'letter-correct';
      } else if (typedWord?.charAt(i) !== char && typedWord?.charAt(i)) {
        letterStatus = 'letter-incorrect';
      }
    }
    return <Letter key={i} status={letterStatus} char={char} />;
  });
  const wrongLetters = typedWord
    ?.slice(word.length)
    .split('')
    .map((char, i) => {
      return <Letter key={i} status={'letter-incorrect'} char={char} />;
    });
  return (
    <div className={`flex word-active h-8`}>
      {status === 'active' && (
        <Caret offset={12.05 * typedWord?.length || -3} />
      )}
      {letters}
      {typedWord?.length > word.length && wrongLetters}
      &nbsp;
    </div>
  );
};

export default memo(Word);
