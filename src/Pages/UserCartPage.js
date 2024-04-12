import React from 'react';

import NavBar from '../Components/NavBar/NavBar';

import UserCart from '../Components/UserCart/UserCart';
import Footer from '../Components/Footer/Footer';


function UserCartPage() {
  return (
    <div>  
        <NavBar/>
        <UserCart/>
        
        <Footer/>
    </div>
  );
}

export default UserCartPage;