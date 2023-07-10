// @ts-nocheck
import { useToast } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { authContext } from './context/authContext';
import Account from './routes/Account';
import CreateLoadout from './routes/CreateLoadout';
import Layout from './routes/Layout';
import Loadout from './routes/Loadout';
import Login from './routes/Login';
import Multiplayer from './routes/Multiplayer';
import Register from './routes/Register';
import Room from './routes/Room';
import Singleplayer from './routes/Singleplayer';
import UpdateLoadout from './routes/UpdateLoadout';
import http from './services/api';

function App() {
  const [user, setUser] = useState<string>();
  const context = useContext(authContext);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000; // get the current time in seconds
      // check if token has expired
      if (decoded.exp < currentTime) {
        // try to use refresh token to get new access token
        http()
          .post('refresh')
          .then((res) => {
            localStorage.setItem('token', res.data.accessToken);
            setUser(decoded.user?.name);
          })
          // if cannot get new access token, remove JWT token in LocalStorage and ask user to login again
          .catch((e) => {
            toast({
              title: 'Session expired.',
              description: 'Please login again',
              variant: 'subtle',
              status: 'error',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
            localStorage.removeItem('token');
            setUser(undefined);
            navigate('/login');
            return;
          });
      } else {
        setUser(decoded.user?.name);
      }
    } else {
      toast({
        title: 'Session expired.',
        description: 'Please login again',
        variant: 'subtle',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      localStorage.removeItem('token');
      navigate('/login');
      setUser(undefined);
    }
  }, []);
  return (
    <authContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/multiplayer">
            <Route index={true} element={<Multiplayer />} />
            <Route path=":roomId" element={<Room />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="account/loadout" element={<Loadout />} />
          <Route path="account/loadout/create" element={<CreateLoadout />} />
          <Route path="account/loadout/update" element={<UpdateLoadout />} />
          <Route path="*" element={<Navigate to="/singleplayer" replace />} />
        </Route>
      </Routes>
    </authContext.Provider>
  );
}

export default App;
