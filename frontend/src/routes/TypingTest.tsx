import { Progress, SlideFade, Tooltip } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { HiCursorClick } from 'react-icons/hi';
import { VscDebugRestart } from 'react-icons/vsc';
import Word from '../components/typing/Word';
import BookChallenges, {
  ChallengeProps,
} from '../components/typing/challenges/Books.constants';
import useTimer from '../hooks/useTimer';

interface TypingTestProps {}

export const TypingTest: FC<TypingTestProps> = ({}) => {
  const [challenge, setChallenge] = useState<ChallengeProps>();
  const [wordSet, setWordSet] = useState<string[]>([]);
  const [letterSet, setLetterSet] = useState<string[]>([]);
  const [typedWordList, setTypedWordList] = useState<string[]>(['']);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [mistypedCount, setMistypedCount] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [testStatus, setTestStatus] = useState(0); // -1: test end, 0: waiting for test to start, 1: test ongoing
  const [timeTaken, setTimeTaken] = useState(0);
  const [wrongLettersInWord, setWrongLettersInWord] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [wrongLetters, setWrongLetters] = useState<number[]>([]);
  const [result, setResult] = useState({
    wpm: 0,
    accuracy: 0,
    time: 0,
  });
  const INITIAL_TIME = 120;
  const [time, { startTimer, pauseTimer, resetTimer }] = useTimer(INITIAL_TIME); // default time is 120 seconds
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // first load
    const firstChallenge = randomChallenge();
    setLetterSet(firstChallenge.content.split(''));
    setWordSet(firstChallenge.content.split(' '));
  }, []);

  useEffect(() => {
    if (challenge) {
      setLetterSet(challenge.content.split(''));
      setWordSet(challenge.content.split(' '));
    }
  }, [challenge]);

  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickAway);
    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [inputRef]);

  // if finished word set, stop the test
  useEffect(() => {
    if (
      typedWordList.length >= wordSet.length &&
      typedWordList.at(-1) === wordSet.at(-1)
    ) {
      pauseTimer();
      setTestStatus(-1);
      setTimeTaken(INITIAL_TIME - time);
    }
  }, [typedWordList, wordSet]);

  // generate result once test ends
  useEffect(() => {
    if (testStatus !== -1) return;
    const WPM = Math.floor((wordSet.length / timeTaken) * 60);
    const accuracy = +(
      ((totalStrokes - mistypedCount) / totalStrokes) *
      100
    ).toFixed(2);
    setResult({
      wpm: WPM,
      accuracy,
      time: timeTaken,
    });
  }, [testStatus]);

  const randomChallenge = () => {
    const temp = BookChallenges.filter((item) => item.id !== challenge?.id);
    return temp[Math.floor(Math.random() * temp.length)];
  };

  const restartTest = () => {
    resetTimer();
    setTestStatus(0);
    setTypedWordList(['']);
    setActiveWordIndex(0);
    setMistypedCount(0);
    setActiveLetterIndex(0);
    setTimeTaken(0);
    setWrongLettersInWord(0);
    setWrongLetters([]);
    setResult({
      wpm: 0,
      accuracy: 0,
      time: 0,
    });
    focusOnInput();
    clearInput();
    setChallenge(randomChallenge());
  };

  const focusOnInput = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    inputRef.current!.value = '';
  };

  const handleTab = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      restartRef.current?.focus();
    }
    // inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      if (wordSet[activeWordIndex] !== typedWordList[activeWordIndex]) {
        e.preventDefault();
      } else {
        setActiveWordIndex(typedWordList.length);
        setWrongLettersInWord(0);
      }
    } else if (e.key === 'Backspace') {
      if (wrongLettersInWord > 0) setWrongLettersInWord(wrongLettersInWord - 1);
      if (inputRef.current?.value.slice(-1) === ' ') e.preventDefault();
    } else {
      if (e.key !== 'Shift') {
        setTotalStrokes(totalStrokes + 1);
      }
    }
  };

  // function to handle each key press
  const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (wrongLettersInWord >= 10) {
      inputRef.current!.value = inputRef.current?.value.slice(0, -1)!;
      return;
    }
    if (testStatus === 0) {
      startTimer();
      setTestStatus(1);
    }

    const typed = e.target.value;

    const lastTypedWord = typedWordList[typedWordList.length - 1];
    const currentLetterIndex = typed.length - 1;
    if (lastTypedWord?.length >= wordSet[activeWordIndex]?.length)
      setWrongLettersInWord(wrongLettersInWord + 1);
    if (
      typed.slice(-1) !== ' ' &&
      typed.slice(-1) !== letterSet[currentLetterIndex]
    ) {
      if (!wrongLetters.includes(currentLetterIndex)) {
        setWrongLetters([...wrongLetters, currentLetterIndex]);
        setMistypedCount(mistypedCount + 1);
      }
    } else if (typed.slice(-1) === letterSet[currentLetterIndex]) {
      setActiveLetterIndex(typed.length);
      if (wrongLetters.includes(currentLetterIndex)) {
        const filtered = wrongLetters.filter((x) => x !== currentLetterIndex);
        setWrongLetters(filtered);
      }
    }
    setTypedWordList(typed.split(' '));
  };

  return (
    <div
      className={
        'flex flex-col justify-center items-center gap-8 text-xl relative'
      }
      ref={containerRef}
      onKeyDown={handleTab}
    >
      {!isFocused && (
        <div
          onClick={focusOnInput}
          className="flex items-center gap-4 absolute z-10 pb-12 text-white"
        >
          <HiCursorClick /> Click here to refocus
        </div>
      )}
      <div
        className={`flex flex-col justify-center items-center gap-8 h-full overflow-hidden ${
          !isFocused ? 'blur-sm' : ''
        } transition`}
      >
        <div className="w-4/5 h-4 transition">
          <SlideFade in={testStatus === 1}>
            <Progress
              size="md"
              value={activeLetterIndex}
              max={letterSet.length}
              sx={{
                '& > div:first-child': {
                  transitionProperty: 'width',
                  backgroundColor: '#f44c7f',
                },
              }}
            />
          </SlideFade>
        </div>
        <div className="flex flex-wrap h-1/5">
          {wordSet.map((word, index) => (
            <Word
              key={index}
              word={word}
              typedWord={typedWordList[index]}
              status={
                index === activeWordIndex
                  ? 'active'
                  : index < activeWordIndex && typedWordList[index] === word
                  ? 'completed'
                  : 'idle'
              }
            />
          ))}
        </div>
        <input
          autoFocus
          type="text"
          onChange={handleKeyPress}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="absolute -z-10 border-none bg-transparent focus:outline-none caret-transparent text-transparent"
        />
        <div className="">
          <h1>{time}</h1>
        </div>
        {testStatus === -1 && (
          <div>
            WPM: {result.wpm} accuracy: {`${result.accuracy}%`} time:{' '}
            {result.time}
          </div>
        )}
        <Tooltip
          label="Restart Test"
          fontSize="md"
          aria-label="Restart test tooltip"
          className="font-mono"
        >
          <button
            onClick={restartTest}
            ref={restartRef}
            className="p-4 hover:text-white transition focus:text-white outline-none "
            tabIndex={0}
          >
            <VscDebugRestart />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
