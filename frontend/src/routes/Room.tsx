import { FC, memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TypingTest from '../components/typing/TypingTest';
import { ChallengeProps } from '../components/typing/challenges/Books.constants';
import { randomChallenge } from '../helpers/randomChallenge';
import socket from '../services/socket';

interface RoomProps {}

const Room: FC<RoomProps> = ({}) => {
  const location = useLocation();
  const [chosenChallenge, setChosenChallenge] = useState<ChallengeProps>();
  const roomId = location.pathname.split('/')[2];
  const roomUrl = `https://typedash.com/multiplayer/${roomId}`;

  socket.on('roomCreated', (arg) => {
    console.log('hi');
    if (arg.id === socket.id) {
      const random = randomChallenge();
      setChosenChallenge(random);
      socket.emit('showChallenge', { challenge: random });
    }
  });

  if (roomId !== socket.id) {
    socket.on('showChallenge', (arg) => {
      setChosenChallenge(arg.challenge);
    });
  }
  return (
    <>
      <TypingTest isMultiplayer={true} specificChallenge={chosenChallenge} />
      <div>{roomUrl}</div>
    </>
  );
};

export default memo(Room);
