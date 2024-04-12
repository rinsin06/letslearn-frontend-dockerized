import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./UserList.css"
import { Alert, AlertTitle, Badge, Box, Breadcrumbs, Button, Chip, CssBaseline, Menu, MenuItem, Modal, Stack, TextField, ThemeProvider, Tooltip, Typography, createTheme } from '@mui/material';
import { useState } from 'react';
import { useRef } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useEffect } from 'react';
import { editUser, getAllUsers } from '../../../AuthService';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import TuneIcon from '@mui/icons-material/Tune';
import { Link, useHistory } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Dashboard from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { DeleteCoupon, addCategories, addsubCategories, getCategories, getCoupons } from '../../../AdminService';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector, useDispatch } from 'react-redux'
import getDataInfo from '../../../redux/api';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';

export default function CouponList() {

    const defaultTheme = createTheme();

   const[coupons,setCoupons] = useState([]);

   useEffect(()=>{

    const response = getCoupons();

    setCoupons(response.data);
   },[])
    const [categories, setCategories] = useState([]);

    const [updatedUser, setUpdatedUser] = useState({});

    const [open2, setOpen2] = useState(false)

    const categoryList = useSelector(state => state.dataInfo.data);

    

    const dispatch = useDispatch();

    const [categoryName, setcategoryName] = useState('');

    const [updation, setUpdation] = useState(false);

    const [refreshCount, setRefreshCount] = useState(0);



    // useEffect(() => {

    //     dispatch(getDataInfo());

    // },[refreshCount])


    const [filteredCategories, setFilteredCategories] = useState([]);

    const [addedcategorie, setaddedcategorie] = useState();

    useEffect(() => {
        setFilteredCategories(categoryList);
        console.log(categoryList);

    }, [categoryList]);



    const fetchCategories = async () => {


        setFilteredCategories(categoryList);

        console.log(filteredCategories);

    }


    const buttonRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [text, setText] = useState('All');



    const handleClose = () => {

        setOpen(false);


    }




    const [searchQuery, setSearchQuery] = useState('');

    const handleClose2 = () => {
        setOpen2(false);
    }

    const handleModal = (input) => {

        setUpdatedUser(input);

        setOpen2(true);

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    const history = useHistory();

    const [openModal1, setOpenModel1] = useState(false);

    const [openModal2, setOpenModel2] = useState(false);



    const [subcategoryName, setsubcategoryName] = useState('');

    const handleModelClose = () => {
        setOpenModel1(false);
        setOpenModel2(false);
    }



    const handleRefresh = async () => {



        await addCategories(categoryName)

        dispatch(getDataInfo());



    };


    const handlerefresh2 = async () => {

        await addsubCategories(categoryName, subcategoryName);

        dispatch(getDataInfo());


    }

    const[coupon,setCoupon]= useState({

        code:'',
        discountPercentage:null,
        startDate:null,
        endDate:null
    })
   

    const icon = open ? <ExpandLessIcon /> : <ExpandMoreIcon />;
    return (
        <div style={{ paddingLeft: 100 }}>
            <ThemeProvider theme={defaultTheme}>

                <Modal
                    open={openModal2}
                    onClose={handleModelClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Sub-Category
                        </Typography>
                        <TextField size="small" id="outlined-basic" label="Category Name" variant="outlined"
                            value={subcategoryName}
                            onChange={(e) => {
                                setsubcategoryName(
                                    e.target.value,
                                )
                            }} />
                        <Button
                            id='modal-modal-footer'
                            variant='contained'
                            color="success"
                            onClick={() => {


                                handlerefresh2();

                                handleModelClose()
                            }}>
                            Add
                        </Button>
                    </Box>
                </Modal>


                <Modal
                    open={openModal1}
                    onClose={handleModelClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Coupons
                        </Typography>
                        <TextField size="small" id="outlined-basic" label="Category Name" variant="outlined"
                            required
                            
                            onChange={(e) => {
                                setCoupon({
                                   code:e.target.value,
                            })
                            }} />

<TextField size="small" id="outlined-basic" label="Category Name" variant="outlined"
                            required
                            value={categoryName}
                            type='number'
                            onChange={(e) => {
                                setCoupon(
                                  {discountPercentage:  e.target.value,}
                                )
                            }} />

                             <TextField size="small" id="outlined-basic" label="Category Name" variant="outlined"
                            required
                            value={categoryName}
                            onChange={(e) => {
                                setcategoryName(
                                    e.target.value,
                                )
                            }} />
                        <Button
                            id='modal-modal-footer'
                            variant='contained'
                            color="success"
                            onClick={() => {

                                handleRefresh();

                                handleModelClose()

                            }}>
                            Add
                        </Button>
                    </Box>
                </Modal>

                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">

                        </Typography>
                        <Alert severity="error">
                            <AlertTitle>Confirmation</AlertTitle>
                            Are you sure you want to block this user?
                        </Alert>
                        <Button onClick={() => {

                            handleClose2()
                        }} variant="contained">Confirm</Button>
                    </Box>
                </Modal>



                <Box sx={{ paddingTop: 2, paddingRight: 5 }}>

                    <Breadcrumbs sx={{ paddingBottom: 10 }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">

                        <Chip icon={<Dashboard />} onClick={() => history.push('/admin')} label="Dashboard" />


                        <Chip icon={<ListIcon />} label="Categories" />

                    </Breadcrumbs>
                    <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                       Coupon List
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                        Manage your Coupons.
                    </Typography>

                    <Stack direction="row" spacing={2} >


                        <>
                            <input
                                className='input2'
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <Button
                                variant="contained"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={() => {
                                    setOpenModel1(true);

                                }}
                                ref={buttonRef}
                                endIcon={<AddIcon />}
                                color="success"
                            >
                                Add Coupon
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={buttonRef.current}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            >
                                <MenuItem onClick={() => {
                                     setCoupon({
                                        code:row.code,
                                        discountPercentage:row.discountPercentage,
                                        startDate:row.startDate,
                                        endDate:row.endDate
                                     })
                                    setOpenModel1(true);

                                }}>Add Coupon</MenuItem>
                                <MenuItem onClick={() => {



                                }}>Add Sub Category


                                </MenuItem>



                            </Menu>
                        </>
                        <Stack
                            direction="row"
                            spacing={2}

                            sx={{
                                position: 'absolute',

                                right: 55, // Adjust as needed
                                marginRight: 15, // Adjust as needed for additional spacing
                            }}>

                            <Tooltip title="Settings">
                                <SettingsApplicationsIcon />
                            </Tooltip>
                            <Tooltip onClick={() => {  }} title="Refresh">

                                <RefreshIcon
                                />
                            </Tooltip>

                        </Stack>


                    </Stack>



                    <TableContainer sx={{

                    }} component={Paper}>
                        <CssBaseline />

                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Sub Categories</TableCell>
                                    <TableCell align="right"></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coupons&& coupons.map((row, index) => (

                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.code}
                                        </TableCell>
                                        <TableCell align="right">
                                            {/* Display subcategories in a more user-friendly format (optional) */}
                                            {row.discountPercentage}
                                                    {/* private String code;
    private double discountPercentage;
    private LocalDate startDate;
    private LocalDate endDate; */}
                                            
                                        
                                        </TableCell>
                                        <TableCell align="right"><Button id='modal-modal-footer'
                                            variant='contained'
                                            color="success"
                                            onClick={() => {
                                                setcategoryName(row.category.name)
                                                setOpenModel2(true)
                                            }}>Edit</Button></TableCell>
                                            <TableCell align="right"><Button id='modal-modal-footer'
                                            variant='contained'
                                            color="error"
                                            onClick={() => {
                                                DeleteCoupon(row.id)
                                            }}>Delete</Button></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </Box>
            </ThemeProvider>
        </div>

    );
}