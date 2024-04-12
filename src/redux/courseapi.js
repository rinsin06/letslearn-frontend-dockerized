import axios from "axios";
import { setData, setError, setLoading,setCourse,
    setCourseLoading,
    setCourseError } from "./Store";

import { getCategories, getCourses } from "../AdminService";


function getCourseInfo(){

    return function (dispatch){
 
         dispatch(setCourseLoading(true));
     
         getCourses().then((respose)=>{
     
             dispatch(setCourse(respose.data))
     
             dispatch(setCourseLoading(false));
         }).catch(()=>{
             dispatch(setCourseLoading(false));
     
             dispatch(setCourseError("An Error Occured"))
         })
     }
 
 }

 export default getCourseInfo;