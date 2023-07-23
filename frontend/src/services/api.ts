import axios from 'axios';
import.meta.env.MODE;

const http = () => {
  const api_url: string =
    process.env.NODE_ENV === 'production'
      ? 'https://typedash-api-5bqlc.ondigitalocean.app/'
      : 'http://localhost:3000/';
  const instance = axios.create({
    baseURL: api_url,
    headers: {
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });
  instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  return instance;
};

export default http;
