import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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

function App() {
  const [user, setUser] = useState<string>();
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
          <Route path="*" element={<Navigate to="/singleplayer" replace />} />
        </Route>
      </Routes>
    </authContext.Provider>
  );
}

export default App;
