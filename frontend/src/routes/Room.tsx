import { Button } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TypingTest from '../components/typing/TypingTest';
import { ChallengeProps } from '../components/typing/challenges/Books.constants';
import socket from '../services/socket';

interface RoomProps {}

const Room: FC<RoomProps> = ({}) => {
  const location = useLocation();
  const [chosenChallenge, setChosenChallenge] = useState<ChallengeProps>();
  const roomID = location.pathname.split('/')[2];
  const roomUrl = `https://typedash.com/multiplayer/${roomID}`;
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(1);
  const [listOfPlayers, setListOfPlayers] = useState<string[]>();

  useEffect(() => {
    socket.emit('joinRoom', roomID);

    socket.on('playerJoined', (players) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
    });

    socket.on('roomJoined', (challenge) => {
      console.log(challenge);
      setChosenChallenge(challenge);
    });

    socket.on('invalidRoom', () => {
      // show alert
      alert('Room not found!');
      navigate('/singleplayer');
    });

    socket.on('playerLeft', (players) => {
      setNumPlayers(players.length);
      setListOfPlayers(players);
    });
  }, []);

  const leaveRoom = () => {
    navigate('/singleplayer');
  };

  return (
    <>
      <TypingTest specificChallenge={chosenChallenge} />
      <Button onClick={leaveRoom} variant="ghost">
        leave room
      </Button>
      <div>{listOfPlayers}</div>
      <div>{numPlayers}</div>
      <div>{roomUrl}</div>
    </>
  );
};

export default Room;
