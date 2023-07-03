// @ts-nocheck
import { Button, SlideFade, useToast } from '@chakra-ui/react';
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
  const [listOfPlayers, setListOfPlayers] = useState<string[]>([]);
  const [readyPlayers, setReadyPlayers] = useState(0);
  const [time, { startTimer, pauseTimer, resetTimer }] = useTimer(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [chosenChallenge, setChosenChallenge] = useState<ChallengeProps>();
  const [lettersTyped, setLettersTyped] = useState(0);
  const [typingProgresses, setTypingProgresses] = useState({});
  const context = useContext(authContext);
  const username = context?.user || 'Guest';
  const toast = useToast();

  const leaveRoom = () => {
    socket.emit('leaveRoom');
    navigate('/singleplayer');
  };

  const ready = () => {
    socket.emit('sendReady', username);
  };

  useEffect(() => {
    socket.emit('joinRoom', {
      roomID: roomID,
      username: username,
    });

    socket.on('invalidRoom', () => {
      toast({
        title: 'Room not found.',
        description: '',
        variant: 'subtle',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      navigate('/singleplayer');
    });

    socket.on('playerJoined', ({ players, challenge }) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
      setChosenChallenge(challenge);
    });

    socket.on('playerLeft', (players) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
    });

    socket.on('receiveReady', (readyCount) => {
      setReadyPlayers(readyCount);
    });

    socket.on('progressUpdate', ({ id, progress }) => {
      setTypingProgresses((prevProgress) => ({
        ...prevProgress,
        [id]: progress,
      }));
    });

    console.log(typingProgresses);
  }, []);

  useEffect(() => {
    if (readyPlayers === numPlayers) {
      startTimer();
      setGameStarted(true);
      socket.emit('typingProgress', 0);
    }
  }, [readyPlayers, numPlayers]);

  console.log(typingProgresses);

  return (
    <>
      {listOfPlayers!.map((player) => (
        <div key={player.id}>
          <div>{player.username}</div>
          <div className="w h-4 transition">
            <SlideFade in={time === 0}>
              <ProgressBar
                lettersTyped={typingProgresses[player.id]}
                totalLetters={chosenChallenge?.content.split('').length!}
              />
            </SlideFade>
          </div>
        </div>
      ))}

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
