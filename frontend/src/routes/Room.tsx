import { FC } from 'react';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001');

interface RoomProps {}

export const Room: FC<RoomProps> = () => {
  const sendId = () => {
    socket.emit('createSession', { id: socket.id });
  };
  return (
    <div>
      <button onClick={sendId}>Create Room</button>
    </div>
  );
};

export default Room;
