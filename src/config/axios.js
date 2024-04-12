import axios from 'axios';
import { useHistory } from 'react-router-dom';



const axiosconfig =  axios.create({
    
    timeout: 5000, // request timeout in milliseconds
});

const baseUrl = 'http://localhost:8080';



axiosconfig.interceptors.response.use(

    
    function(response) {
      // Return the response if it's successful
      return response;
    },
    function(error) {
        
      // Check if the error status code is 500
      if (error.response && error.response.status === 500) {
        // Redirect to the login page
        
      }
      // Return the error
      return Promise.reject(error);
    }
  );

  export default axiosconfig;