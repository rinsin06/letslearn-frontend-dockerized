import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { sendOtp, verifyOtp } from '../../UserService';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'currentColor',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  transition: 'transform 1s ease',

};

function ChildModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [input, setInput] = useState('');

  const useParams = {
    phone: localStorage.getItem('phone'),
    otp: input
  }

  const history = useHistory();

  const [verificationError, setVerificationError] = useState(false);


  const handleverification = async (input) => {

    setLoading(true)

    const response = await verifyOtp(input);

    if (response.data.message === 'Verification Successfull') {
      history.push('/password-reset');

      handleClose();

      setLoading(false)
    } else {


      setVerificationError(true);

      setLoading(false);

    }

  }

  const handlesendOtp = async () => {

    setLoading(true);

    const response = await sendOtp(props.email);

    localStorage.setItem('phone', response.data.phone);


    handleOpen();

    setLoading(false);

  }

  localStorage.setItem("email", props.email);

  const [loading, setLoading] = useState(false)

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="success" />
      </Backdrop>
      <Button onClick={handlesendOtp}>Send OTP</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 style={{color:'darkgrey'}}  id="child-modal-title">Verification</h2>
          <p style={{color:'darkgrey'}} id="child-modal-description">
            Please enter the 6 digit OTP sent to your registered mobile number.
          </p>
          {verificationError && <Alert severity="error">Incorrect OTP</Alert>}
          <TextField
            type='password'

            color="" focused
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value,
              )
            } 

            InputProps={{ style: { color: '#ffffff' } }} // Set text color to white
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                
              },
            }}

            
             />
          <Button onClick={() => {

            handleverification(useParams);

          }}>Verify OTP</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {


  const [open, setOpen] = useState(false);

  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(false)

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="success" />
      </Backdrop>
      <Modal
        {...props}
        onClose={props.onHide}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600, textDecorationColor: 'white' }}>
          <h3 style={{color:'darkgrey'}}  id="parent-modal-title">Enter registered email Id</h3>
          <p id="parent-modal-description">
            <TextField
              type='email'

              label="Email" color="" focused
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value,
                )


              }

              InputProps={{ style: { color: '#ffffff' } }} // Set text color to white
              sx={{
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  
                },
              }}

            />
          </p>
          <ChildModal
            email={input} />
        </Box>
      </Modal>
    </div>
  );
}
