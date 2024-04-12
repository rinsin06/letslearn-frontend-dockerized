import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { passwordReset } from '../../AuthService';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import AlertTitle from '@mui/material/AlertTitle';
import ConfirmationModal from '../MuiComponents/ConfirmationModal';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#000000', // Set default background color to black
      paper: '#212121', // Set paper (container) background color to a darker shade of black
    },

    text: {
      primary: '#ffffff', // Set primary text color to white
      secondary: '#ffffff', // Set secondary text color to white
    },

  }

});

export default function ResetPassword() {


  useEffect(() => {

    if (localStorage.getItem('email') === null) {
      setOpen(true);
    }


  }, [])

  const [open, setOpen] = useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);

    if (passwordInput.newPassword === confirmPassword) {
      const response = await passwordReset(passwordInput);

      if (response.data.message === 'Password updated successfully') {
        setSuccess(true);

        setLoading(false);
      }


    } else {
      setVerificationError(true);

      setLoading(false);

    }
  };

  const [passwordInput, setPasswordInput] = useState({
    email: localStorage.getItem('email'),

    newPassword: '',

  })

  const [success, setSuccess] = useState(false);

  const [verificationError, setVerificationError] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false);

  const history = useHistory();
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

  return (
    <ThemeProvider theme={defaultTheme}>

      <div>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={() => setLoading(false)}
        >
          <CircularProgress color="success" />
        </Backdrop>

        <Modal
          open={open}

          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">

            </Typography>


            <Alert severity="warning">
              <AlertTitle>Authentication</AlertTitle>
              Please do the otp verification before proceeding.
            </Alert>


            <Button onClick={() => {
              localStorage.clear();

              history.push('/signIn')
            }} variant="contained">Go to Sign In</Button>
          </Box>
        </Modal>

        <ConfirmationModal
          open={success}

          btndata='Click here to Login'

          message='You have Successfully Changed your password.Please Login Again to continue'

          route='/signin' />
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordInput.newPassword}
              onChange={(e) =>
                setPasswordInput({
                  ...passwordInput,
                  newPassword: e.target.value,
                })}
              sx={{
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            />
            {verificationError && <Alert severity="error">Doesen't match with the new password</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm New Password"
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {

                localStorage.clear();
                history.push('/signin')
              }}
            >
              Go Back to Login
            </Button>
            <Grid container>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}