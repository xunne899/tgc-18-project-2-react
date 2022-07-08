import React from 'react'; // const React = require('react)
import'./style.css'
import Logo from './Logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faWhatsapp,faInstagram } from "@fortawesome/free-brands-svg-icons"
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'


// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';



export default class Main extends React.Component{


render(){
return(

    <React.Fragment>
  
  <Navbar collapseOnSelect expand="lg"
  //  bg="dark" variant="dark"
  id="main"
   >
  {/* <Container> */}
  <Navbar.Brand href="#" className="nav-bar" ><Logo LogoFile={require('./logo_bl.png')}/></Navbar.Brand>
  <Navbar.Toggle id="nav-button" aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className=" ms-auto">
      <Nav.Link className="nav-tab" href="#">Browse</Nav.Link>
      <Nav.Link className="nav-tab" href="#">Collection</Nav.Link>
      <Nav.Link className="nav-tab" href="#">Add</Nav.Link> 
    </Nav>

  </Navbar.Collapse>
  {/* </Container> */}
</Navbar>


{/* 
    <nav>
    
      <div id="main">
       <a href="#"><Logo LogoFile={require('./logo_bl.png')}/> </a>
        <a  href="#">Browse</a>
        <a   href="#about-us">Collection</a>
        <a   href="#">Add</a>
      </div>

    </nav>
      */}
    <section id="ref">
      <div id="cta">
        <a href="#">
          Browse Our Collection 
        </a>
      </div>
    </section>
    <section id="about">
      <div className="content">
        <h1 >Your way to a better skin. Customise your own skin soap now !</h1>
      </div>
    </section>
  {/* footer */}
  <footer>
    <div className="footer col-12">
      <div style={{"backgroundColor":"#212529"}}>

        <div className="d-inline-block justify-items-center p-2" style={{color:"#ebd8b8",fontSize: "1rem", fontFamily:"Jost, sans-serif",marginLeft:"10px"}}>

           Copyright@2022 | For Educational Purposes | <FontAwesomeIcon icon={faFacebook}/>&nbsp;
           <FontAwesomeIcon icon={faWhatsapp}/>&nbsp;
           <FontAwesomeIcon icon={faTwitter}/>&nbsp;
           <FontAwesomeIcon icon={faInstagram}/>

       
        </div>
      </div>
    </div>
  </footer>
  {/* <!-- end of footer --> */}
 
    </React.Fragment>
  )
}}
