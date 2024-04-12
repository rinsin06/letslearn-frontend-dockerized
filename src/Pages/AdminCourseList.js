import React from 'react';

import SideNav from '../Components/Admin/SideNav/SideNav'
import CourseList from '../Components/Admin/CourseList/CourseList';
import Context from '../Context/Context';



function AdminCourseList() {
  return (
    <div>  
      
        <SideNav/>
        <CourseList/>
       
    </div>
  );
}

export default AdminCourseList;