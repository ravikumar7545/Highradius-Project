import React from 'react';
import '../css/Navbar.css';
import logo from '../images/Group20399.svg'
function Navbar() {
  return (
    <div id="navbar">
      <div id="siteName">

         <img src={logo} alt="logo" />
      </div>
      <div id="image">
        <img src={require('../images/highradius_logo.png')} />
      </div>
      
    </div>
  )
}

export default Navbar