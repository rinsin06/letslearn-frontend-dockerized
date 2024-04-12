import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./UserList.css"
import { Alert, AlertTitle, Badge, Box, Breadcrumbs, Button, Chip, CssBaseline, Menu, MenuItem, Modal, Stack, ThemeProvider, Tooltip, Typography, createTheme } from '@mui/material';
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


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const defaultTheme = createTheme();



export default function EnhancedTableTable() {


    const [users, setUsers] = useState([]);

    const [updatedUser, setUpdatedUser] = useState({});

    const [open2, setOpen2] = useState(false)


    useEffect(() => {
        fetchUsers();

    }, [updatedUser])

    const fetchUsers = async () => {

        const response = await getAllUsers();

        console.log(response.data);

        setUsers(response.data);

        setFilteredUsers(response.data);
    }


    const buttonRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [text, setText] = useState('All');



    const handleClose = () => {

        setOpen(false);


    }

    const blockUser = async (input) => {

        const updatedUserWithBlock = { ...input, blocked: true };
        const id = updatedUserWithBlock.id;

        console.log(id);

        await editUser(updatedUserWithBlock, id);

        setUpdatedUser(updatedUserWithBlock);

    }




    const unblockUser = async (input) => {


        const updatedUserWithBlock = { ...input, blocked: false };
        const id = updatedUserWithBlock.id;





        await editUser(updatedUserWithBlock, id);

        setUpdatedUser(updatedUserWithBlock);



    }




    // Filter users based on the blocked status
    const filteredUsersList = users.filter(user => user.blocked === true);

    const filteredUsersList2 = users.filter(user => user.blocked === false);

    const [filteredUsers, setFilteredUsers] = useState([]);


    const filter = (input) => {

        if (input === 'Blocked') {
            setFilteredUsers(filteredUsersList);


        } else if (input === 'Unblocked') {
            setFilteredUsers(filteredUsersList2);
        } else {
            setFilteredUsers(users);

        }

    };


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
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phoneNumber.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    const history = useHistory();

    const icon = open ? <ExpandLessIcon /> : <ExpandMoreIcon />;
    return (
        <div style={{ paddingLeft: 100 }}>
            <ThemeProvider theme={defaultTheme}>

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
                            blockUser(updatedUser)
                            handleClose2()
                        }} variant="contained">Confirm</Button>
                    </Box>
                </Modal>



                <Box sx={{  paddingTop: 2, paddingRight: 5 }}>

                    <Breadcrumbs sx={{ paddingBottom: 10 }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">

                        <Chip icon={<Dashboard />} onClick={() => history.push('/admin')} label="Dashboard" />


                        <Chip icon={<PeopleIcon />} label="Users" />

                    </Breadcrumbs>
                    <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                        Users List
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: "serif" }} gutterBottom>
                        Manage your users.
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
                                variant="outlined"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={() => { setOpen(true) }}
                                ref={buttonRef}
                                endIcon={icon}
                                color="success"
                            >
                                {text}
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


                                    filter('All')
                                }}>All</MenuItem>
                                <MenuItem onClick={() => {


                                    filter('Blocked')
                                }}>Blocked</MenuItem>
                                <MenuItem onClick={() => {


                                    filter('Unblocked')
                                }}>Unblocked</MenuItem>


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
                            <Tooltip title="Adjust">
                                <TuneIcon />
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
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Active Courses</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.phoneNumber}</TableCell>
                                        <TableCell align="right">{row.active_courses}</TableCell>
                                        <TableCell align="right">{row.blocked ? <Button onClick={() => unblockUser(row)} variant="contained" color="success">UnBlock</Button> : <Button onClick={() => { handleModal(row) }} variant="contained" color="error">Block</Button>}</TableCell>
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