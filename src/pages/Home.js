
import React from 'react'
//import card and button 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class Home extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div style={{ background: "#ebd8b8" }}>
                    <section id="ref">
                        <div id="cta">
                            <a href="#">
                                Browse Our Collection
                            </a>
                        </div>
                    </section>
                    <section id="about">
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <h1 >Your way to a better skin. Customise your own skin soap now !</h1>
                            <Card className="displayCards row gx-gy-2   d-flex justify-content-center">
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button variant="dark">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            <Card className="displayCards  row gx-gy-2   d-flex justify-content-center" >
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button variant="dark">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            <Card  className="displayCards  row gx-gy-2   d-flex justify-content-center" >
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button variant="dark" style={{color:"#ebd8b8"}}>Go somewhere</Button>
                                </Card.Body>
                            </Card>
                            <Card  className="displayCards" >
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button variant="dark" style={{color:"#ebd8b8"}}>Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </div>

                    </section>
                </div>
            </React.Fragment>

        )
    }
}