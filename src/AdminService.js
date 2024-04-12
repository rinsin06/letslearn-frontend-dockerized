import axios from 'axios';

import axiosconfig from './config/axios';

axios.defaults.withCredentials = true;

const USER_BASE_REST_API_URL = 'http://localhost:8080';

const handleApiError = (func) => async (...args) => {
    try {
      // Call the original function with arguments
      const response = await func(...args);
      return response.data; // Return the response data
    } catch (error) {
      // Handle errors here
      if (error.response && error.response.status === 500) {
        // Handle 500 errors
        console.error('Internal Server Error');
        // Throw the error again to be caught by the caller
        throw error;
      } else {
        // Handle other errors
        console.error('API Error:', error.message);
        // Throw the error again to be caught by the caller
        throw error;
      }
    }
  };
  


export const getCourses = () => {
    return axios.get(USER_BASE_REST_API_URL+'/admin/all-courses' );
}

export const getCategories = () => {
    return axios.get(USER_BASE_REST_API_URL+'/admin/all-categories' );
}


export const addCategories = (input) => {

    const data = {
        categoryName:input,
    }
   
    return axios.post(USER_BASE_REST_API_URL+'/admin/create-category',data);
}


export const addsubCategories = (input,input1) => {

    const data = {
        categoryName:input,
        subcategoryName:input1
    }
   
    return axios.post(USER_BASE_REST_API_URL+'/admin/create-subcategory',data);
}

export const addCourse = (input) => {



   
    return axios.post(USER_BASE_REST_API_URL+'/admin/create-course',input);

}


export const deleteCourse = (input)=>{

    const param = {

        course_id:input
    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/delete-course',{params:param})
}

export const addLessons = (input,input2,input3) => {

   const data = {

    courseId:input2,
    lessonRequest:input,
    deleteRequest:input3
   }

   
    return axios.post(USER_BASE_REST_API_URL+'/admin/create-lessons',data);

}

export const getLessons = (input)=>{

    const param = {

        id:input
    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/course-lessons',{params:param})
}

export const addToWishList = (input)=>{

    return axios.post(USER_BASE_REST_API_URL+'/admin/addTo-wishlist',input);
}

export const getWishList = (input)=>{

    const param ={

        user_id:input
    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/getWishList',{params:param})
}

export const removeFromList = (input)=>{

    const param = {

        id:input
    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/removeFromWishList',{params:param})
}

export const addToCart = (userId,coursesId)=>{

    const data = {

        userId:userId,
        courseId:coursesId
    }

    return axios.post(USER_BASE_REST_API_URL + '/admin/addtocart',data)
}

export const removeFromCart = (input)=>{

    const param = {

        id:input
    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/removeCartItem',{params:param})
}


export const getUserCart = (input)=>{

    const param = {

        user_id:input

    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/getUserCart',{params:param})
}

export const checkoutfromcart = (input)=>{

    

    return axios.post(USER_BASE_REST_API_URL+'/admin/checkoutFromCart',input)
}

export const checkoutfromwishlist = (input)=>{

    const data = {

        wishListIds:input
    }

    return axios.post(USER_BASE_REST_API_URL+'/admin/checkoutFromWishList',data)
}

export const addSingleCourseToCart = (userId,courseId)=>{

    const data = {

        userId:userId,
        courseId:courseId
    }

    return axios.post(USER_BASE_REST_API_URL+'/admin/addsingletocart',data)
}


export const addToLearnings = (userId,coursesId)=>{

    const data = {

        userId:userId,
        courseId:coursesId
    }

    return axios.post(USER_BASE_REST_API_URL+'/admin/addCoursesToLearnings',data)
}

export const getLearnings = (input)=>{

    const param = {

        user_id:input

    }

    return axios.get(USER_BASE_REST_API_URL+'/admin/getLearnings',{params:param})
}

export const recordProgress = (userId,courseId,progress)=>{

    const data = {

        userId:userId,
        courseId:courseId,
        progress:progress
    }

    return axios.post(USER_BASE_REST_API_URL+'/admin/recordProgress',data)
}

export const createOrder = (input) =>
{
    return axios.get(USER_BASE_REST_API_URL+`/admin/payment/${input}`)
}



export const getCoupons = () =>
{
    return axios.get(USER_BASE_REST_API_URL+`/admin/coupons`)
}


export const AddCoupon = (input) =>
{
    return axios.post(USER_BASE_REST_API_URL+`/admin/coupons/add`,input)
}

export const EditCoupon = (data,id) =>
{
    const param={
        id:id
    }
    return axios.post(USER_BASE_REST_API_URL+`/admin/coupons/edit`,data,{params:param})
}


export const DeleteCoupon = (id) =>
{
    const param={
        id:id
    }
    return axios.post(USER_BASE_REST_API_URL+`/admin/coupons/edit`,{params:param})
}