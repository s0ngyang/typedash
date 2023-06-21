import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { authContext } from './context/authContext';
import Layout from './routes/Layout';
import Login from './routes/Login';
import Multiplayer from './routes/Multiplayer';
import Singleplayer from './routes/Singleplayer';

function App() {
  const [user, setUser] = useState<string>();
  return (
    <authContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/singleplayer" replace />} />
        </Route>
      </Routes>
    </authContext.Provider>
  );
}

export default App;
