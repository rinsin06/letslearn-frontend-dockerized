import axios from "axios";
import { setData, setError, setLoading,setCourse,
    setCourseLoading,
    setCourseError } from "./Store";

import { getCategories, getCourses } from "../AdminService";

function getDataInfo(){

   return function (dispatch){

        dispatch(setLoading(true));
    
        getCategories().then((respose)=>{
    
            dispatch(setData(respose.data))
    
            dispatch(setLoading(false));
        }).catch(()=>{
            dispatch(setLoading(false));
    
            dispatch(setError("An Error Occured"))
        })
    }

}




export default getDataInfo;

