import axios from 'axios';




axios.defaults.withCredentials = true;

const USER_BASE_REST_API_URL = 'http://localhost:8080';

export const getProfile = (input) => {
    const params = {
        username: input,
      };
    return axios.get(USER_BASE_REST_API_URL+'/user/profile',{params:params});
}

export const getWallet = (input) =>{

    const id = input

    const param ={
         id:id
    }

    return axios.get(USER_BASE_REST_API_URL+'/user/wallet',{params:param})
}


export const sendOtp = (input) =>{

    const params = {
        username: input,
      };

    return axios.get(USER_BASE_REST_API_URL+'/user/sendotp',{params:params})
}


export const getTransactions = (id)=>{

return axios.get(USER_BASE_REST_API_URL+`/user/wallet/transactions/${id}`)
}

export const createOrder = (input) =>
{
    return axios.get(USER_BASE_REST_API_URL+`/user/payment/${input}`)
}


export const addWallet = (input) =>{

    return axios.post(USER_BASE_REST_API_URL+'/user/wallet/add',input)
}

export const changePassword =(input) =>{

    return axios.post(USER_BASE_REST_API_URL+'/user/change-password',input)
}

export const verifyOtp = (input) =>{

    return axios.get(USER_BASE_REST_API_URL+'/user/verify-otp',{params:input})
}