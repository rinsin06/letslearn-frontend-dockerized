import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Chip, ClickAwayListener, Container, CssBaseline, Fab, FormControl, Grid, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Paper, Popover, Select, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import MouseOverPopover from '../CoursePopeover/CoursePopeover';
import { getLessons } from '../../AdminService';

export default function UserCourseList() {

    const defaultTheme = createTheme();

    const [data, setData] = useState([]);

    const history = useHistory();





    const courseList = useSelector(state => state.courseInfo.courses);

    const [categories, setCategories] = useState([]);



    useEffect(() => {

        setData(courseList);

    }, [courseList])








    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
    const buttonRef = useRef(null);

    const buttonRef2 = useRef(null);



    const { viewLessons, viewCourse, setViewCourse, setViewLessons } = useContext(AuthContext);



    const handleViewCourse = async (item) => {

        const lessonsResponse = await getLessons(item.courseId);

        setViewLessons(lessonsResponse.data);


        setViewCourse({
            courseId: item.courseId,
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


    const handleClose = () => {

        setOpen(false);

    }

    const handleopen = () => {

        setOpen(true);
    }

    return (

        <div className='rowPost' >

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
                    <div
                        key={index}
                        onMouseEnter={handleopen}
                        ref={buttonRef}
                    >

                        <Card key={index} sx={{ width: 275, marginBottom: 4 }}>
                            <CardMedia

                                component="img"
                                alt="green iguana"
                                height="140"
                                image={item.coverImage}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2">{item.description}</Typography>
                            </CardContent>


                        </Card>

                        <Popover elevation={3}
                            
                            open={open}

                            onClose={handleClose}
                            anchorEl={buttonRef.current}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <Box>
                                <Typography>Popeover is open</Typography>
                            </Box>


                        </Popover>
                    </div>

                ))}


            </Box>

        </div>


    );


}