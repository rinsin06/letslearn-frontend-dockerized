import { Alert, Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Chip, ClickAwayListener, Container, CssBaseline, Divider, Fab, FormControl, FormControlLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Paper, Popover, Select, Snackbar, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
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
import SellIcon from '@mui/icons-material/Sell';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { addSingleCourseToCart, addToCart, addToWishList, checkoutfromcart, checkoutfromwishlist, getCategories, getLessons, getWishList, removeFromList } from '../../AdminService';
import Footer from '../Footer/Footer';
import RowPost from '../RowPost/RowPost';
import getCartInfo from '../../redux/cartapi';
import getWishListInfo from '../../redux/wishlistapi';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UserCourseViewBanner from '../UsersCourseView/UseCourseViewBanner';
import UserLearnigsBanner from './UserLearningsBanner';



export default function UserLearnigs() {

    const defaultTheme = createTheme();

    const [data, setData] = useState([]);

    const history = useHistory();

    const dispatch = useDispatch();

    const categoryList = useSelector(state => state.dataInfo.data);

    const courses = useSelector(state => state.courseInfo.courses);

    const learnings = useSelector(state => state.learningsInfo.learnings)
    
    const[learningsData,setLearningsData] = useState([])
    const [categories, setCategories] = useState([]);

    const [courseData, setCourseData] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {

        setCategories(categoryList);


    }, [categoryList])

    useEffect(()=>{

        setLearningsData(learnings)

    },[learnings])


    const fetchWishList = async (input) => {


        const response = await getWishList(input);

        setData(response.data);

    }

    useEffect(() => {

        setCourseData(courses);

    }, [courses])


    useEffect(() => {

        const user_id = localStorage.getItem('id');

        console.log(user_id);

        fetchWishList(user_id);

    }, [open])

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

    const {viewLessons ,viewCourse, setViewCourse,setViewLessons } = useContext(AuthContext);

    const handleViewCourse = async (item) => {

        const lessonsResponse = await getLessons(item.course.courseId);

        setViewLessons(lessonsResponse.data);


        setViewCourse({
            courseId: item.course.courseId,
            title: item.course.title,
            description: item.course.description,
            category: item.course.category.name,
            subcategory: item.course.subcategory.name,
            price: item.course.price,
            duration: item.course.duration,
            imageUrl: item.course.coverImage,
            authorName: item.course.authorName,
            creationDate: item.course.creationDate
        });
        console.log(viewCourse);

        history.push('/user-learningsView')

    }

    const [selectedCards, setSelectedCards] = useState([]);

    const handleCardSelect = (item) => {
        const isSelected = selectedCards.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
            setSelectedCards(selectedCards.filter((selectedItem) => selectedItem.id !== item.id));
        } else {
            setSelectedCards([...selectedCards, item]);
        }

        console.log("Selected Cards:", selectedCards);
    };

    const handleSelectAll = () => {

        // If all items are already selected, deselect all items
        if (selectedCards.length === data.length) {
            setSelectedCards([]);
        } else {
            // Otherwise, select all items
            setSelectedCards([...data]);

            console.log(selectedCards);
        }

    };

    const [message, setMessage] = useState('');

    const handleAddtoCart = async () => {

        const userId = localStorage.getItem('id');

        const selectedCourseIds = selectedCards.map((item) => item.course.courseId);


        const response = await addToCart(userId, selectedCourseIds);

        dispatch(getCartInfo());

        const selectedWishListIds = selectedCards.map((item) => item.id);

        const response2 = await checkoutfromwishlist(selectedWishListIds);

        dispatch(getWishListInfo());

        setMessage('Courses added to cart..')

        setOpen(true);

    }


    const handleMovetoCart = async (item) => {



        const userId = localStorage.getItem('id');

        const response = await addSingleCourseToCart(userId, item.course.courseId);

        dispatch(getCartInfo());

        const response2 = await removeFromList(item.id);

        dispatch(getWishListInfo());

        setOpen(true);

        setMessage("Course added to cart");

       


    }

    const handleCleartWishList = async (input) => {

        const selectedWishListIds = input.map((item) => item.id);

        const response2 = await checkoutfromwishlist(selectedWishListIds);

        setMessage('Wishlist cleared..')

        setOpen(true);
    }

    const [selected, setSelected] = useState(false);

    return (


        <div >
            <UserLearnigsBanner/>
            
            <div>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />

            </div>

            <div style={{ paddingTop: 50, paddingLeft: 100 }}>
            <Box

                sx={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)',

                    flexWrap: 'wrap', // Ensure items wrap to next line
                    flexDirection: 'row',
                    alignItems: 'center',  }} >

                {learningsData.length > 0 ? learningsData.map((item, index) => (
                    <div key={index} style={{ position: 'relative', marginBottom: 4 }}>
                        <Card key={index} sx={{height:350, width: 275, marginBottom: 4 }} elevation={3}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={item.course.coverImage}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.course.title}</Typography>
                                <Typography sx={{height:70,overflowY:'auto'}} variant="body2">{item.course.description}</Typography>
                            </CardContent>
                            
                            <CardActions>
                            <Button onClick={() =>handleViewCourse(item)}>
                                    Start Course
                                </Button>
                            </CardActions>
                        </Card>
                    </div>

                )) :
                    <div style={{alignItems:'center'}}>

                            <Typography align='center' >

                                <IconButton sx={{color:'white'}}><LibraryBooksIcon /></IconButton>

                                <Typography variant="h8" sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} gutterBottom>

                                    You dont have any learnings
                                </Typography>

                            </Typography>
                    </div>}
            </Box>

            
            <Typography sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} >Recently wishlisted</Typography>
                    <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                    <List>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                                <Alert

                                    severity="success"
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {message}
                                </Alert>
                            </Snackbar>
                        {data && data.map((card, index) => (index >= data.length - 2 &&(
                            <ListItem>
                                <Card sx={{ width: '70%', display: 'flex', flexDirection: 'row', backgroundColor: 'black', color: 'white' }}>
                                    <CardMedia
                                        component="img"
                                        image={card.course.coverImage}
                                        alt='{card.title}'
                                        sx={{ width: 200 }}
                                    />
                                    <CardContent sx={{ width: '56%' }}>

                                        <Typography variant="h6">{card.course.title}</Typography>
                                        <Typography variant="h8">Created by:{card.course.authorName}</Typography>
                                    </CardContent>

                                    <CardActions

                                    >

                                        <Button onClick={()=>{

                                            handleMovetoCart(card)
                                        }} size="small" >Add to Cart</Button>

                                    </CardActions>
                                    <CardContent>
                                        <Typography><SellIcon />{card.course.price}</Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>)))}
                    </List>
          
</div>
            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />


            <RowPost
                data={courseData}
                title="You may also be intrested in"
                id="orginals" />
  
            <Footer />

        </div>

    );


}