import React from 'react'; // const React = require('react)
import'./style.css'
import Logo from './Logo';
export default class Main extends React.Component{
render(){
  return(
    <React.Fragment>
   <body>
    <nav>
    
      <div id="main">
       <a href="#"><Logo LogoFile={require('./logo_bl.png')}/> </a>
        <a href="#">Browse</a>
        <a href="#about-us">Collection</a>
        <a href="#">Add</a>
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
