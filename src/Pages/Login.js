import React from 'react';
import SignIn from '../Components/SignIn/SignIn';
import NavBar from '../Components/NavBar/NavBar';
import MiniDrawer from '../Components/MuiComponents/MiniDrawer';


function LoginPage() {
  return (
    <div>  
        <NavBar/>
        
        <SignIn />
    </div>
  );
}

export default LoginPage;