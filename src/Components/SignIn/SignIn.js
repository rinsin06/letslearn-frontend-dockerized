// SignIn.js
import React, { useState,useContext, useEffect } from 'react';
import './SignIn.css';
import '../NavBar/NavBar.css';
import { useHistory } from 'react-router-dom';
import { AuthContext,FirebaseContext } from '../../Context/firebaseContext';
import { loginUser } from '../../AuthService';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button'; 
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import NestedModal from '../MuiComponents/NestedModal';


const SignIn = () => {


    const [email,setEmail] = useState('')
    const[password,setpassword] = useState('')
   
    const history = useHistory()
   
    const[authError,setAuthError] = useState(false)
    const [input, setInput] = useState({    
      username: "",
      password: "",
    });

    useEffect(()=>{

      localStorage.clear();
      Cookies.remove('token');


    })

   
    const handleLogin = async (e) => {
      e.preventDefault();

      setLoading(true);

      const response = await loginUser(input);

      try {
        
          if (response && response.status === 200) {
            
            const token = response.data.token;
            const refreshToken = response.data.refreshToken;
            Cookies.set('refreshToken',refreshToken,{ expires: 10, secure: false })
            Cookies.set('token',token,{ expires: 10, secure: false })
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("role",response.data.role);
            localStorage.setItem("id",response.data.id);
            console.log(response.data.email+"  ");
            console.log(Cookies.get('token'))
            history.push('/');
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
  const [loading,setLoading] = useState(false)

 const[open,setOpen] = useState(false);
  
 const handleClose = ()=>{

  setOpen(false);
 }

  return (
    <div className="signin-container">
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick = {()=>setLoading(false)}
      >
        <CircularProgress color="success" />
      </Backdrop>

      <header className="showcase">
        <div className="logo">
    
        </div>

        <div className="showcase-content">
          <div className="formm">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              
              {authError &&<Alert severity="error">Invalid Username/Password</Alert>}
              <div className="info">
                <input
                  className="email"
                  type="email"
                  placeholder="Email or phone number"
                  name="username"
                  required='true'
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
                <br />
                <input
                  className="email"
                  type="password"
                  placeholder="Password"
                  required='true'
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="btn">
              <Button type='submit' style={{marginTop :'0rem'}} variant="success">SignIn</Button>
              </div>
              <div className="help">
                <div>
                  {/* <input type="checkbox" />
                  <label>Remember me</label> */}
                </div>
                
              </div>
            </form>
          </div>

          <div className="fcbk">
           
          </div>
          <div className="signup">

            <NestedModal
            open={open}
            onHide={handleClose}
           
            />
            <p onClick={()=>setOpen(true)}>Forgot Password?</p>
            <a className='links' onClick={()=>history.push("/signup")}>Sign up now</a>
          </div>
          <div className="more">
            <p>
              This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
              <a href="#">Learn more.</a>
            </p>
          </div>
        </div>
      </header>
      <footer>
        <div className="ftr-content">
          <div className="contact">
            <a href="#">Questions? Contact us.</a>
          </div>
          <div className="ftr">
            <a href="#">Gift Card Terms</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Statement</a>
          </div>
          <div className="select">
            <select>
              <option>English</option>
              <option>العربية</option>
              <option>Français</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
