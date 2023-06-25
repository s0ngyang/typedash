import { Button } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiplayerTest from '../components/typing/MultiplayerTest';
import ProgressBar from '../components/typing/ProgressBar';
import { ChallengeProps } from '../components/typing/challenges/Books.constants';
import useTimer from '../helpers/useTimer';
import socket from '../services/socket';
interface RoomProps {}
interface TypingProgressProps {
  playerId: number;
}

const Room: FC<RoomProps> = ({}) => {
  const location = useLocation();
  const roomID = location.pathname.split('/')[2];
  const roomUrl = `https://typedash.com/multiplayer/${roomID}`;
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(1);
  const [listOfPlayers, setListOfPlayers] = useState<string[]>();
  const [readyPlayers, setReadyPlayers] = useState(0);
  const [time, { startTimer, pauseTimer, resetTimer }] = useTimer(5);
  const [lettersTyped, setLettersTyped] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [chosenChallenge, setChosenChallenge] = useState<ChallengeProps>();
  const [typingProgresses, setTypingProgresses] = useState({});

  useEffect(() => {
    socket.emit('joinRoom', roomID);

    socket.on('playerJoined', ({ players, challenge }) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
      setChosenChallenge(challenge);
      //console.log(players.length);
    });

    socket.on('roomJoined', (challenge) => {
      console.log(challenge);
    });

    socket.on('invalidRoom', () => {
      alert('Room not found!');
      navigate('/singleplayer');
    });

    socket.on('playerLeft', (players) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
    });

    socket.on('receiveReady', (readyCount) => {
      setReadyPlayers(readyCount);
    });

    socket.on('progressUpdate', ({ playerId, progress }) => {
      setTypingProgresses((prevProgress) => ({
        ...prevProgress,
        [playerId]: progress,
      }));
    });
  }, []);

  useEffect(() => {
    if (readyPlayers === numPlayers) {
      startTimer();
      setGameStarted(true);
      socket.emit('gameStart');
      if (listOfPlayers) {
        for (let i = 0; i < listOfPlayers!.length; i++) {
          setTypingProgresses((prevProgress) => ({
            ...prevProgress,
            [listOfPlayers[i]]: 0,
          }));
        }
      }
    }
  }, [readyPlayers, numPlayers]);

  const leaveRoom = () => {
    socket.emit('leaveRoom');
    navigate('/singleplayer');
  };

  const ready = () => {
    socket.emit('sendReady');
  };

  return (
    <>
      {readyPlayers === numPlayers && (
        <>
          {/* {gameStarted &&
            Object.entries(typingProgresses).map((arr) => (
              <div className="flex">
                <div>{arr[0]}</div>
                <ProgressBar
                  lettersTyped={100}
                  totalLetters={chosenChallenge?.content.split('').length!}
                />
              </div>
            ))} */}
          {gameStarted &&
            listOfPlayers!.map((id) => (
              <div className="flex">
                <div>{id}</div>
                <ProgressBar
                  lettersTyped={5}
                  totalLetters={chosenChallenge?.content.split('').length!}
                />
              </div>
            ))}
        </>
      )}

      <MultiplayerTest
        startTyping={time === 0}
        setLettersTyped={setLettersTyped}
      />

      {readyPlayers === numPlayers && (
        <div>{`Game is starting in ${time}`}</div>
      )}

      {readyPlayers !== numPlayers && (
        <Button onClick={ready} variant="ghost">
          ready
        </Button>
      )}

      <Button onClick={leaveRoom} variant="ghost">
        leave room
      </Button>

      {/* <div>{listOfPlayers}</div> */}
      <div>
        {readyPlayers}/{numPlayers} ready
      </div>
      <div>invite link: {roomUrl}</div>
    </>
  );
};

export default Room;
