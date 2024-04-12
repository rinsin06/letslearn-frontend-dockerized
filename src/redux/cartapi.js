import axios from "axios";
import { setCart,setCartError,setCartLoading } from "./Store";

import { getCategories, getCourses, getUserCart } from "../AdminService";


function getCartInfo(){

    return function (dispatch){

        const userId = localStorage.getItem('id')
 
         dispatch(setCartLoading(true));
     
         getUserCart(userId).then((respose)=>{
     
             dispatch(setCart(respose.data))
     
             dispatch(setCartLoading(false));
         }).catch(()=>{
             dispatch(setCartLoading(false));
     
             dispatch(setCartError("An Error Occured"))
         })
     }
 
 }

 export default getCartInfo;