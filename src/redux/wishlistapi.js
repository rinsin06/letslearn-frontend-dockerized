import axios from "axios";
import { setWishList,setWishListLoading,setWishListError } from "./Store";

import {  getWishList } from "../AdminService";


function getWishListInfo(){

    return function (dispatch){

        const userId = localStorage.getItem('id')
 
         dispatch(setWishListLoading(true));
     
         getWishList(userId).then((respose)=>{
     
             dispatch(setWishList(respose.data))
     
             dispatch(setWishListLoading(false));
         }).catch(()=>{
             dispatch(setWishListLoading(false));
     
             dispatch(setWishListError("An Error Occured"))
         })
     }
 
 }

 export default getWishListInfo;