// @ts-nocheck
import { useToast } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { authContext } from './context/authContext';
import Account from './routes/Account';
import Layout from './routes/Layout';
import Login from './routes/Login';
import Multiplayer from './routes/Multiplayer';
import Register from './routes/Register';
import Room from './routes/Room';
import Singleplayer from './routes/Singleplayer';
import { refreshUser } from './services/services';

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
        refreshUser()
          .then((res) => {
            localStorage.setItem('token', res.data.accessToken);
            setUser(decoded.user?.name);
          })
          .catch(() => {
            localStorage.removeItem('token');
            setUser(undefined);
            return;
          });
      } else {
        // if token has not expired
        setUser(decoded.user?.name);
      }
    } else {
      localStorage.removeItem('token');
      setUser(undefined);
    }
  }, []);
  return (
    <authContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/singleplayer' element={<Singleplayer />} />
          <Route path='/multiplayer' element={<Multiplayer />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/multiplayer'>
            <Route index={true} element={<Multiplayer />} />
            <Route path=':roomId' element={<Room />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='account' element={<Account />} />
          <Route path='*' element={<Navigate to='/singleplayer' replace />} />
        </Route>
      </Routes>
    </authContext.Provider>
  );
}

export default App;
