
import React from 'react'
import { Button, Card} from 'react-bootstrap';
import HomeImage from '../mainpage_components/HomeImage';

export default function Home(props){

 

        return (
            <React.Fragment>
            <div>
              <HomeImage goTo={props.goTo} bgC="white" msg="Customise Your Way To A Better Skin" fontFamily="League Spartan"/>
              </div>
                    <section id="about">
                        <div className="content row justify-content-center ">
                            <h1>Create Your Own Skin Soap Now !</h1>
                
                            <Card className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./mag_glass.png'} />
                                <Card.Body>
                                    <Card.Title style={{fontFamily:"League Spartan" }}>Browse</Card.Title>
                                    <Card.Text style={{fontFamily:"League Spartan" }}>
                                       Search for your soap collection? Click on the button below
                                    </Card.Text>
                                  
                                    <Button variant="dark"  
                                   onClick={()=>props.goTo('search')} 
                                    style={{color:props.color,fontFamily:props.fontFamily}}>Browse here</Button>
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
                    </section>
        
            </React.Fragment>

        )
                                    
}