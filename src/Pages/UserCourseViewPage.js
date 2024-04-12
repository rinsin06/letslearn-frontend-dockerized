import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import CourseCreation from './CourseCrreation';
import UserCourseView from '../Components/UsersCourseView/UsersCourseView';


function UserCourseViewPage() {
  return (
    <div>  
        <NavBar/>
        
       <UserCourseView/>
    </div>
  );
}

export default UserCourseViewPage;