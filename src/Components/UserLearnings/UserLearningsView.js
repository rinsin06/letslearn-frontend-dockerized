import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, List, ListItem, ListItemText, ListSubheader, Paper, Stack, TextField, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material";
import React, { useEffect } from "react";

import Footer from "../Footer/Footer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from "../../Context/Context";
import { useContext } from "react";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { Link, useHistory, useLocation } from "react-router-dom";
import { addSingleCourseToCart, addToWishList, getWishList, removeFromList } from "../../AdminService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import getWishListInfo from "../../redux/wishlistapi";
import getCartInfo from "../../redux/cartapi";
import YouTube from "react-youtube";
import CourseListPreview from "../UsersCourseView/CourseListPreview";
import BasicTabs from "./UserLearningsOverView";


function UserLearnigsView() {

    const [request, setRequest] = useState({

        userId: null,
        courseId: ''
    })
    const defaultTheme = createTheme();

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts or when the location changes
    }, [location]);

    const { viewCourse, viewLessons } = useContext(AuthContext);
   

  
 
    const[alert,setAlert] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false);
        }, 2000);

        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [alert]);

    const opts = {
        height: '480',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const [selectedVideoUrl, setSelectedVideoUrl] = useState(viewLessons.length > 0 ? viewLessons[0].videoUrl.split('/').pop().split('?')[0] : '');

    const history = useHistory();

    useEffect(()=>{
    
        if ( viewLessons.length > 0) {
            setSelectedLesson(viewLessons[0]);
            // setSelectedVideoUrl(viewLessons[0].videoUrl.split('/').pop().split('?')[0]);
        } else {
            history.push('/user-learnings');
        }

    },[viewLessons])
  
    const[selectedLesson,setSelectedLesson] = useState();
    

    const handleAccordionClick =async (dataItem,videoUrl) => {
        console.log("Accordion clicked:", dataItem);
        setSelectedVideoUrl(videoUrl.split('/').pop().split('?')[0]);
        setSelectedLesson(dataItem);

    };

   

    return (
        <ThemeProvider theme={defaultTheme}>
            <div>


                <Grid container direction={'row-reverse'} >
                    <Grid  item xs={3.5}>

                    <List
            sx={{
                width: '100%',
                bgcolor: 'black',
                position: 'sticky',
                overflow: 'auto',
                height: 800,
                '& ul': { padding: 0 },
            }}
        >
            {viewLessons && viewLessons.map((dataItem, index) => (
                <ListItem key={index}>
                    <Accordion sx={{ width: '100%', backgroundColor: 'black', color: 'white' }} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
                            aria-controls={`panel-content-${index}`}
                            id={`panel-header-${index}`}
                        >
                            <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }}>
                                {dataItem.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Button size="small">  <Typography variant="h12"  href="#"  onClick={() => handleAccordionClick(dataItem,dataItem.videoUrl)} sx={{ fontWeight: "bold", fontFamily: "serif" }}>
                                Description: {dataItem.description}
                            </Typography></Button>
                        </AccordionDetails>
                    </Accordion>
                </ListItem>
            ))}
        </List>

                    </Grid>
                    <Grid item xs={8.5}>
                        <Container>

                       
                         <YouTube origin="https://www.youtube.com" videoId={selectedVideoUrl} opts={opts} />
                        
                        </Container>
                        <Container>
                            <BasicTabs data={selectedLesson}  />
                        </Container>

                    </Grid>
                   
                </Grid>
               
            </div>

            <Footer />
        </ThemeProvider >
    );
}

export default UserLearnigsView;