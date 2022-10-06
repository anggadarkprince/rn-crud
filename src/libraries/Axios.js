import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api/',
  timeout: 15000,
  headers: {'X-App-Client': 'crud-android'},
});

export default axiosInstance;
