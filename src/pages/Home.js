
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
              <HomeImage bgC="#ebd8b8" msg="Browse Our Collection"/>
              </a>
                    <section id="about">
                        <div className="content row justify-content-center ">
                            <h1>Your way to a better skin. Customise your own skin soap now !</h1>
                            {/* <div className="m-2"> */}
                            <Card className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3">
                                <Card.Img className="cardSize m-2"  variant="top" src={'./info.png'} />
                                <Card.Body>
                                    <Card.Title>Add Soap Information</Card.Title>
                                    <Card.Text>
                                       Learn more about adding to our soap collection.
                                    </Card.Text>
                                    <Button variant="dark" style={{color:props.color}}>Learn here</Button>
                                </Card.Body>
                            </Card>
                            <Card className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./info.png'} />
                                <Card.Body>
                                    <Card.Title>Browse</Card.Title>
                                    <Card.Text>
                                       Search for your soap collection? Click on the button Below
                                    </Card.Text>
                                   {/* <Link to=""> */}
                                    <Button variant="dark"  
                                   onClick={()=>props.goTo('search')} 
                                    style={{color:props.color}}>Browse</Button>
                                </Card.Body>
                            </Card>
                            <Card  className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./info.png'} />
                                <Card.Body>
                                    <Card.Title>Collection</Card.Title>
                                    <Card.Text>
                                       Click below to go to our collection page
                                    </Card.Text>
                                    <Button variant="dark" 
                                    onClick={()=>props.goTo('collection')}
                                     style={{color:props.color}} >Collection</Button>
                                </Card.Body>
                            </Card>
                            <Card  className="displayCards m-1 border-0 col-sm-12 col-md-12 col-lg-3" >
                                <Card.Img className="cardSize m-2"  variant="top" src={'./info.png'} />
                                <Card.Body>
                                    <Card.Title>Add</Card.Title>
                                    <Card.Text>
                                        Click on the button below to add on to our soap collection
                                    </Card.Text>
                                    <Button variant="dark"
                                     onClick={()=>props.goTo('add')}
                                     style={{color:props.color}}>Add here</Button>
                                </Card.Body>
                            </Card>
                       </div>
                        {/* </div> */}
                    </section>
        
            </React.Fragment>

        )
                                    
}