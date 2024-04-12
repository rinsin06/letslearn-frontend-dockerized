import React, { useState,useContext } from 'react';
import '../SignIn/SignIn.css';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Context/firebaseContext';
import { addNewUser } from '../../AuthService';
import Alert from '@mui/material/Alert';

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber:"",
    roles:"ROLE_USER"
  });
    // const {firebase} = useContext(FirebaseContext)
    const history = useHistory()
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!indianPhoneRegex.test(input.phoneNumber)) {
        setValidationError(true);
      }
      try {      
      addNewUser(input).then((response)=>{
        if (response.status === 200) {       
          // //alert(response.data.message);
          //  Swal.fire({
          //   title: 'Success!',
          //   // text: response.data.message,
          //   icon: 'success',
          //   confirmButtonText: 'OK',          
          // });
           history.push("/signin");
        }
  
        }); 
        
      } catch (error) {
        // //alert(error.response.data.message);
        // Swal.fire({
        //   title: 'Error!',
        //   // text: error.response.data.message,
        //   icon: 'error',
        //   confirmButtonText: 'OK',        
        // });
      }
    };

    
  const indianPhoneRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{4}\)?\s?\d{3}\s?\d{3}$/);

  const [validationError, setValidationError] = useState(false)


  return (
    <div className="signin-container">
      <header className="showcase">
        <div className="logo">
    
        </div>

        <div className="showcase-content">
          <div className="formm">
            <form onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              <div className="info">
              
          <input
            className="email"
            type="text"
            id='fname'
            placeholder='Full Name..'
            required='true'
            name="name"
            value={input.name}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />
          <br />
          
          <br />
          <input
            className="email"
            type="email"
            id='fname'
            placeholder='Email..'
            required='true'
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />
          <br />
          
          <br />
          {validationError && <Alert severity="error">'Please enter a valid Indian phone number'</Alert>}
          <input
            className="email"
            type="number"
            id='lname'
            placeholder='Phone Number..'
            required='true'
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />
          <br />
         
          <br />
          <input
            className="email"
            type="password"

            required='true'
            id='lname'
            placeholder='Password..'
            name="password"
                          value={input.password}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
          />
       
          <br />
              </div>
              <div className="btn">
                <button className="btn-primary" type="submit">
                  Sign Up
                </button>
              </div>
             
            </form>
          </div>

          <div className="fcbk">
           
            
          </div>
          <div className="signup">
            <p>Already have an account?</p>
            <a onClick={()=>history.push("/signin")}>Sign in now</a>
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

export default SignUp;