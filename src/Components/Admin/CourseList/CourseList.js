import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Chip, ClickAwayListener, Container, CssBaseline, Fab, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Paper, Popover, Select, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { getCategories, getCourses, getLessons } from '../../../AdminService';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Menu } from '@mui/base/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Dashboard from '@mui/icons-material/Dashboard';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';
export default function CourseList() {

    const defaultTheme = createTheme();

    const [data, setData] = useState([]);

    const history = useHistory();

    const categoryList = useSelector(state => state.dataInfo.data);

    const courseList = useSelector(state => state.courseInfo.courses);

    const [categories, setCategories] = useState([]);




    useEffect(() => {

        setCategories(categoryList);


    }, [categoryList])


    useEffect(() => {

        setData(courseList);
       
    }, [courseList])

    // const [categories, setCategories] = useState([]);

    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ];




    const fetchCategories = async () => {

        const response = await getCategories();

        setCategories(response.data);

    }


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
    const buttonRef = useRef(null);

    const buttonRef2 = useRef(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Update selected category
        setOpen2(true); // Open the Popover
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory('')
    };

    const handleClose2 = () => {
        setOpen2(false);
        setSelectedCategory('')
    };

    const createHandleMenuItemClick = (subcategory) => () => {
        // Handle subcategory click logic here (optional)
        console.log(`Clicked on subcategory: ${subcategory}`);
    };

    const id = open ? 'simple-popover' : undefined;

    const icon = open ? <ExpandLessIcon /> : <ExpandMoreIcon />;

    const {viewLessons ,viewCourse, setViewCourse,setViewLessons,setCourse,setLessons } = useContext(AuthContext);

   



    // useEffect(() => {
    //     if (viewCourse !== null) {
    //       history.push('/view-course');
    //     }
    //   }, [viewCourse]);
    
   
    
    const handleViewCourse = async (item)=>{

       const lessonsResponse = await getLessons(item.courseId);

       setViewLessons(lessonsResponse.data);

       setLessons(lessonsResponse.data);


       setCourse({

        courseId:item.courseId,
        title: item.title,
        description: item.description,
        category: item.category.name,
       subcategory: item.subcategory.name,
        price: item.price,
        duration: item.duration,
       imageUrl: item.coverImage,
       authorName: item.authorName,
       creationDate: item.creationDate

       })
   

    setViewCourse({
        courseId:item.courseId,
        title: item.title,
        description: item.description,
        category: item.category.name,
       subcategory: item.subcategory.name,
        price: item.price,
        duration: item.duration,
       imageUrl: item.coverImage,
       authorName: item.authorName,
       creationDate: item.creationDate
      });
 console.log(viewCourse);

 history.push('view-course')

    }

    return (

        <div style={{ paddingLeft: 100 }}>
            <ThemeProvider theme={defaultTheme}>
            <Breadcrumbs sx={{ paddingTop: 2 }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">

<Chip icon={<Dashboard />} onClick={() => history.push('/admin')} label="Dashboard" />


<Chip icon={<LibraryBooksIcon />} label="Courses" />

</Breadcrumbs>
                

                <CssBaseline />

                <div >



                    <Button
                        ref={buttonRef}
                        sx={{ marginTop: 5 }}
                        aria-describedby={id}
                        variant="outlined"
                        onClick={() => setOpen(true)}
                        endIcon={icon}
                    >
                        Categories
                    </Button>

                    <Popover elevation={3}
                        id={id}
                        open={open}

                        onClose={handleClose}
                        anchorEl={buttonRef.current}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >




                        {categories.map((category, index) => (
                            <MenuItem
                                disableRipple
                                disableTouchRipple

                                sx={{ typography: 'body2', py: 1.5 }} key={index} onClick={() => handleCategoryClick(category)}>
                                {category.category.name}<ArrowRightIcon />
                            </MenuItem>


                        ))}


                    </Popover>

                    {selectedCategory && ( // Conditionally render subcategories
                        <Popover elevation={3}
                            id={id}
                            open={open2}
                            onClose={handleClose2}
                            anchorEl={buttonRef.current}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}

                        >

                            {selectedCategory.subcategories.map((subcategory, subIndex) => (
                                <MenuItem key={subIndex} onClick={createHandleMenuItemClick(subcategory.name)}>
                                    {subcategory.name}
                                </MenuItem>
                            ))}

                        </Popover>
                    )}

                </div>

                <Fab onClick={() => history.push('/create-course')} sx={{ position: 'absolute', right: 16, top: 140 }} variant="extended" color="primary">
                    <AddIcon />
                    Add Course
                </Fab>

                <Box

                    sx={{
                        marginTop: 8,

                        display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)',

                        flexWrap: 'wrap', // Ensure items wrap to next line
                        flexDirection: 'row',
                        alignItems: 'center',
                        bgcolor: 'background.paper'
                    }}
                >



                    {data.map((item, index) => (


                        <Card  key={index} sx={{ height:300, width: 275, marginBottom: 4 }} elevation={3}>
                            <CardMedia
                            onClick={() => {
                                handleViewCourse(item);
                                
                               

                                //  console.log(viewCourse);
                               
                            }}
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={item.coverImage}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <div style={{  maxHeight: 100, overflowY: 'auto'}}>
                                <Typography  variant="body2">{item.description}</Typography>
                                </div>
                               
                            </CardContent>
                        </Card>


                    ))}


                </Box>



            </ThemeProvider>

        </div>

    );


}