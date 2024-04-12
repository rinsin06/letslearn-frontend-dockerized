import React, { useState, useContext, useEffect } from 'react'
import "./NavBar.css"
import { Bell, Search } from 'react-bootstrap-icons'
import { animateScroll as scroll } from 'react-scroll';
import { useHistory } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import { AuthContext, FirebaseContext } from '../../Context/firebaseContext';
import { validateToken } from '../../AuthService';
import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';
import AccountPopover from '../MuiComponents/AccoutPopover';
import { Badge, Button, IconButton, Menu, MenuItem, Popover, Stack, Tooltip } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function NavBar(props) {

  
  
  const [keyForRemount, setKeyForRemount] = useState(0);
  const [isLoggedin, setisLoggedin] = useState();

  const cartItems = useSelector(state => state.cartInfo.cartItems); 

  const[cartItemdata,setCartItems] = useState([]);

  useEffect(()=>{
    setCartItems(cartItems);

  },[cartItems])


  const scrollToDiv = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const [searchVisible, setSearchVisible] = useState(false);

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  const handleValidation = async () => {

    const response = await validateToken();

    const tokenStatus = response.data.token;

    if (tokenStatus === 'valid') {
      // Token is valid, proceed with the application logic
      console.log('Token is not expired');
    } else if (tokenStatus === 'invalid') {
      // Token has expired, handle accordingly (e.g., redirect to login)
      console.log('invalid');
    } else {
      // Invalid token, handle accordingly
      console.log('refreshtoken');
    }

  }

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  const categories = useSelector(state => state.dataInfo.data);
  const [categoriesList, setCategoriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const buttonRef = useRef(null);

  const buttonRef2 = useRef(null);

  useEffect(() => {
    setCategoriesList(categories);
    console.log(categories);
}, [categories]);

  useEffect(() => {

    console.log(categories);

  }, []);


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

  const history = useHistory();

  const id = open ? 'simple-popover' : undefined;

  const icon = open ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  return (
    <div className='navbar'>
      <img onClick={() => history.push("/")} className='logo' src="/logo.png" alt="LetsLearn" />
      {
      }


      <div className='avatar_links'>

        <Button
          ref={buttonRef}
          style={{ color: 'white' ,borderColor:'white'}}
          
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
           

          
          
           {categoriesList.map((category, index) => (
              <MenuItem
              disableRipple
              disableTouchRipple
              
              sx={{ typography: 'body2', py: 1.5 }} key={index} onClick={() => handleCategoryClick(category)}>
                {category.category.name}<ArrowRightIcon  />
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
                <MenuItem key={subIndex} onClick={props.handleCategory(subcategory.name)}>
                  {subcategory.name}
                </MenuItem>
              ))}

          </Popover>
        )}

        <>
          <input
            className='input'
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className='button' onClick={() => { props.handleSearch(searchQuery); scroll.scrollToTop() }}>Search</button>
        </>
        <Tooltip title="Cart">
            <Badge color="success" badgeContent={cartItemdata && cartItemdata.length}>
                <IconButton sx={{color:'white'}} onClick={()=>{history.push('/user-cart')}}>
                    <ShoppingCartIcon />
                </IconButton>
            </Badge>
        </Tooltip>

        <Tooltip title='Notifications'>
          <Badge color="success" badgeContent={3}>
          <IconButton sx={{color:'white'}} onClick={()=>{history.push('/')}}>
            <NotificationsActiveIcon />
            </IconButton>
          </Badge>
        </Tooltip>

        {Cookies.get('token') ? <AccountPopover className='signout' /> : <Tooltip title='Click to Login'> <Avatar onClick={() => {


history.push("/signin");
}} style={{ marginLeft: '' }} src="/broken-image.jpg" /></Tooltip>}


      </div>
    </div>
  )
}

export default NavBar
