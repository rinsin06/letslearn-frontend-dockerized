import Dashboard from "@mui/icons-material/Dashboard";
import { Alert, AlertTitle, Backdrop, Box, Breadcrumbs, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Container, Divider, Grid, IconButton, List, ListItem, Snackbar, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useDispatch, useSelector } from "react-redux";
import RowPost from "../RowPost/RowPost";
import { useState } from "react";
import { useEffect } from "react";
import { addSingleCourseToCart, addToCart, addToLearnings, addToWishList, checkoutfromcart, createOrder, getLearnings, getUserCart, removeFromCart, removeFromList } from "../../AdminService";
import SellIcon from '@mui/icons-material/Sell';
import getCartInfo from "../../redux/cartapi";
import getWishListInfo from "../../redux/wishlistapi";
import getLearningsInfo from "../../redux/learningsapi";
import useRazorpay from "react-razorpay";

export default function UserCart() {


    const courses = useSelector(state => state.courseInfo.courses);
    const [data, setData] = useState();

    const [message, setMessage] = useState('');

    const wishList = useSelector(state => state.wishListInfo.wishList);

    const [wishListData, setWishListData] = useState([]);

    useEffect(() => {

        setWishListData(wishList);
    }, [wishList])

    const [cartItems, setCartItems] = useState([]);

    const dispatch = useDispatch();

    const fetchCart = async (input) => {



        const response = await getUserCart(input);

        console.log(response.data);

        setCartItems(response.data);


        console.log(cartItems);
    }



    useEffect(() => {

        setData(courses);

    }, [courses])


    const [open, setopen] = useState(false);

    useEffect(() => {

        const userId = localStorage.getItem('id')
        fetchCart(userId);


    }, [open])



    const handleRemoveFromCart = async (input) => {

        const response = await removeFromCart(input);

        dispatch(getCartInfo());

        setMessage('Course Removed')

        setopen(true);


    }

    const [selectedCards, setSelectedCards] = useState([]);



    const handleMovetoCart = async (item) => {


        const userId = localStorage.getItem('id');


        const response = await addSingleCourseToCart(userId, item.course.courseId);

        dispatch(getCartInfo());

        const response2 = await removeFromList(item.id);



        dispatch(getWishListInfo());

        setopen(true);

        setMessage("Added to cart")


    }








    const handleMoveToWishList = async (input) => {

        const request = {

            userId: localStorage.getItem('id'),
            courseId: input.course.courseId
        }


        const response = await addToWishList(request)

        handleRemoveFromCart(input.id);

        dispatch(getCartInfo());

        dispatch(getWishListInfo());
    }


    const handleCleartCart = async (input) => {

        const response = await checkoutfromcart(input)

        dispatch(getCartInfo());

        setMessage("Cart cleared")

        setopen(true);

    }


    const handleAddToLearnings = async () => {

        const userId = localStorage.getItem('id');


        const selectedCourseIds = cartItems.map((item) => item.course.courseId);




        const response = await addToLearnings(userId, selectedCourseIds);

        dispatch(getLearningsInfo());

        const response2 = await checkoutfromcart(cartItems);

        dispatch(getCartInfo());

        setMessage("Courses Added to Learnings");

        setopen(true);


    }

    const [amount, setAmount] = useState(cartItems.reduce((total, item) => total + item.course.price, 0));
    useEffect(()=>{

        setAmount(cartItems.reduce((total, item) => total + item.course.price, 0))
    },[])


    const [Razorpay] = useRazorpay();
   

    const[loading,setLoading] = useState(false);
    
    const[open2,setOpen2] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        const order = await createOrder(cartItems.reduce((total, item) => total + item.course.price, 0)*100);
        // const addToWallet = async (input) => {

        //     await addWallet(input);

        //     setPayment(!payment)
        //     setLoading(false);
        // }

        const options = {
            key: "rzp_test_uGCgR6VNPWQ0kB",
            amount: cartItems.reduce((total, item) => total + item.course.price, 0) * 100,
            currency: "INR",
            name: localStorage.getItem('name'),
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order,
            handler: function (response) {
                if (response.error) {
                    // Payment failed or canceled
                    setMessage(response.error.reason || "Payment failed or canceled");
                    rzp1.close();
                    setOpen2(true);
                    setLoading(false);
                } else {
                    // Payment successful
                    
                    setLoading(true);
                    handleAddToLearnings();
                    setLoading(false);
                }
            },
            prefill: {
                name: localStorage.getItem('name'),
                email:localStorage.getItem('email'),
                contact:localStorage.getItem('phone'),
            },
            notes: {
                address: "ABC, Delhi",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            setMessage(response.error.reason)
            setOpen2(true)
            rzp1.close();
            setLoading(false);
        });

        rzp1.open();
    };



    return (

        <Container style={{ maxWidth: '1470px', width: '100%', }}>
{<Alert variant="filled" severity="error">
  {message}
</Alert>}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => setLoading(false)}
            >


                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container direction={'row'} spacing={4}>
                <Grid item xs={9} >
                    <Box sx={{ paddingTop: 15, paddingRight: 5 }}>


                        <Typography variant="h3" sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                            Shoping Cart
                        </Typography>
                        <Stack direction={'row'} spacing={100}>
                            <Typography sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} >{cartItems.length} Courses in Cart</Typography>
                            {cartItems.length > 0 &&
                                <Button onClick={() => { handleCleartCart(cartItems) }} size="small">Clear All</Button>
                            }
                        </Stack>
                        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                        <List>
                            <Snackbar open={open} autoHideDuration={6000} onClose={() => setopen(false)}>
                                <Alert

                                    severity="success"
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {message}
                                </Alert>
                            </Snackbar>
                            {cartItems && cartItems.map((card, index) => (
                                <ListItem key={index}>
                                    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'black', color: 'white' }}>
                                        <CardMedia
                                            component="img"
                                            image={card.course.coverImage}
                                            alt={card.course.title}
                                            sx={{ width: 200 }}
                                        />
                                        <CardContent sx={{ width: '56%' }}>
                                            <Stack>
                                                <Typography variant="h6">{card.course.title}</Typography>
                                                <Typography variant="h8">Created by:{card.course.authorName}</Typography>
                                            </Stack>

                                        </CardContent>
                                        <CardActions>
                                            <Stack spacing={2}>
                                                <Button onClick={() => { handleRemoveFromCart(card.id) }} size="small">Remove</Button>
                                                <Button onClick={() => { handleMoveToWishList(card) }} size="small">Move to Wishlist</Button>
                                            </Stack>
                                        </CardActions>

                                        <CardContent>
                                            <Typography><SellIcon />{card.course.price}</Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>


                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{ paddingTop: '215px' }}>
                        <Card sx={{ width: '300px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', position: 'sticky' }}>

                            <CardContent sx={{ paddingBottom: '16px !important' }}>
                                <Stack spacing={2}>
                                    <Typography>Total:</Typography>
                                    <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom variant="h5" component="div">
                                        ₹ {cartItems.reduce((total, item) => total + item.course.price, 0)}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}> <span style={{ fontSize: '10', textDecoration: 'line-through' }}>2,999 </span> </Typography>
                                    <Typography>Discount 77% off</Typography>

                                    <Typography >
                                        <Button onClick={() => { handlePayment(); }} disableElevation size="large" variant="contained" color="secondary" sx={{ width: '100%', marginBottom: '8px' }}>
                                            Checkout
                                        </Button>
                                        <Divider sx={{ backgroundColor: 'black' }} />
                                    </Typography>

                                    <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: '8px' }}>
                                        Promotions

                                    </Typography>
                                    <Alert onClose={() => { }}>
                                        ST15MT31224 is applied
                                        LetsLearn coupon
                                    </Alert>
                                    <Typography align="center">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <TextField size="small" sx={{ width: '50%', marginRight: '8px' }} />
                                            <Button size="small" variant="contained" sx={{ height: 'auto', backgroundColor: '#000', color: '#fff' }}>Apply Coupon</Button>
                                        </div>
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
            <Grid container direction={'row'} spacing={4}>
                <Grid item xs={9} >


                    <Typography sx={{ color: 'white', fontWeight: "bold", fontFamily: "serif" }} >Recently wishlisted</Typography>
                    <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                    <List>
                        {wishListData && wishListData.map((card, index) => (index >= wishListData.length - 2 && (
                            <ListItem>
                                <Card sx={{ width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'black', color: 'white' }}>
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

                                        <Button onClick={() => {

                                            handleMovetoCart(card)
                                        }} size="small" >Add to Cart</Button>

                                    </CardActions>
                                    <CardContent>
                                        <Typography><SellIcon />{card.course.price}</Typography>
                                    </CardContent>
                                </Card>
                            </ListItem>)))}
                    </List>



                </Grid>

            </Grid>
            <RowPost
                data={data}
                title="You May Also Like "
                id="orginals" />

        </Container>


    )
}




