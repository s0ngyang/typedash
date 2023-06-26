import axios from 'axios';
import.meta.env.MODE;

const http = () => {
  const api_url: string =
    process.env.NODE_ENV === 'production'
      ? 'https://typedash-api.onrender.com'
      : 'http://localhost:3000/';
  const instance = axios.create({
    // withCredentials: true,
    baseURL: api_url,
    headers: {
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });
  return instance;
};

export default http;
