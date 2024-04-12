import React from 'react';
import NavBar from '../Components/NavBar/NavBar';
import UserLearnigs from '../Components/UserLearnings/UserLEarnings';
import UserLearnigsView from '../Components/UserLearnings/UserLearningsView';

function UserLearningsViewPage() {
  return (
    <div>  
        <NavBar/>
        
       <UserLearnigsView/>
    </div>
  );
}

export default UserLearningsViewPage;