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
import { Alert, AlertTitle, Breadcrumbs, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Snackbar, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';
import { setLoading } from '../../../redux/Store';
import { addCourse, addLessons, deleteCourse } from '../../../AdminService';
import AccordionUsage from './CourseOverViewLessons';
import Dashboard from '@mui/icons-material/Dashboard';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import getCourseInfo from '../../../redux/courseapi';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CourseUi(props) {

    
const{viewCourse,setCourse,viewLessons,setLessons,course,lessonslisting} = useContext(AuthContext)

const history = useHistory();
useEffect(()=>
{
  if(viewCourse.title === '')
  {
    history.push('/view-courses')
  }
 

},[])

    useEffect(()=>{

       
      
    },[viewCourse])


    
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
  },[])


  

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEdit = () => {
    // Navigate to the course creation page with the course and lesson listing details pre-filled
    history.push({
      pathname: '/create-course',
      state: { editcourse: viewCourse, editlessons: viewLessons } // Pass the viewCourse and lessonslisting objects as state to the '/create-course' route
    });

    console.log(viewCourse,viewLessons);
  };

  const[confirm,setConfirm] = useState(false);
  
  const handleConfirm = ()=>{

   setConfirm(true)

  }

  const[status,setStatus] = useState(false);

  const[statusError,setStatusError] = useState(false);

  const[message,setMessage] = useState('');

  const dispatch = useDispatch();

  const handleDelete = async (input)=>{

    const response = await deleteCourse(input);

    console.log(response);

    setConfirm(false);

    if(response.status === 200){

        setMessage('Course deleted..')
      
        setStatus(true);
         dispatch(getCourseInfo())
        history.push('/view-courses')

        
    }else{

        setMessage('Course deletion failed')

      setStatusError(true)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
<Box sx={{paddingBottom:5}}>
          <Breadcrumbs sx={{ paddingTop: 2 }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">

<Chip icon={<Dashboard />} onClick={() => history.push('/admin')} label="Dashboard" />


<Chip onClick={() => history.push('/view-courses')} icon={<LibraryBooksIcon />} label="Courses" />

<Chip icon={<LibraryBooksIcon />} label="View Course" />

</Breadcrumbs>

</Box>

      
      <Container component="main" >

      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          Course Creation failed
        </Alert>
      </Snackbar>
      <Snackbar open={statusError} autoHideDuration={3000} onClose={()=>setStatusError(false)} >
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={status} autoHideDuration={3000} >
        <Alert severity="sucess" onClose={handleClose} sx={{ width: '100%' }}>
         {message}
        </Alert>
      </Snackbar>

        <CssBaseline />
        <Box
         
        >
        
          <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
      <Grid item xs={12}>
   { open &&  <Alert   severity="success">
  <AlertTitle>Success</AlertTitle>
  Success! Your course has been created.
</Alert>}




        <CustomCard>
        <Modal
          open={confirm}

          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: 400, bgcolor: 'background.paper', borderRadius: '8px', p: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">

            </Typography>


            <Alert severity="warning">
              <AlertTitle>Confirmation</AlertTitle>
             Are you sure you want to delete this course?
            </Alert>
            <div  style={{display:'flex',justifyContent:'flex-end',paddingTop:10}}>
            <Stack direction={'row'} spacing={1}>
            <Button onClick={() => {
              setConfirm(false);

            }} variant="contained">Cancel</Button>
       
            <Button onClick={() => {
              handleDelete(viewCourse.courseId)

            }} variant="contained">Delete</Button>
            </Stack>
            </div>
          </Box>
        </Modal>


          <CardContent>
            <Grid container spacing={2}>
           
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Name:</Typography>
                <Typography variant="body1">{viewCourse.title}</Typography> <div>
   
</div>
              </Grid>
              <Grid item xs={6}>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <Stack direction={'row'} spacing={2}>
                <Button onClick={()=>handleEdit()} variant='outlined'>Update</Button>
                <Button onClick={()=>setConfirm(true)} sx={{backgroundColor:'black'}} variant='contained'>Delete</Button>
                </Stack>
                </div>
             
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Description:</Typography>
                <Typography variant="body1">{viewCourse.description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Image:</Typography>
                {viewCourse.imageUrl && <img src={viewCourse.imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Category:</Typography>
                <Typography variant="body1">{viewCourse.category}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Sub-Category:</Typography>
                <Typography variant="body1">{viewCourse.subcategory}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Price:</Typography>
                <Typography variant="body1">{viewCourse.price}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="subtitle1">Duration:</Typography>
                <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} variant="body1">{viewCourse.duration}</Typography>
              </Grid>
              <Grid item xs={12}>
               
                <AccordionUsage/>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

    </Grid>
          </Box>
        </Box>

      </Container>

      
      
    </ThemeProvider>
  );
}