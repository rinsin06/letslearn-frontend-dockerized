import { Alert, AlertTitle, Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField, ThemeProvider, Tooltip, Typography, createTheme } from "@mui/material";
import React, { useEffect } from "react";
import Banner from "../Banner/Banner";
import UserCourseViewBanner from "./UseCourseViewBanner";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';
import Footer from "../Footer/Footer";
import CourseListPreview from "./CourseListPreview";
import { AuthContext } from "../../Context/Context";
import { useContext } from "react";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useHistory, useLocation } from "react-router-dom";
import { addSingleCourseToCart, addToWishList, getLessons, getWishList, removeFromList } from "../../AdminService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getWishListInfo from "../../redux/wishlistapi";
import getCartInfo from "../../redux/cartapi";


function UserCourseView() {

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
  
    const[item,setItem] = useState();

    useEffect(() => {
        fetchWishList();
      

    }, [])

    const[message,setMessage] = useState('')

    const history = useHistory();

    const handleBuyNow = async () => {



        const userId = localStorage.getItem('id');

        const response = await addSingleCourseToCart(userId, viewCourse.courseId);

        dispatch(getCartInfo());


        setAdded(true);

        setMessage("Course added to cart");

        history.push("/user-cart");


    }


    const fetchWishList = async () => {

        

        const response = await getWishList(localStorage.getItem('id'));

        const wishlist = response.data;

        setItem(wishlist)

        const existCourse = wishlist.some(item => {
  
            if(item.course.courseId === viewCourse.courseId){

                setItem(item);

                    return true;

            }else{

                return false;
            }
        });

        if (existCourse) {
            // Trigger action if course exists
            setAdded(true);
            // Perform your action here
        } else {
            // Trigger action if course does not exist
            console.log("Course does not exist!");
            // Perform your action here
        }

        console.log(response.data);
    }

    

    const Learnings = useSelector(state=> state.learningsInfo.learnings)
    


    useEffect(() => {
        setRequest({ ...request, userId: localStorage.getItem('id'), courseId: viewCourse.courseId });

    }, [])

    const[learning,setLearning] = useState(false);

    useEffect(()=>{

     const  isSelected = Learnings.some((selectedItem) => selectedItem.course.courseId === viewCourse.courseId);

     if(isSelected){
        setLearning(true);

     }
        

    },[Learnings])

    const [added, setAdded] = useState(false);

    const [alert, setAlert] = useState(false);

const dispatch = useDispatch();

    const handleAddingToWishList = async () => {



        const response = await addToWishList(request);

        dispatch(getWishListInfo());

        setAdded(true);

        setAlert(true);

    }

    const handleRemoveWishList = async()=>{

      console.log(viewCourse);

      const id = item.id

        const response = await removeFromList(id);

        setAdded(false);


    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false);
        }, 2000);

        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [alert]);
    const { setViewCourse,setViewLessons } = useContext(AuthContext);

  

  const handleViewCourse = async ()=>{

    const lessonsResponse = await getLessons(viewCourse.courseId);

    setViewLessons(lessonsResponse.data);


 setViewCourse({
     courseId:viewCourse.courseId,
     title: viewCourse.title,
     description: viewCourse.description,
     category: viewCourse.category.name,
    subcategory: viewCourse.subcategory.name,
     price: viewCourse.price,
     duration: viewCourse.duration,
    imageUrl: viewCourse.coverImage,
    authorName: viewCourse.authorName,
    creationDate: viewCourse.creationDate
   });
console.log(viewCourse);

history.push('/user-learningsView')

 }

    return (
        <ThemeProvider theme={defaultTheme}>
            <div>


                <div >
                    <UserCourseViewBanner />
                </div>

                <Container>

                    <Grid container direction={'row-reverse'} spacing={4}>
                        <Grid item xs={3.5}>



                            <Card sx={{ maxWidth: '300px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', position: 'sticky' }}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={viewCourse.imageUrl}
                                    sx={{ borderBlockEnd: '2px  solid #111' }}
                                />
                                <CardContent sx={{ paddingBottom: '16px !important' }}>
                                    {alert && <Alert severity="success">
                                        <AlertTitle>Added <FavoriteIcon sx={{ color: 'red' }} /></AlertTitle>
                                        {message}
                                    </Alert>}
                                    <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom variant="h5" component="div">
                                        ₹{viewCourse.price} <Typography sx={{ fontWeight: 'bold' }}> <span style={{ fontSize: '10', textDecoration: 'line-through' }}>2,999 </span> Discount 77% off</Typography>
                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold", color: 'red' }} gutterBottom variant="h7" component="div">
                                        <AccessAlarmsIcon /> 2 days left at this price!
                                    </Typography>
                                   { learning === true ?<Typography align="center">
                                   <Button onClick={()=>{handleViewCourse()}}  disableElevation size="large" variant="contained" color="secondary" sx={{ marginBottom: '8px' }}>
                                            Start Course
                                        </Button>
                                   </Typography>:<Typography align="center">
                                        <Button onClick={()=>{handleBuyNow()}}  disableElevation size="large" variant="contained" color="secondary" sx={{ marginBottom: '8px' }}>
                                            Buy this course
                                        </Button>
                                        
                                        {added ? <Tooltip title='Remove from wishlist'><IconButton  onClick={()=>handleRemoveWishList()} sx={{ marginBottom: '8px', color: 'red' }}> <FavoriteIcon /></IconButton></Tooltip> :
                                            <Tooltip title='Add to wishlist'><IconButton onClick={() => handleAddingToWishList()} sx={{ marginBottom: '8px', color: 'red' }}>

                                                <FavoriteBorderIcon />

                                            </IconButton></Tooltip>}

                                            
                                    </Typography>}

                                    <Typography align="center" variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                                        30-Day Money-Back Guarantee

                                    </Typography>
                                    <Typography align="center" variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>

                                        Full Lifetime Access
                                    </Typography>
                                    <Typography align="center">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <TextField size="small" sx={{ width: '50%', marginRight: '8px' }} />
                                            <Button size="small" variant="contained" sx={{ height: 'auto', backgroundColor: '#000', color: '#fff' }}>Apply Coupon</Button>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item sm={8.5}>


                            <Paper square elevation={0} sx={{ padding: '16px', backgroundColor: '#111', color: '#fff' }} />
                            <Typography sx={{ color: '#fff' }} variant="h6" gutterBottom>
                                What you'll learn
                            </Typography>
                            <div style={{ border: '1px solid #fff', borderRadius: '4px', display: 'flex', flexDirection: 'column', maxHeight: '300px', overflowY: 'auto' }}>
                                <List sx={{}}>
                                    {viewLessons.map((item, index) => {
                                        return (
                                            <ListItem key={index}>
                                                <CheckIcon sx={{ color: '#fff' }} />
                                                <ListItemText sx={{ color: '#fff' }} primary={item.title} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>

                            <Paper />

                        </Grid>
                    </Grid>
                    <div style={{ paddingTop: '10px' }}>


                        <CourseListPreview />

                    </div>
                </Container>
            </div>

            <Footer />
        </ThemeProvider >
    );
}

export default UserCourseView;