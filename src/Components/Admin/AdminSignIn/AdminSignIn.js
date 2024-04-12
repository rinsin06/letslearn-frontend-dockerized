import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { AuthContext } from '../../../Context/firebaseContext';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { loginUser } from '../../../AuthService';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminSignIn() {

    useEffect(()=>{

        localStorage.clear();
        Cookies.remove('token');
        
  
      })
  
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await loginUser(input);

    try {
      
        if (response.status === 200) {
          
          const token = response.data.token;
          const refreshToken = response.data.refreshToken;
          Cookies.set('token',token,{ expires: 10, secure: false })
          Cookies.set('refreshToken',refreshToken,{ expires: 10, secure: false })
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role",response.data.role);
          localStorage.setItem("id",response.data.id);
          console.log(response.data.email+"  ");
          console.log(Cookies.get('token'))
          if(localStorage.getItem('role') == 'ROLE_USER')
          {
            setAuthError(true);
            
          }else{
            history.push('/admin');
          }
          
          setLoading(false);
        }else if (response.status === 403){

          setAuthError(true)
          setLoading(false);
        }else {
          // Handle other errors
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          setLoading(false);
        }

      
    } catch (error) {
      //alert(error.response.data.message);

      setLoading(false);
    }

    if(response && response.status === 403)
    {
      setAuthError(true)
      setLoading(false);
    }
  }
  const history = useHistory()
    
    const[authError,setAuthError] = useState(false)
    const [input, setInput] = useState({    
      username: "",
      password: "",
    });
    const [loading,setLoading] = useState(false)
  return (
    <ThemeProvider theme={defaultTheme}>
         <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick = {()=>setLoading(false)}
      >
        <CircularProgress color="success" />
      </Backdrop>

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
            Admin Panel Sign in
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          {authError &&<Alert severity="error">Invalid Username/Password</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
             
              autoComplete="email"
              autoFocus
              value={input.username}
              onChange={(e) =>
               {setAuthError(false)
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={input.password}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}