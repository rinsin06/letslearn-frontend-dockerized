import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Alert, Breadcrumbs, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';

import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import NestedList from './LessonsList';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';

const defaultTheme = createTheme();

export default function LessonsForm(props) {

    const{course,setCourse} = useContext(AuthContext);


    useEffect(()=>{

        console.log(course);


    },[])

    const location = useLocation();
  const { editcourse, editlessons } = location.state|| {}; 

  const { setLessons,lessonslisting ,deletedLessons,setDeletedLessons} = useContext(AuthContext);

  useEffect(() => {
    if (editlessons) {

setLessons(editlessons)


console.log(editlessons);

  }},[editlessons])

    const [lessons, setLesson] = useState({ id: null,coursename: course.title, title: '', description: '', videoUrl: '', content: '', lessonOrder: null });

   

    const[lessonsList,setLessonsList] = useState([]);

    const[error,setError]=useState(false);

    const handleNext=()=>{

        if(lessonslisting.length === 0)
        {
            setError(true);
        }else{

            props.next();

            setError(false);
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        setLessons([...lessonslisting, lessons]);

    // Clear the form fields after adding the lesson
    setLesson({
        id:null,
        coursename:'',
        title: '',
        description: '',
        videoUrl: '',
        content: '',
        lessonOrder: ''
    });
   
    };

    const history = useHistory();

    
    const handleEditLesson = (lesson,index) => {
        // Set the lesson details into the state to populate the form fields
        setLesson({
          id:lesson.id,
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.videoUrl,
          content: lesson.content,
          lessonOrder: lesson.lessonOrder
        });
        handleDeleteLesson(index)
      };
    
      const handleDeleteLesson = (index) => {
        // Remove the lesson from the lessonsList array
        const updatedList = [...lessonslisting];
        const deletedLesson = updatedList.splice(index, 1)[0];
        setDeletedLessons([...deletedLessons, deletedLesson]);
        setLessonsList(updatedList);
        setLessons(updatedList);
      };
  
   


    return (
        <ThemeProvider theme={defaultTheme}>

            <Container component="main" maxWidth="md">

                <Grid container spacing={6} direction={'row'}>

                    <Grid item xs={6} sm={6} >

                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <CreateNewFolderIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add Lessons
                            </Typography>
                            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                    {error &&<Alert severity="error">Please add atleast one lesson before proceeeding</Alert>}
                                        <TextField
                                            autoComplete="given-name"
                                            name="title"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="Title"
                                            autoFocus
                                            value={lessons.title}
                                            onChange={(e) => {
                                                setLesson({
                                                    ...lessons,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="Overview"
                                            label="Description"
                                            name="description"
                                            autoComplete="family-name"
                                            value={lessons.description}
                                            onChange={(e) => {
                                                setLesson({
                                                    ...lessons,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            }
                                            rows={5}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type='url'
                                            id="Overview"
                                            label="Video Url"
                                            name="videoUrl"
                                            autoComplete="family-name"
                                            rows={5}
                                            value={lessons.videoUrl}
                                            onChange={(e) => {
                                                setLesson({
                                                    ...lessons,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            }
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="Overview"
                                            label="Content"
                                            name="content"
                                            autoComplete="family-name"
                                            rows={5}
                                            value={lessons.content}
                                            onChange={(e) => {
                                                setLesson({
                                                    ...lessons,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="Overview"
                                            label="Lesson Number"
                                            name="lessonOrder"
                                            autoComplete="family-name"
                                            rows={5}
                                            value={lessons.lessonOrder}
                                            onChange={(e) => {
                                                setLesson({
                                                    ...lessons,
                                                    [e.target.name]: e.target.value,
                                                })
                                            }
                                            }
                                        />
                                    </Grid>


                                </Grid>
                                <Button

                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Lessons
                                </Button>
                                <Button
                                   onClick={()=>handleNext()} 
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Next
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid item xs={6} sm={6} >

                        <NestedList  list={lessonsList} onEditLesson={handleEditLesson} onDeleteLesson={handleDeleteLesson} />

                    </Grid>
                </Grid>

            </Container>
        </ThemeProvider>
    );
}