import axios from 'axios';

import axiosconfig from './config/axios';

axios.defaults.withCredentials = true;

const USER_BASE_REST_API_URL = 'http://localhost:8080';


export const establishConnection = () => {
    return axios.post(USER_BASE_REST_API_URL+'/chat/ws');
}