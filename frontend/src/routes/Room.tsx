import { FC, memo, useState } from 'react';
import TypingTest from '../components/typing/TypingTest';
import { randomChallenge } from '../helpers/randomChallenge';
import socket from '../services/socket';

interface RoomProps {}

const Room: FC<RoomProps> = ({}) => {
  const chosenChallenge = randomChallenge();
  const [roomId, setRoomId] = useState<string>();
  const roomUrl = `https://typedash.com/multiplayer/${roomId}`;
  console.log('rerender');

  socket.on('roomCreated', (arg) => {
    console.log('hi');
    setRoomId(arg.id);
    socket.emit('showChallenge', { challenge: chosenChallenge });
  });

  return (
    <>
      <TypingTest isMultiplayer={true} specificChallenge={chosenChallenge} />
      <div>{roomUrl}</div>
    </>
  );
};

export default memo(Room);
