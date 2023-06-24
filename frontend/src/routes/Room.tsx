import { FC, useEffect, useState } from 'react';
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
  const userId = 1;

  useEffect(() => {
    socket.emit('joinRoom', { sessionID: roomId, userID: userId });

    socket.on('roomJoined', (challenge) => {
      console.log(challenge);
      setChosenChallenge(challenge);
    });

    // socket.on('roomCreated', ({ sessionID, userID }) => {
    //   // attach the session ID to the next reconnection attempts
    //   socket.auth = { sessionID };
    //   // store it in the localStorage
    //   localStorage.setItem('sessionID', sessionID);
    //   // save the ID of the user
    //   socket.userID = userID;
    // });
  }, []);

  return (
    <>
      <TypingTest isMultiplayer={true} specificChallenge={chosenChallenge} />
      <div>{roomUrl}</div>
    </>
  );
};

export default Room;
