import axios from 'axios';

const api = axios.create({
  baseURL: 'https://authencation-jwt-node-growdev.herokuapp.com/',
});

export default api;
