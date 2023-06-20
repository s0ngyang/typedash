import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { authContext } from './context/authContext';
import Layout from './routes/Layout';
import Login from './routes/Login';
import { TypingTest } from './routes/TypingTest';

function App() {
  const [user, setUser] = useState<string>();
  return (
    <authContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/singleplayer" element={<TypingTest />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/singleplayer" replace />} />
        </Route>
      </Routes>
    </authContext.Provider>
  );
}

export default App;
