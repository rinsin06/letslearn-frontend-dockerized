import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CourseForm from './CourseForm';
import LessonsForm from './LessonsForm';
import { useEffect } from 'react';
import { Alert, Backdrop, Breadcrumbs, Chip, CircularProgress, Container, Snackbar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Dashboard from '@mui/icons-material/Dashboard';
import CourseOverView from './CourseOverView';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';
import { useHistory } from 'react-router-dom';
const steps = ['Course Basics', 'Add Lessons', 'Course Overview'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  
    const {lessons,setlessons} = useContext(AuthContext);

  

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const[activePage,setactivePage] = useState();


  const history = useHistory();

  

useEffect(()=>{

    if(activeStep == 1)
    {
        setactivePage(<LessonsForm  back={() => handleBack()} next={() => handleNext()}/>)
    }else if(activeStep ==0)
    {
        setactivePage(<CourseForm back={() => handleBack()} next={() => handleNext()}/>)
    }else if(activeStep == 2)
    {
        setactivePage(<CourseOverView  back={() => handleBack()} next={() => handleNext()}/>)
    }

    
},[activeStep])

  return (

    
    <Box sx={{ width: '100%' }}>

<Box sx={{paddingBottom:5}}>
          <Breadcrumbs sx={{ paddingTop: 2 }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">

<Chip icon={<Dashboard />} onClick={() => history.push('/admin')} label="Dashboard" />


<Chip onClick={() => history.push('/view-course')} icon={<LibraryBooksIcon />} label="Courses" />

<Chip icon={<LibraryBooksIcon />} label="Add Course" />

</Breadcrumbs>

</Box>
<Container>

      <Stepper  activeStep={activeStep}>
     
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
        
          
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      
        <React.Fragment>
           {activePage}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            
            
          </Box>
        </React.Fragment>
      
</Container>

    </Box>

    
  );
}
