import axios from 'axios';

const baseURL = `https://flydro.in/api/`;
const API = axios.create({
  baseURL,
});

export { API, baseURL };
