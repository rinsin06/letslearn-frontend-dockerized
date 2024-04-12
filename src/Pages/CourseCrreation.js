import React from 'react';

import SideNav from '../Components/Admin/SideNav/SideNav';

import HorizontalLinearStepper from '../Components/Admin/CourseForm/CourseSteps';
import Context from '../Context/Context';
import FirebaseContext from '../Context/firebaseContext';
import Context2 from '../Context/firebaseContext';




function CourseCreation() {
  return (
    <div>  
      <Context>
        <SideNav/>
        
        <HorizontalLinearStepper/>
        </Context>
        
    </div>
  );
}

export default CourseCreation;