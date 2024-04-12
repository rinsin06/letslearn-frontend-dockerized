import React, { useEffect, useState, CSSProperties } from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import './UserProfile.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getProfile, changePassword, getWallet, createOrder, addWallet } from '../../UserService';
import { useHistory } from 'react-router-dom';
import useRazorpay from "react-razorpay"
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { editUser } from '../../AuthService';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chip from '@mui/material/Chip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import ConfirmationModal from '../MuiComponents/ConfirmationModal';
import Footer from '../Footer/Footer';



export default function UserProfile() {



  const [user, setUser] = useState({

  })




  const [payment, setPayment] = useState(false);

  const [balance, setBalance] = useState('');

  const [edited, setEdited] = useState(false);

  const [transaction, setTransaction] = useState([])


  const history = useHistory();

  const [walletInfo, setWalletInfo] = useState({
    id: "",
    balance: ""
  });
  const [input, setInput] = useState({})

  const [error, setError] = useState(false);



  useEffect(() => {


    const fetchUserProfile = async () => {
      try {

        setLoading(true);

        const mail = localStorage.getItem('email')

        const response = await getProfile(mail); // Assuming getProfile is an asynchronous function
        // const { body: user1 } = response;
        setUser(response.data.user.body);
        setBalance(response.data.Balance);
        setTransaction(response.data.transactions);
        setFilteredTransactions(transaction);
        setInput({

          name: response.data.user.body.name,
          email: response.data.user.body.email,
          password: "",
          phoneNumber: response.data.user.body.phone,
          roles: "ROLE_USER"

        })
        console.log(response.data);
        localStorage.setItem("id", user.id);

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };



    fetchUserProfile();

  }, [payment, edited])



  const [Razorpay] = useRazorpay();
  const [amount, setAmount] = useState(0)

  const [filteredTransactions, setFilteredTransactions] = useState([]);


  const handlePayment = async () => {
    setLoading(true);
    const order = await createOrder(amount);
    const addToWallet = async (input) => {

      await addWallet(input);

      setPayment(!payment)
      setLoading(false);
    }

    const options = {
      key: "rzp_test_uGCgR6VNPWQ0kB",
      amount: amount * 100,
      currency: "INR",
      name: user.name,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order,
      handler: function (response) {
        alert("Amount added to the wallet");

        setLoading(true);

        const updatedWalletInfo = {
          id: user.id,
          balance: amount
        };

        setWalletInfo(updatedWalletInfo)

        addToWallet(updatedWalletInfo)

        setLoading(false)
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
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
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  const tableStyle = {
    paddingTop: '5px',
    border: '2px solid black', // Add a white border
    borderRadius: '8px', // Optional: Add rounded corners
    overflow: 'hidden', // Optional: Hide overflow content
    background: 'black'
  };
  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [open3, setOpen3] = useState(false);

  const [show, setShow] = useState(false);

  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);


  const handleShow2 = () => setShow2(true);

  const handleClose2 = () => setShow2(false);

  const [filter, setFilter] = useState(false);


  const handleShow = () => setShow(true);

  const minValue = 100;

  const handleSubmit = async (input, id) => {

    if (!indianPhoneRegex.test(input.phoneNumber)) {
      setValidationError(true);
    } else {


      await editUser(input, id);

      setValidationError(false);

      setEdited(!edited);

      handleClose();

    }



  }

  useEffect(() => {

    if (transaction.length > 0 && filter === false) {

      setFilteredTransactions(transaction);
    }


  })

  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());


  // Date range filter
  const filterByDateRange = (transactions) => {
    return transactions.filter((transaction) => {

      startDate.setHours(0, 0, 0, 0); // Set time to midnight
      endDate.setHours(0, 0, 0, 0); // Set time to midnight

      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      const isWithinDateRange =

        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate);

      return isWithinDateRange;
    });
  };

  // Deposit/withdrawal filter
  const filterByTransactionType = (transactions) => {

    return transactions.filter((transaction) => {
      return transaction.deposit === (true);
    });
  };

  // Apply filtering based on user triggers
  const handleFilter = () => {
    // let filteredTransactions = [...transaction];

    // Apply date range filter if start and end dates are set
    if (startDate && endDate) {
      setFilteredTransactions(filterByDateRange(transaction))
    }

    // // Apply transaction type filter if selected
    // if (transactionType) {
    //   filteredTransactions = filterByTransactionType(filteredTransactions);
    // }

    // Update the UI or state with the final filtered transactions
    // ...
  };

  const handleDepositFilter = () => {

    setFilteredTransactions(filterByTransactionType(transaction))

  }
  let [loading, setLoading] = useState(false);

  const indianPhoneRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{4}\)?\s?\d{3}\s?\d{3}$/);

  const [validationError, setValidationError] = useState(false)

  const [passwordValidationError, setPasswordValidationError] = useState(false)

  const [passwordInput, setPasswordInput] = useState({
    userId: localStorage.getItem('id'),
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = async (input) => {

    if (input.confirmPassword === input.newPassword) {


      handleClose4();

      const response = await changePassword(input);

      console.log(response);


      if (response.data.message === 'Password updated successfully') {
        setOpen3(true);



        console.log(response.data.message);
      } else if (response.data.message === 'Invalid Credential') {
        console.log(response.data.message);




      } else {

        console.log(response.data.message);
      }

    } else {


      setPasswordValidationError(true);

    }


  }

  const [show4, setShow4] = useState(false);

  const [amountError, setAmountError] = useState(false);

  const handleClose4 = () => setShow4(false);

  const handleShow4 = () => setShow4(true);
  const [input1, setInput1] = useState()



  return (
    <section className="vh-100" style={{ backgroundColor: '#111' }}>

      <MDBContainer className="py-5 h-100">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => setLoading(false)}
        >

          <ConfirmationModal
            open={open3}

            btndata='Click here to Login'

            message='You have Successfully Changed your password.Please Login Again to continue'

            route='/signin' />

          <CircularProgress color="success" />
        </Backdrop>

        <MDBRow className="  h-70">

          <MDBCol md="6" style={{ paddingTop: '70px' }}>
            {/* <MDBCol md="6" className="mb-4 mb-lg-0" style={{ paddingTop: '70px' }}> className changed by Riya */}
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  {<MDBTypography tag="h5">{user.name}</MDBTypography>}
                  <MDBCardText>Web Designer</MDBCardText>
                  <Tooltip title='Edit Profile'>  <MDBIcon onClick={handleShow} far icon="edit mb-5" /></Tooltip>


                  <Modal show={show4} onHide={handleClose4} >
                    <Modal.Header style={{ backgroundColor: 'black', color: 'white' }} closeButton>
                      <Modal.Title style={{ color: 'white' }}>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "black", color: 'white' }}>
                      <Form >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ color: 'white' }} >Old Password</Form.Label>
                          <Form.Control
                            type="password"
                            required='true'
                            autoFocus
                            name='oldPassword'
                            value={passwordInput.oldPassword}
                            onChange={(e) =>
                              setPasswordInput({
                                ...passwordInput,
                                oldPassword: e.target.value,
                              })}
                          />
                          <Form.Label style={{ color: 'white' }}>New Password</Form.Label>
                          <Form.Control
                            type="password"
                            autoFocus
                            required='true'
                            name='newPassword'
                            value={passwordInput.newPassword}
                            onChange={(e) =>
                              setPasswordInput({
                                ...passwordInput,
                                newPassword: e.target.value,
                              })}
                          />

                          <Form.Label style={{ color: 'white' }}>Re-Enter New Password</Form.Label>
                          {passwordValidationError && <Alert severity="error">Doesnt Match with the New Password</Alert>}
                          <Form.Control
                            type="text"
                            autoFocus
                            required='true'
                            name='confirmPassword'
                            value={passwordInput.confirmPassword}
                            onChange={(e) => {
                              setPasswordValidationError(false);
                              setPasswordInput({
                                ...passwordInput,
                                confirmPassword: e.target.value,
                              })


                            }}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "black" }}>
                      <Stack direction={'row'} spacing={2}>
                        <Button variant="contained" color='inherit' onClick={handleClose4}>
                          Close
                        </Button>
                        <Button variant="contained" color='primary' onClick={() => {

                          // handleSubmit(input, user.id)

                          handlePasswordChange(passwordInput);


                        }}>
                          Save Changes
                        </Button>
                      </Stack>
                    </Modal.Footer>
                  </Modal>




                  <Modal show={show} onHide={handleClose} >
                    <Modal.Header style={{ backgroundColor: 'black', color: 'white' }} closeButton>
                      <Modal.Title style={{ color: 'white' }}>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "black", color: 'white' }}>
                      <Form >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ color: 'white' }} >Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={user.name}
                            autoFocus
                            name='name'
                            value={input.name}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                name: e.target.value,
                              })}
                          />
                          <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder={user.email}
                            disabled='true'
                            autoFocus
                            name='email'
                            value={input.email}
                            onChange={(e) =>
                              setInput({
                                ...input,
                                email: e.target.value,
                              })}
                          />

                          <Form.Label style={{ color: 'white' }}>Contact Number</Form.Label>
                          {validationError && <Alert severity="error">'Please enter a valid Indian phone number'</Alert>}
                          <Form.Control
                            type="phone"
                            placeholder={user.phone}
                            autoFocus
                            name='phoneNumber'
                            pattern={indianPhoneRegex.source}
                            value={input.phoneNumber}
                            onChange={(e) => {

                              setInput({
                                ...input,
                                phoneNumber: e.target.value,
                              })
                              setValidationError(false)

                            }}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "black" }}>
                      <Stack direction={'row'} spacing={2}>
                        <Button variant="contained" color='inherit' onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="contained" color='primary' onClick={() => {

                          handleSubmit(input, user.id)


                        }}>
                          Save Changes
                        </Button>
                      </Stack>
                    </Modal.Footer>
                  </Modal>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Personal Info</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Full Name</MDBTypography>
                        {<MDBCardText className="text-muted">{user.name}</MDBCardText>}
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        {<MDBCardText className="text-muted">{user.phone}</MDBCardText>}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        {<MDBCardText className="text-muted">{user.email}</MDBCardText>}
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Account Settings</MDBTypography>
                        <Tooltip title="Change Password">
                          <IconButton onClick={handleShow4} aria-label="fingerprint" color="primary">
                            <Fingerprint />
                          </IconButton>
                        </Tooltip>
                        <MDBCardText className="text-muted"></MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
          <MDBCol md={3} className='walletCol'>
            {/* <MDBCol md={6} className='walletCol'>  style added by Riya*/}
            <h3><MDBIcon style={{ color: 'darkgreen' }} fas icon="wallet" /> Wallet</h3>
            {<h4>Balance:{balance}</h4>}
            <Stack spacing={2}>
              <Button onClick={() => setOpen(!open)} variant="contained" color="success">
                Add Money
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <Form>
                    {amountError && <Alert severity="error">'Please enter the minimum amount 100 Rs'</Alert>}
                    <Form.Control

                      onChange={(e) => {


                        setAmount(
                          e.target.value
                        )

                        setAmountError(false);

                      }
                      } type="number" placeholder="Enter Amount" min={minValue} />


                    <Button onClick={() => {

                      if (amount >= 100) {
                        handlePayment();

                        setOpen(!open)

                      } else {

                        setAmountError(true)


                      }


                    }} variant="contained" color='success'>Add</Button>
                  </Form>

                </div>
              </Collapse>
              <Button onClick={() => {
                setOpen2(!open2)
              }} variant="contained"> See Recent Transactions</Button>

            </Stack>
          </MDBCol>
        </MDBRow>
        <MDBRow >


        </MDBRow>
        <Collapse in={open2}>
          <MDBRow>

            <h4 style={{ color: 'white ' }}> {filter && <Chip color="primary" label="Date Filter" onDelete={() => {
              setFilteredTransactions(transaction); setFilter(false)
            }} />}</h4><Dropdown style={{ width: '15%' }} as={ButtonGroup}>
              <MDBBtn color="success">
                Filter By
              </MDBBtn>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />


              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header style={{ backgroundColor: 'black', color: 'white' }} closeButton>
                  <Modal.Title>Select Dates</Modal.Title>
                </Modal.Header >
                <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ color: 'white' }}>From</Form.Label><br></br>
                      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label style={{ color: 'white' }} >To</Form.Label><br></br>
                      <DatePicker style={{
                      }} selected={endDate} onChange={(date) => setEndDate(date)} />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'black', color: 'white' }}>
                  <Button variant="secondary" onClick={handleClose2}>
                    Close
                  </Button>
                  <Button variant="contained" color='success' onClick={() => {
                    handleFilter();
                    setFilter(true);
                    handleClose2();
                  }}>
                    Apply Filter
                  </Button>
                </Modal.Footer>
              </Modal>


              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDepositFilter} >Deposits</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Withdrawals</Dropdown.Item>
                <Dropdown.Item onClick={handleShow2}>Date</Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
            <MDBTable style={tableStyle}>

              <MDBTableHead style={{ color: '#09e56c' }}>
                <tr>
                  <th scope='col'>Date & Time</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Deposit/Withdraw</th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>

                {filteredTransactions.

                  slice() // Create a copy of the array to avoid mutating the original
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort transactions by date in descending order

                  .map((transaction) => (

                    <tr>
                      <td scope='row'>{new Date(transaction.date).toLocaleString()}</td>
                      <td >{transaction.amount}</td>
                      {transaction.deposit ? <td style={{ color: 'green' }}>Deposit  <MDBIcon fas icon="arrow-up" /></td> : <td style={{ color: 'red' }}>Withdraw</td>}
                    </tr>

                  ))}
              </MDBTableBody>
            </MDBTable>
          </MDBRow>
        </Collapse>
      </MDBContainer>
      <Footer/>
    </section>

    
  );
}