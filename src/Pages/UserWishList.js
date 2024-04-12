import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import CourseCreation from './CourseCrreation';
import UserCourseView from '../Components/UsersCourseView/UsersCourseView';
import UserWishList from '../Components/UsersWishList/UsersWishlist';


function UserWishListPage() {
  return (
    <div>  
        <NavBar/>
        
       <UserWishList/>
    </div>
  );
}

export default UserWishListPage;