import { FC } from 'react';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000');

interface RoomProps {}

export const Room: FC<RoomProps> = () => {
  const sendId = () => {};
  return (
    <div>
      <button onClick={sendId}>Create Room</button>
    </div>
  );
};

export default Room;
