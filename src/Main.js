import React from 'react'; // const React = require('react)
import'./style.css'
import Logo from './Logo';
export default class Main extends React.Component{
render(){
  return(
    <React.Fragment>
   <body>

   {/* <nav className="navbar navbar-expand-sm navbar-light " style={{"background-color:white;"}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="#"
        style=" font-size: 2rem;">
        <img src="images/fortune_logo.png" style="width:95px" className=" d-inline-block align-text-middle mt-1" />
      </a>


      <a  className="register btn btn-primary ms-auto me-4 d-none d-md-block d-lg-none" href="#">Register</a>  
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="products.html">Products</a>
          </li>
            <li className="nav-item">
            <a className="nav-link" href="recipe.html">Recipes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contactus.html">Contact Us</a>
          </li>
        </ul>

        <div className="nav-item text-center ms-auto m-2 d-md-block d-lg-block">
         
          
          <a className="register btn btn-danger" href="member.html" target="_blank">Join Us</a>
        
        </div>

   
        
      </div>

      

    </div>
  </nav> */}



    <nav>
    
      <div id="main">
       <a href="#"><Logo LogoFile={require('./logo_bl.png')}/> </a>
        <a  href="#">Browse</a>
        <a   href="#about-us">Collection</a>
        <a   href="#">Add</a>
      </div>

    </nav>
    <section id="hero">
      <div id="cta">
        <a href="#">
          Browse Our Collection 
        </a>
      </div>
    </section>
    <section id="about">
      <div className="content">
        <h1>Your way to a better skin. Customise your own skin soap now !</h1>
      </div>
    </section>
  </body>
    </React.Fragment>
  )
}}
