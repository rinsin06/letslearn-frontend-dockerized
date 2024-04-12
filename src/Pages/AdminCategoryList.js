import React from 'react';

import SideNav from '../Components/Admin/SideNav/SideNav'
import CourseList from '../Components/Admin/CourseList/CourseList';
import CategoryList from '../Components/Admin/CategoryList/CategoryList';



function AdminCategoryList() {
  return (
    <div>  
        <SideNav/>
        <CategoryList/>
    </div>
  );
}

export default AdminCategoryList;