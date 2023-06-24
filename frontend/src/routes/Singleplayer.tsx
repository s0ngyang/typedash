import type { FC } from 'react';
import TypingTest from '../components/typing/TypingTest';

interface SingleplayerProps {}

const Singleplayer: FC<SingleplayerProps> = ({}) => {
  return <TypingTest isMultiplayer={false} />;
};

export default Singleplayer;
