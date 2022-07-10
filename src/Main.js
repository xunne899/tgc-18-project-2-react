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
    active: 'home'
  }

  getTabLink(pageName) {
    if (pageName === this.state.active ) {
      return "nav-link active nav-tab" 
    } else {
      return "nav-link nav-tab"
    }
  }
 
 
  switchContent = (inpage) => {
    this.setState({
      active: inpage
    })
  }

  renderContentpage = () => {
    if (this.state.active === 'home') {
      return <Home/>}
      else if (this.state.active === 'search') {
        return <Browse changePage={this.switchContent} />
      }
      else if (this.state.active === 'collection') {
        return <Listing changePage={this.switchContent} />
      }
     else if (this.state.active === 'add') {
      return <AddNew changePage={this.switchContent} />
    } 
  }


  render() {
    return (

      <React.Fragment>
          <Navbar collapseOnSelect expand="lg" id="main">
            <Navbar.Brand href="#" className="nav-bar" ><Logo LogoFile={require('./logo_bl.png')} /></Navbar.Brand>
            <Navbar.Toggle id="nav-button" aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className=" ms-auto">
            
                <Nav.Link className={this.getTabLink('home')} onClick={() => {
                this.switchContent('home')}}>Home</Nav.Link>
                
             
                <Nav.Link className={this.getTabLink('search')} onClick={() => {
                this.switchContent('search')}}>Browse</Nav.Link>
                  
             
                <Nav.Link  className={this.getTabLink('collection')} onClick={() => {
                this.switchContent('collection')}}>Collection</Nav.Link>
            
                <Nav.Link  className={this.getTabLink('add')} onClick={() => {
                this.switchContent('add')}}>Add</Nav.Link>
        
              </Nav>
       
            </Navbar.Collapse>
          </Navbar>
         {this.renderContentpage()}
         <Footer/>
      </React.Fragment>
    )
  }
}
