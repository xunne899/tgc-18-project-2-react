
import React from 'react'
//import card and button 
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Button, Card} from 'react-bootstrap';
import HomeImage from '../HomeImage';

export default function Home(props){

 

        return (
            <React.Fragment>
            <a onClick={()=>props.goTo('collection')}>
              <HomeImage bgC="white" msg="Browse Our Collection"/>
              </a>
                    <section id="about">
                        <div className="content row justify-content-center ">
                            <h1>Your way to a better skin. Customise your own skin soap now !</h1>
                            {/* <div className="m-2"> */}
                            {/* <Card className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3">
                                <Card.Img className="cardSize m-2"  variant="top" src={'./information.png'} />
                                <Card.Body>
                                    <Card.Title style={{fontFamily:"League Spartan" }} >Add Soap Information</Card.Title>
                                    <Card.Text style={{fontFamily:"League Spartan" }}>
                                       Learn more about adding to our soap collection.
                                    </Card.Text>
                                    <Button variant="dark" 
                                   style={{color:props.color,fontFamily:props.fontFamily}}>Learn here</Button>
                                </Card.Body>
                            </Card> */}
                            <Card className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./mag_glass.png'} />
                                <Card.Body>
                                    <Card.Title style={{fontFamily:"League Spartan" }}>Browse</Card.Title>
                                    <Card.Text style={{fontFamily:"League Spartan" }}>
                                       Search for your soap collection? Click on the button Below
                                    </Card.Text>
                                   {/* <Link to=""> */}
                                    <Button variant="dark"  
                                   onClick={()=>props.goTo('search')} 
                                    style={{color:props.color,fontFamily:props.fontFamily}}>Browse here</Button>
                                </Card.Body>
                            </Card>
                            <Card  className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./soapcollect.png'} />
                                <Card.Body>
                                    <Card.Title style={{fontFamily:"League Spartan" }}>Collection</Card.Title>
                                    <Card.Text style={{fontFamily:"League Spartan" }}>
                                       Click below to go to our collection page
                                    </Card.Text>
                                    <Button variant="dark" 
                                    onClick={()=>props.goTo('collection')}
                                    style={{color:props.color,fontFamily:props.fontFamily}}>Collection</Button>
                                </Card.Body>
                            </Card>
                            <Card  className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./addition.png'} />
                                <Card.Body>
                                    <Card.Title style={{fontFamily:"League Spartan" }}>Add</Card.Title>
                                    <Card.Text style={{fontFamily:"League Spartan" }}>
                                        Click on the button below to add on to our soap collection
                                    </Card.Text>
                                    <Button variant="dark"
                                     onClick={()=>props.goTo('add')}
                                     style={{color:props.color,fontFamily:props.fontFamily}}>Add here</Button>
                                </Card.Body>
                            </Card>
                       </div>
                        {/* </div> */}
                    </section>
        
            </React.Fragment>

        )
                                    
}