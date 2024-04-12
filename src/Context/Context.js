import { createContext, useState } from "react";


export const AuthContext = createContext(null);

export default function Context ({children})
{
  
    const[lessonslisting,setLessons] = useState([]);

    const[deletedLessons,setDeletedLessons] = useState([]);

    const[viewLessons,setViewLessons] = useState([]);

    const [course, setCourse] = useState({
        courseId:null,
        title: '',
        description: '',
        category: '',
        subcategory: '',
        price: null, 
        duration: '',
        imageUrl: '',
        authorName:'',
        lessons:'',
        creationDate: new Date(), 
      });

      const[viewCourse,setViewCourse] = useState({ 
        courseId:null,
        title: '',
      description: '',
      category: '',
      subcategory: '',
      price: null, 
      duration: '',
      imageUrl: '',
      authorName:'',
      lessons:'',
      creationDate: null });

    return (
        <AuthContext.Provider value={{lessonslisting,setLessons,course,setCourse,viewCourse,setViewCourse,viewLessons,setViewLessons,deletedLessons,setDeletedLessons}}>

            {children}
            
        </AuthContext.Provider>
    )
}