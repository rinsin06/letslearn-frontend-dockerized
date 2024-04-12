import axios from "axios";
import { setLearnings,setLearningsError,setLearningsLoading } from "./Store";

import {  getLearnings } from "../AdminService";


function getLearningsInfo(){

    return function (dispatch){

        const userId = localStorage.getItem('id')
 
         dispatch(setLearningsLoading(true));
     
         getLearnings(userId).then((respose)=>{
     
             dispatch(setLearnings(respose.data))
     
             dispatch(setLearningsLoading(false));
         }).catch(()=>{
             dispatch(setLearningsLoading(false));
     
             dispatch(setLearningsError("An Error Occured"))
         })
     }
 
 }

 export default getLearningsInfo;