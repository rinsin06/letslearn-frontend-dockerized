import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Toolbar from '@mui/material/Toolbar';
import RedeemIcon from '@mui/icons-material/Redeem';
import { useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Badge, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ListIcon from '@mui/icons-material/List';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';




export default function SideNav() {

    const [open, setOpen] = useState(false);



    const history = useHistory();

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#00897b",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,

    }));

    const handleLogout = ()=>{

        Cookies.remove('token');

        localStorage.clear();

        history.push('/admin-signin')
    }


    return (



        <div >


            <Box  sx={{ flexGrow: 1 }}>
                <AppBar elevation={3} style={{ backgroundColor: "#00897b" }} position="sticky">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => { setOpen(true) }}
                        >
                            <MenuIcon />

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        </Typography>

                        <Stack direction="row" spacing={3} >


                            <>
                                <input
                                    className='input'
                                    type="text"
                                    placeholder="Search..."

                                />
                                <button className='button' >Search</button>
                            </>

                            <Tooltip title='Messages'>
                                <div onClick={()=>history.push('/admin-chat')}>

                                <ForumIcon />
                                </div>
                                

                            </Tooltip>
                            <Tooltip title='Notifications'>
                                <Badge color="success" badgeContent={3}>
                                    <NotificationsActiveIcon />
                                </Badge>
                            </Tooltip>



                        </Stack>

                    </Toolbar>
                </AppBar>
            </Box>


            <Drawer

               open = {open}

            >

                <DrawerHeader>

                    <Stack spacing={2} direction='row'>

                        <Tooltip title='Account Info'>

                            <AccountCircleIcon />

                        </Tooltip>

                        <Typography variant="h7"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                            Admin Controller
                        </Typography>

                        <IconButton onClick={()=>setOpen(false)}>
                        <ChevronLeftIcon /> 
                        </IconButton>
                    </Stack>

                </DrawerHeader>
                <Box
                    sx={{ width: 250 }}
                    role="presentation">

                    <List>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => history.push('/admin')}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => history.push('/view-users')}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary='Users' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        <ListItem disablePadding>
                            <ListItemButton  onClick={() => history.push('/view-courses')}>
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary='Courses' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <RedeemIcon />
                                </ListItemIcon>
                                <ListItemText primary='Coupons' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        <ListItem disablePadding>
                            <ListItemButton  onClick={() => history.push('/view-categories')}>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText primary='Categories' />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        <ListItemButton>


                        </ListItemButton>
                    </List>


                </Box>
                <List sx={{ marginTop: 'auto' }}> {/* Set margin-top to auto to push the logout button to the bottom */}


                    <ListItemButton onClick={()=>handleLogout()}>
                        <ListItemIcon>

                            <ExitToAppIcon />

                        </ListItemIcon>

                        <ListItemText primary='Logout' sx={{ color: '#f44336' }} />
                    </ListItemButton>

                </List>

            </Drawer>

        </div>

    );
}