import { FC, memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TypingTest from '../components/typing/TypingTest';
import { ChallengeProps } from '../components/typing/challenges/Books.constants';
import socket from '../services/socket';

interface RoomProps {}

const Room: FC<RoomProps> = ({}) => {
  const location = useLocation();
  const [chosenChallenge, setChosenChallenge] = useState<ChallengeProps>();
  const roomId = location.pathname.split('/')[2];
  const roomUrl = `https://typedash.com/multiplayer/${roomId}`;

  useEffect(() => {
    if (roomId !== socket.id) {
      socket.emit('joinRoom', roomId);
    }
    socket.on('roomJoined', (challenge) => {
      console.log(challenge);
      setChosenChallenge(challenge);
    });
  }, []);
  return (
    <>
      <TypingTest isMultiplayer={true} specificChallenge={chosenChallenge} />
      <div>{roomUrl}</div>
    </>
  );
};

export default memo(Room);
