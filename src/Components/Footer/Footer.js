import React from 'react';

import './Footer.css';

import '../SignIn/SignIn.css'

function Footer() {
  return (

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
    
  );
}

export default Footer;
