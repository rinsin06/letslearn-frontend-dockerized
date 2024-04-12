import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Alert, AlertTitle, Backdrop, Breadcrumbs, Card, CardContent, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import AccordionUsage from './CourseOverViewLessons';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';
import { setLoading } from '../../../redux/Store';
import { addCourse, addLessons } from '../../../AdminService';
import getCourseInfo from '../../../redux/courseapi';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CourseOverView(props) {

    const history = useHistory();

    const[loadingCircle,setLoadingCircle]  = useState(false);

     const [showMessage, setShowMessage] = useState(false);

        const[courseError,setCourseError] = useState(false)
    const[courseId,setCourseId] = useState(null);
    const{course,lessonslisting,deletedLessons,setDeletedLessons,setCourse} = useContext(AuthContext);

    const dispatch = useDispatch();
  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);
    setLoadingCircle(true);
    

    try {
       
        const courseResponse = await addCourse(course);
        if (courseResponse.status === 201) {
          // Course created successfully
          console.log('Course created successfully');

          setOpen(true);
        console.log(courseResponse.data.courseId);
        setCourseId(courseResponse.data.courseId);
        dispatch(getCourseInfo());
          
        } else {
          // Handle other status codes
          console.error('Failed to create course:', courseResponse.statusText);
          setLoading(false);
            setCourseError(true)
          setLoadingCircle(false);
        }
      
        const lessonsResponse = await addLessons(lessonslisting,courseResponse.data.courseId,deletedLessons);
        if (lessonsResponse.status === 201) {
          // Lessons added successfully
          console.log('Lessons added successfully');
          setLoading(false);
          setLoadingCircle(false);
          setShowMessage(true);
        } else {
          // Handle other status codes
          console.error('Failed to add lessons:', lessonsResponse.statusText);
          setLoading(false);
          setLoadingCircle(false);
          setCourseError(true)
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('An error occurred:', error);
        setLoading(false);
        setLoadingCircle(false);
        setCourseError(true)
      }
      

    
  };

  const CustomCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
  }));
  
  const ReviewTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  }));


  

  useEffect(()=>{

    console.log(course);
    console.log(lessonslisting);
    setCourse({...course,lessons:lessonslisting})
  },[])


  

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [redirectTimer, setRedirectTimer] = useState(3); 

  // Effect to automatically close the alert after 5 seconds
  useEffect(() => {
    let timer;
    if (open) {
      timer = setInterval(() => {
        setRedirectTimer((prevTimer) => prevTimer - 1);
      }, 1000); // Update timer every second
    }
    return () => clearInterval(timer);
  }, [open]);

  // Effect to redirect when timer reaches 0
  useEffect(() => {
    if (redirectTimer === 0) {
      history.push('/view-courses'); // Replace with your desired URL
    }
  }, [redirectTimer, history]);


  return (
    <ThemeProvider theme={defaultTheme}>

      
      <Container component="main" >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingCircle}
        onClick = {()=> setLoadingCircle(false)}
      >
        <CircularProgress color="success" />
      </Backdrop>

      <Snackbar open={courseError} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          Course Creation failed
        </Alert>
      </Snackbar>

        <CssBaseline />
        <Box
         
        >
        
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
      <Grid item xs={12}>
   { open &&  <Alert   severity="success">
  <AlertTitle>Success</AlertTitle>
  Success! Your course has been created. Redirecting in {redirectTimer}...
</Alert>}
        <ReviewTitle variant="h5" gutterBottom>
          Course Overview
        </ReviewTitle>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Name:</Typography>
                <Typography variant="body1">{course.title}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Description:</Typography>
                <Typography variant="body1">{course.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Image:</Typography>
                {course.imageUrl && <img src={course.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Category:</Typography>
                <Typography variant="body1">{course.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Sub-Category:</Typography>
                <Typography variant="body1">{course.subcategory}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Price:</Typography>
                <Typography variant="body1">{course.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Duration:</Typography>
                <Typography variant="body1">{course.duration}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Lessons:
                </Typography>
                <AccordionUsage/>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      <Button
              type="submit"
             
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
    </Grid>
          </Box>
        </Box>

      </Container>

      
      
    </ThemeProvider>
  );
}