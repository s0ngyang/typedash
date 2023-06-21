import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface MultiplayerProps {}

const Multiplayer: FC<MultiplayerProps> = ({}) => {
  return (
    <div className="flex flex-col justify-center">
      <Button variant="ghost">Create Room</Button>
    </div>
  );
};

export default Multiplayer;
