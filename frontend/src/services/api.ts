import axios from 'axios';

const http = () => {
  const api_url: string =
    process.env.NODE_ENV === 'production'
      ? 'https://whale-app-s3qwf.ondigitalocean.app/'
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
