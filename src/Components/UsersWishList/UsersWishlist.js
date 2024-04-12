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


export default function UserWishList() {

    const defaultTheme = createTheme();

    const [data, setData] = useState([]);

    const history = useHistory();

    const dispatch = useDispatch();

    const categoryList = useSelector(state => state.dataInfo.data);

    const courses = useSelector(state => state.courseInfo.courses);

   
    const {viewLessons ,viewCourse, setViewCourse,setViewLessons } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    const [courseData, setCourseData] = useState([]);

    const [open, setOpen] = useState(false);

    useEffect(() => {

        setCategories(categoryList);


    }, [categoryList])


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


    const handleBuyNow = async (item) => {



        const userId = localStorage.getItem('id');

        const response = await addSingleCourseToCart(userId, item.course.courseId);

        dispatch(getCartInfo());

        const response2 = await removeFromList(item.id);

        dispatch(getWishListInfo());

        setOpen(true);

        setMessage("Course added to cart");

        history.push("/user-cart");


    }

    const handleCleartWishList = async (input) => {

        const selectedWishListIds = input.map((item) => item.id);

        const response2 = await checkoutfromwishlist(selectedWishListIds);

        setMessage('Wishlist cleared..')

        setOpen(true);

        dispatch(getWishListInfo());
    }

    const [selected, setSelected] = useState(false);

    return (


        <div style={{ paddingTop: 100, paddingLeft: 100 }}>,

            <Typography variant="h4" sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                Wishlist
            </Typography>
            {data.length > 0 && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => { handleCleartWishList(data) }} size="small">Clear All</Button>
            </div>}
            <div>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />

                <Stack direction={'row'}>

                    {selectedCards.length > 0 && (
                        <Button onClick={() => { handleAddtoCart() }} variant="contained">Add to Cart</Button>
                    )}

                </Stack>

            </div>

            <FormControlLabel sx={{ color: 'white' }} control={<Checkbox sx={{ color: 'white' }} checked={selectedCards.length === data.length}
                onChange={() => {
                    handleSelectAll();

                }} />} label="All" />
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert

                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Box

                sx={{


                    display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)',

                    flexWrap: 'wrap', // Ensure items wrap to next line
                    flexDirection: 'row',
                    alignItems: 'center',

                }}
            >





                {data.length > 0 ? data.map((item, index) => (
                    <div key={index} style={{ position: 'relative', marginBottom: 4 }}>
                        <Checkbox checked={selectedCards.some((selectedItem) => selectedItem.id === item.id)}
                            onChange={() => {
                                handleCardSelect(item)
                                setSelected(!selected);
                            }} style={{ position: 'absolute', top: 0, left: 0 }} /> {/* Checkbox positioned outside the card */}

                        <Card key={index} sx={{height:300, width: 275, marginBottom: 4 }} elevation={3}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={item.course.coverImage}
                            />
                            <CardContent>
                                <Typography variant="h6">{item.course.title}</Typography>
                                <Typography variant="body2">{item.course.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleBuyNow(item)}>
                                    Buy now
                                </Button>
                            </CardActions>
                        </Card>
                    </div>

                )) :
                    <div style={{alignItems:'center'}}>

                            <Typography align='center' >

                                <IconButton sx={{color:'white'}}><FavoriteBorderIcon /></IconButton>

                                <Typography variant="h8" sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} gutterBottom>

                                    Your wish list is empty
                                </Typography>

                            </Typography>
                        


                    </div>}


            </Box>

            <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
            <RowPost
                data={courseData}
                title="You may also be intrested in"
                id="orginals" />

            <Footer />

        </div>

    );


}