import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './routes/Layout';
import Login from './routes/Login';
import { TypingTest } from './routes/TypingTest';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TypingTest />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
