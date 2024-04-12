import React from 'react';

import Home from '../Components/Home/Home';
import NavBar from '../Components/NavBar/NavBar';
import UserProfile from '../Components/Profile/UserProfile';
import MiniDrawer from '../Components/MuiComponents/MiniDrawer';

function Profile() {
  return (
    <div>  
        <NavBar/>
        
        <UserProfile/>
    </div>
  );
}

export default Profile;