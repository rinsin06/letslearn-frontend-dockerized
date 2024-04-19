import axios from 'axios';




axios.defaults.withCredentials = true;

const USER_BASE_REST_API_URL = 'https://shopifytech.xyz';

const axiosInstance = axios.create({

});

// Add a request interceptor to add the token to headers before sending the request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getProfile = (input) => {
    const params = {
        username: input,
      };
    return axiosInstance.get(USER_BASE_REST_API_URL+'/user/profile',{params:params});
}

export const getWallet = (input) =>{

    const id = input

    const param ={
         id:id
    }

    return axiosInstance.get(USER_BASE_REST_API_URL+'/user/wallet',{params:param})
}


export const sendOtp = (input) =>{

    const params = {
        username: input,
      };

    return axiosInstance.get(USER_BASE_REST_API_URL+'/user/sendotp',{params:params})
}


export const getTransactions = (id)=>{

return axiosInstance.get(USER_BASE_REST_API_URL+`/user/wallet/transactions/${id}`)
}

export const createOrder = (input) =>
{
    return axiosInstance.get(USER_BASE_REST_API_URL+`/user/payment/${input}`)
}


export const addWallet = (input) =>{

    return axiosInstance.post(USER_BASE_REST_API_URL+'/user/wallet/add',input)
}

export const changePassword =(input) =>{

    return axiosInstance.post(USER_BASE_REST_API_URL+'/user/change-password',input)
}

export const verifyOtp = (input) =>{

    return axiosInstance.get(USER_BASE_REST_API_URL+'/user/verify-otp',{params:input})
}
