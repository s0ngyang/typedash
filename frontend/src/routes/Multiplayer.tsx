import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import socket from '../services/socket';

interface MultiplayerProps {}

const Multiplayer: FC<MultiplayerProps> = ({}) => {
  console.log('multiplayer');
  const createRoom = () => {
    socket.emit('createRoom', { id: socket.id });
  };

  return (
    <div className="flex flex-col justify-center">
      <Button variant="ghost" onClick={createRoom}>
        <NavLink to={`${socket.id}`}>Create Room</NavLink>
      </Button>
    </div>
  );
};

export default Multiplayer;
