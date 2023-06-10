import { FC, useEffect, useRef, useState } from 'react';
import { HiCursorClick } from 'react-icons/hi';
import { VscDebugRestart } from 'react-icons/vsc';
import Word from '../components/typing/Word';
import useTimer from '../hooks/useTimer';

interface TypingTestProps {}

const testPassage: string =
  'The boy walked down the street in a carefree way, playing without notice of what was about him. He did not hear the sound of the car as his ball careened into the road. He took a step toward it, and in doing so sealed his fate.';
// const testPassage: string = 'This is a test.';
const test = testPassage.split(' ');

export const TypingTest: FC<TypingTestProps> = ({}) => {
  const wordSet = test;
  // const [wordSet, setWordSet] = useState<string[]>(test);
  const [typedWordList, setTypedWordList] = useState<string[]>(['']);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [mistypedCount, setMistypedCount] = useState(0);
  const [testStatus, setTestStatus] = useState(0); // -1: test end, 0: waiting for test to start, 1: test ongoing
  const [timeTaken, setTimeTaken] = useState(0);
  const [wrongLettersInWord, setWrongLettersInWord] = useState(0);
  const [isFocused, setIsFocused] = useState(true);
  const [result, setResult] = useState({
    wpm: 0,
    time: 0,
  });
  const INITIAL_TIME = 120;
  const [time, { startTimer, pauseTimer, resetTimer }] = useTimer(INITIAL_TIME); // default time is 120 seconds
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restartRef = useRef<HTMLButtonElement>(null);

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

  const restartTest = () => {
    resetTimer();
    setTestStatus(0);
    setTypedWordList(['']);
    setActiveWordIndex(0);
    setMistypedCount(0);
    setTimeTaken(0);
    setWrongLettersInWord(0);
    setResult({
      wpm: 0,
      time: 0,
    });
    focusOnInput();
    clearInput();
  };

  const focusOnInput = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    inputRef.current!.value = '';
  };

  // const handleTab = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Tab' && e.target !== restartRef.current) {
  //     e.preventDefault();
  //   }
  //   restartRef.current?.focus();
  // };

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
    if (lastTypedWord.length >= wordSet[activeWordIndex].length)
      setWrongLettersInWord(wrongLettersInWord + 1);

    if (
      typed.slice(-1) !== ' ' &&
      typed.slice(-1) !==
        wordSet[activeWordIndex].charAt(lastTypedWord?.length || 0)
    ) {
      setMistypedCount(mistypedCount + 1);
    }
    setTypedWordList(typed.split(' '));
  };

  // if finished word set, stop the test
  useEffect(() => {
    console.log(typedWordList);
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
    setResult({
      wpm: WPM,
      time: timeTaken,
    });
  }, [testStatus]);

  return (
    <div
      className={
        'flex flex-col justify-center items-center gap-8 text-xl relative'
      }
      ref={containerRef}
      // onKeyDown={handleTab}
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
        className={`flex flex-col gap-8 ${
          !isFocused ? 'blur-sm' : ''
        } transition`}
      >
        <div className={`flex flex-wrap`}>
          {test.map((word, index) => (
            <Word
              key={index}
              // index={index}
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
          onBlur={() => setIsFocused(false)}
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
            WPM: {result.wpm} time: {result.time}
          </div>
        )}
      </div>
      <button
        onClick={restartTest}
        ref={restartRef}
        className="p-4 hover:text-white transition focus:text-white outline-none "
        tabIndex={0}
      >
        <VscDebugRestart />
      </button>
    </div>
  );
};
