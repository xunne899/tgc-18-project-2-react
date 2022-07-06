import React from 'react'; // const React = require('react)
import'./style.css'

export default class Main extends React.Component{
render(){
  return(
    <React.Fragment>
   <body>
    <nav>
      <ul id="main">
        <li><a href="#">Browse</a></li>
        <li><a href="#about-us">Collection</a></li>
        <li><a href="#">Add</a></li>
      </ul>
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
