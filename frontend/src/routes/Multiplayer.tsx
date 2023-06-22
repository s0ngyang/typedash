import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import io, { Socket } from 'socket.io-client';

interface MultiplayerProps {}

const socket: Socket = io('http://localhost:3000');

const Multiplayer: FC<MultiplayerProps> = ({}) => {
  const createRoom = () => {
    socket.emit('createRoom', { id: socket.id });
  };

  return (
    <div className="flex flex-col justify-center">
      <Button variant="ghost" onClick={createRoom}>
        Create Room
      </Button>
    </div>
  );
};

export default Multiplayer;
