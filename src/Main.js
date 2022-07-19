import React from 'react'; // const React = require('react)
import './style.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "./Logo";

import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Listing from './pages/List';
import Footer from './Footer';
import Browse from './pages/Browse';


export default class Main extends React.Component {

  state = {
    current: 'home'
  }

  connectTab=()=>{
    let pageName = this.state.current
    return( pageName ? "nav-link home nav-tab" :"nav-link nav-tab")
    } 
  
 

 
  changeContent = (inpage) => {
    this.setState({
      current: inpage
    })
  }

  showContentpage = () => {
    
    if (this.state.current === 'home') {
      return <Home goTo={this.changeContent}
                   color="white"
                   fontFamily ="League Spartan"/>
      }
      else if (this.state.current === 'search') {
        return <Browse goTo={this.changeContent}
                       color="white" 
                       fontFamily ="League Spartan"/>
      }
      else if (this.state.current === 'collection') {
        return <Listing goTo={this.changeContent} 
                        color="white"
                        fontFamily ="League Spartan"/>
      }
     else if (this.state.current === 'add') {
      return <AddNew goTo={this.changeContent} 
                    color="white"
                    fontFamily ="League Spartan"/>
    } 


  }




  render() {
    return (

      <React.Fragment>
        <div id="page-container">
        <div id="content-wrap">
          <Navbar collapseOnSelect expand="lg" id="main">
            <Navbar.Brand href="#" className="nav-bar" ><Logo LogoFile={require('./logo.png')} /></Navbar.Brand>
            <Navbar.Toggle id="nav-button" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
            
                {/* <Nav.Link className={this.connectTab('home')} onClick={() => {
                this.changeContent('home')}}>Home</Nav.Link>
                
             
                <Nav.Link className={this.connectTab('search')} onClick={() => {
                this.changeContent('search')}}>Browse</Nav.Link>
                  
             
                <Nav.Link  className={this.connectTab('collection')} onClick={() => {
                this.changeContent('collection')}}>Collection</Nav.Link>
            
                <Nav.Link  className={this.connectTab('add')} onClick={() => {
                this.changeContent('add')}}>Add</Nav.Link> */}

                <Nav.Link className={this.connectTab('home')} onClick={() => {
                   this.setState({
                    current: 'home'
                  })}}>Home</Nav.Link>
                
             
                <Nav.Link className={this.connectTab('search')} onClick={() => {
                  this.setState({
                    current: 'search'
                    })}}>Browse</Nav.Link>
                  
             
                <Nav.Link  className={this.connectTab('collection')} onClick={() => {
                this.setState({
                  current:'collection'
                })}}>Collection</Nav.Link>
            
                <Nav.Link  className={this.connectTab('add')} onClick={() => {
                 this.setState({
                  current:'add'})}}>Add</Nav.Link>
        
              </Nav>
       
            </Navbar.Collapse>
          </Navbar>
         {this.showContentpage()}
         </div>
         <Footer/>
         </div>
      </React.Fragment>
    )
  }
}