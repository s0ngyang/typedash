// @ts-nocheck
import { useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Room from './components/Room';
import { authContext } from './context/authContext';
import Account from './routes/Account';
import Layout from './routes/Layout';
import Login from './routes/Login';
import Multiplayer from './routes/Multiplayer';
import Register from './routes/Register';
import Singleplayer from './routes/Singleplayer';

function App() {
  const [user, setUser] = useState<string>();
  const context = useContext(authContext);
  const toast = useToast();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decoded = jwt_decode<JwtPayload>(token || '') || null;
  //     setUser(decoded.name);
  //   } else {
  //     toast({
  //       title: 'Session expired.',
  //       description: 'Please login again',
  //       variant: 'subtle',
  //       status: 'error',
  //       position: 'top-right',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     navigate('/login');
  //   }
  // }, []);
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
