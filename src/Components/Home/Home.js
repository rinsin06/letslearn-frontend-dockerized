import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';
const Home = () => {

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");  	  
  const [image, setImage] = useState(''); 
  const history = useHistory()
  useEffect(() => {
    const token = Cookies.get('token'); 
    console.log(localStorage.getItem("role"));
    
    if (!token) {
      return history.push('/signin');
    } else {
      // verifyToken(token)
        
        // .then((res) => {
        //   setImage(res.data.user?.image);
        // }).catch((err) => {
        //   localStorage.removeItem("token");
        // })
    }
  }, []);

  

	// const handleLogout = () => {
	// 	localStorage.removeItem("token");
	// 	localStorage.removeItem("name");
	// 	navigate('/login');
  // }
  
  const addImage = async () => {  
    const { value: file } = await Swal.fire({
      title: 'Select Image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile pic'
      }
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {        
        Swal.fire({
          title: "img",
          imageUrl: e.target.result,
          imageHeight: 400,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Update',
          denyButtonText:'Change'
        }).then((result) => { 
          if (result.isConfirmed) {
            uploadImage(file);
          } else {
            addImage();
          }
        })
      };
      reader.readAsDataURL(file);
    }
    function uploadImage(file) {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      
axios.post(`http://localhost:8080/auth/image-upload?token=${token}`, formData, {
  headers: {
      'Content-Type': 'multipart/form-data',
     
  },
}).then((res) => { 
          setImage(res.data.image);           
        }).catch((err) => {
          console.log(err);
        }); 
    } 
  } 
  const removeImage = () => {
    const token = localStorage.getItem("token");
    axios.delete(`api/auth/users/remove-image/${token}`)
      .then((res) => {
        setImage(res.data.image);
      }).catch((err) => {
        console.log(err);
      });
  }

	return (
		
    <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#9A616D"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/home" style={{ fontWeight: "bold", color: "white" }}>
            Welcome {name} 
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link" href="#" style={{fontWeight: "bold"}}
                  >Dashboard</a> */}
              </li>
            </ul>
            <form className="d-flex align-content-around" role="search">
              
              <button className="btn btn-danger ms-3">Logout</button>
            </form>
          </div>
        </div>
      </nav>
      
      <section className='py-5 '>
        <div className="container py-5 ">
          <div className="row justify-content-center">
              
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                <img src={image}
                    alt="avatar" className="rounded-circle img-fluid" style={{ height: 150, width: 150 }} />
                    <h5 className="my-3">{name}</h5>
                  
                  <div className="d-flex justify-content-center mb-2"> 
                    <button onClick={addImage} type="button" className="btn btn-primary ">Update image</button>
                    <button onClick={removeImage} type="button" className="btn btn-danger ms-1">
                      Remove image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                        <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />                          
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">7894561230</p>
                    </div>
                  </div>
                  <hr />                                    
                </div>
              </div>
            </div>
              
          </div>
        </div>
      </section>
      
    </div>
    
  )
}

export default Home;
