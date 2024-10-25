import axios from 'axios';

const baseURL = `http://flydro.in/api/`;
const API = axios.create({
  baseURL,
});

export { API, baseURL };
