
import axios from 'axios';


axios.defaults.withCredentials = true;

const USER_BASE_REST_API_URL = 'https://shopifytech.xyz';

export const loginUser = (input) => {
     const response = axios.post(USER_BASE_REST_API_URL+'/auth/token'  ,input).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return error.response;
        }  });

      return response;
}

export const addNewUser = (input) => {
    return axios.post(USER_BASE_REST_API_URL+'/auth/register'  ,input);
}

export const validateToken = () => {
    return axios.get(USER_BASE_REST_API_URL+'/auth/validate');
}

export const getAllUsers = () => {
    return axios.get(USER_BASE_REST_API_URL+'/auth/all-users');
}

export const editUser = (input,Id) =>{

    const param ={
        id:Id
   }

    return axios.post(USER_BASE_REST_API_URL+'/auth/editUser',input,{params:param})
}


export const passwordReset = (input)=>{


    return axios.post(USER_BASE_REST_API_URL+'/auth/reset-password',input)
}



