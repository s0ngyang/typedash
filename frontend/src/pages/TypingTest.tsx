import { FC, useEffect, useState } from 'react';
import useTimer from '../hooks/useTimer';

interface TypingTestProps {}

const testPassage: string =
  "The boy walked down the street in a carefree way, playing without notice of what was about him. He didn't hear the sound of the car as his ball careened into the road. He took a step toward it, and in doing so sealed his fate.";
// const testPassage: string = 'This is a test.';
const test = testPassage.split(' ');

export const TypingTest: FC<TypingTestProps> = ({}) => {
  const [wordSet, setWordSet] = useState<string[]>(test);
  const [typedWordList, setTypedWordList] = useState<string[]>(['']);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [mistypedCount, setMistypedCount] = useState(0);
  const [testStatus, setTestStatus] = useState(0); // -1: test end, 0: waiting for test to start, 1: test ongoing
  const [timeTaken, setTimeTaken] = useState(0);
  const [result, setResult] = useState({
    wpm: 0,
    time: 0,
  });
  const INITIAL_TIME = 120;
  const [time, { startTimer, pauseTimer, resetTimer }] = useTimer(INITIAL_TIME); // default time is 120 seconds

  // function to handle each key press
  const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(typedWordList);
    // console.log(wordSet);
    // console.log(testStatus);
    if (testStatus === 0) {
      startTimer();
      setTestStatus(1);
      console.log('test');
    }
    const typed = e.target.value;
    if (
      typed.slice(-1) != ' ' &&
      typed.slice(-1) !=
        wordSet[activeWordIndex].charAt(typedWordList[-1]?.length || 0)
    ) {
      setMistypedCount(mistypedCount + 1);
    }
    setTypedWordList(typed.split(' '));
  };

  // const newWordSet = () => {
  //   setWordSet(testPassage.split(' '));
  // };

  // if finished word set, stop the test
  useEffect(() => {
    if (typedWordList.length > wordSet.length) {
      pauseTimer();
      setTestStatus(-1);
      setTimeTaken(INITIAL_TIME - time);
    } else setActiveWordIndex(typedWordList.length - 1);
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
    <div>
      <div>{testPassage}</div>
      <input type="text" onChange={handleKeyPress} />
      <div>
        <h1>{time}</h1>
        {/* <button onClick={startTimer}>Start</button>
        <button onClick={resetTimer}>Reset</button> */}
      </div>
      {testStatus === -1 && (
        <div>
          WPM: {result.wpm} time: {result.time}
        </div>
      )}
    </div>
  );
};
