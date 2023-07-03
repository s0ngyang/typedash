// @ts-nocheck
import { Button } from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MultiplayerTest from '../components/typing/MultiplayerTest';
import ProgressBar from '../components/typing/ProgressBar';
import { ChallengeProps } from '../components/typing/challenges/Books.constants';
import { authContext } from '../context/authContext';
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
  const [gameStarted, setGameStarted] = useState(false);
  const [chosenChallenge, setChosenChallenge] = useState<ChallengeProps>();
  const [lettersTyped, setLettersTyped] = useState(0);
  const [typingProgresses, setTypingProgresses] = useState({});
  const context = useContext(authContext);
  const username = context?.user || 'Guest';

  useEffect(() => {
    socket.emit('joinRoom', {
      roomID: roomID,
      username: username,
    });

    socket.on('playerJoined', ({ players, challenge }) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
      setChosenChallenge(challenge);
      //console.log(players.length);
    });

    // socket.on('roomJoined', (challenge) => {
    //   console.log(challenge);
    // });

    socket.on('invalidRoom', () => {
      // show alert
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

    socket.on('progressUpdate', ({ username, progress }) => {
      setTypingProgresses((prevProgress) => ({
        ...prevProgress,
        [username]: progress,
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
            [listOfPlayers[i].username]: 0,
          }));
        }
      }
    }
  }, [readyPlayers, numPlayers]);

  const leaveRoom = () => {
    socket.emit('leaveRoom', username);
    navigate('/singleplayer');
  };

  const ready = () => {
    socket.emit('sendReady', username);
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
            listOfPlayers!.map((player) => (
              <div key={player} className="flex">
                <div key={player.username}>{player.username}</div>
                <ProgressBar
                  key={player.id}
                  lettersTyped={100}
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
      <div>
        {readyPlayers}/{numPlayers} ready
      </div>
      {readyPlayers !== numPlayers && (
        <Button onClick={ready} variant="ghost">
          ready
        </Button>
      )}

      <div>{`Game is starting in ${time}`}</div>

      <Button onClick={leaveRoom} variant="ghost">
        leave room
      </Button>

      {/* <div>{listOfPlayers}</div> */}

      <div>{roomUrl}</div>
    </>
  );
};

export default Room;
