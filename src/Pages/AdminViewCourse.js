import React from 'react';

import SideNav from '../Components/Admin/SideNav/SideNav'
import CourseList from '../Components/Admin/CourseList/CourseList';
import CourseUi from '../Components/Admin/CourseView/CourseUi';
import Context from '../Context/Context';



function AdminCourseView() {
  return (
    <div>  
        
        <SideNav/>
        <CourseUi/>
        
    </div>
  );
}

export default AdminCourseView;