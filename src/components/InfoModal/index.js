import React, { useState } from "react";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

export default class Listing extends React.Component {
  // export default function InfoModal(props) {

  // {selectedData, isViewVisible,setIsViewVisible } = this.props
  // const [name,setName] = useState('');
  handleNameChange = (e) => {
    //setName(e.target.value);
    this.setState({ name: e.target.value });
  };

  // const [comment,setComment] = useState('');
  handleCommentChange = (e) => {
    // setComment(e.target.value);
    this.setState({ comment: e.target.value });
  };

  state = {
    name: "",
    comment: "",
    comments: this.props.selectedData.comments || [],
    isLoading: false,
  };

  handlePostComment = async () => {
    const url = "https://project-2-soap.herokuapp.com/";
    const { selectedData } = this.props;
    this.setState({ isLoading: true });
    const bodyData = {
      username: this.state.name,
      comment: this.state.comment,
    };
    let result = await axios.post(url + `soap_listings/comments/${selectedData._id}`, bodyData);
    console.log(result);
    console.log("COMMENTS", this.state.comments);
    if (result.status == 201) {
      bodyData["datePosted"] = new Date();

      let iniComments = [...this.state.comments];
      iniComments.push(bodyData);

      this.setState({ comments: iniComments });
    }
    this.setState({ isLoading: false });

    //this.props.setIsViewVisible(false);
  };

  //console.log('props data=>', props)
  getPostedTime = (datePosted) => {
    let timeDiff = new Date() - new Date(datePosted);
    let output = "";
    let days = timeDiff / 86400000;
    if (days < 1) {
      let hours = timeDiff / 3600000;
      if (hours < 1) {
        let minute = timeDiff / 60000;
        if (minute < 1) {
          output = "Just Posted";
        } else {
          output = minute.toFixed(0) + " minute(s)";
        }
      } else {
        output = hours.toFixed(0) + " hour(s)";
      }
    } else {
      output = days.toFixed(0) + " day(s)";
    }
    return output;
  };

  getCommentData = (comments) => {
    if (comments == undefined) {
      return;
    }

    return comments.map((commentInfo) => (
      <React.Fragment key={commentInfo._id}>
        <div className="infoLabel">
          UserName:<span>{commentInfo.username}</span>
        </div>
        <div className="infoLabel">
          Description:<span>{commentInfo.comment}</span>
        </div>
        <div className="infoLabel">
          Date:<span>{this.getPostedTime(commentInfo.datePosted)}</span>
        </div>
      </React.Fragment>
    ));
  };
  render() {
    const { selectedData, isViewVisible, setIsViewVisible } = this.props;
    console.log("Checking comments type==>", this.state.comments, typeof this.state.comments);
    return (
      <Modal size="lg" style={{paddingLeft: "0px" }} show={isViewVisible} onHide={setIsViewVisible} >
        <Modal.Header style={{ background: "white" }} closeButton>
          <Modal.Title style={{ fontFamily: "League Spartan" }}>View</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "white" }}>
          <div className="infoTitle">{selectedData.soap_label}</div>
          <div className="infoPrice" style={{color:"black"}}>${selectedData.cost}</div>

          <div className="infoWrapper row  mx-auto">
            <div className="infoImage rounded-3 mx-auto mb-1" 
            style={{
              //  "max-height": "250px",
                "max-width": "500px"}}
            >
              <img className="mx-auto rounded-3" src={selectedData.image_url} />
            </div>

            <div className="row mt-3 ">
            <div className="col-sm-12 col-lg-6 mb-2 ">
              <div>
                <strong>Name: </strong> <span className="text-right">{selectedData.name}</span>
              </div>
              <div classname="mt-4">
                <strong>Email: </strong> <span className="text-right">{selectedData.email}</span>
              </div>
              <div classname="mt-4">
                <strong>Contact Number: </strong> <span className="text-right">{selectedData.contact_no}</span>
              </div>
              <div classname="mt-4">
                <strong>Color: </strong> <span className="text-right">{selectedData.color}</span>
              </div>
              <div classname="mt-4">
                <strong>Country Origin: </strong> <span className="text-right">{selectedData.country_origin}</span>
              </div>
              <div classname="mt-4">
                <strong>Skin Type: </strong> <span className="text-right">{selectedData.skin_type.join(", ")}</span>
              </div>
            </div>

            <div className="col-sm-12 col-lg-6 ">
              <div>
                <strong>Oil Ingredient: </strong>
                <span>
                  {selectedData.ingredients.oil_ingredient
                    .map((item) => {
                      return item;
                    })
                    .join(", ")}
                </span>
              </div>
              <div>
                <strong>Base Ingredient: </strong>
                <span>
                  {selectedData.ingredients.base_ingredient
                    .map((item) => {
                      return item;
                    })
                    .join(", ")}
                </span>
              </div>
              <div>
                <strong>Milk Ingredient: </strong>
                <span>
                  {" "}
                  {selectedData.ingredients.milk_ingredient
                    .map((item) => {
                      return item;
                    })
                    .join(", ")}
                </span>
              </div>
              <div>
                <strong>Treat: </strong>
                <span>
                  {selectedData.suitability.treat
                    .map((item) => {
                      return item;
                    })
                    .join(", ")}
                </span>
              </div>
              <div>
                <strong>Recommended Usage: </strong>
                {selectedData.suitability.recommended_use}
              </div>
              <div>
                <strong>Date Posted: </strong>
                {new Date(selectedData.suitability.date_posted).toLocaleString()}
              </div>
              </div>
            </div>

            {/* 
           <div>Name :<span className="badge rounded-pill bg-dark mx-1">{selectedData.name}</span></div>
          <div>Email :<span className="badge rounded-pill bg-dark mx-1">{selectedData.email}</span></div>
          <div>Contact Number :<span className="badge rounded-pill bg-dark mx-1">{selectedData.contact_no}</span></div>
          <div>Color :<span className="badge rounded-pill bg-dark mx-1">{selectedData.color}</span></div>
          <div>Country Origin :<span className="badge rounded-pill bg-dark mx-1">{selectedData.country_origin}</span></div>
          <div>Skin Type :<span className="badge rounded-pill bg-dark mx-1">{selectedData.skin_type}</span></div>
          <div>Oil Ingredient :<span className="badge rounded-pill bg-dark mx-1">{selectedData.ingredients.oil_ingredient}</span></div>
          <div>Base Ingredient :<span className="badge rounded-pill bg-dark mx-1">{selectedData.ingredients.base_ingredient}</span></div>
          <div>Milk Ingredient :<span className="badge rounded-pill bg-dark mx-1">{selectedData.ingredients.milk_ingredient}</span></div>
          <div>Treat:<span className="badge rounded-pill bg-dark mx-1">{selectedData.suitability.treat}</span></div>
          <div>Recommended Usage:<span className="badge rounded-pill bg-dark mx-1">{selectedData.suitability.recommended_use}</span></div>
          <div>Date Posted:<span className="badge rounded-pill bg-dark mx-1">{selectedData.suitability.date_posted}</span></div>   */}

            {/* <div className="infoLabel">
              UserName:<span>{}</span>
            </div> */}

            <div classname="row m-2">
              <strong>Comments:</strong>
              <div className="autoBox col col-sm border  border-1 p-2 rounded-3">{this.getCommentData(this.state.comments)}</div>
            </div>
          </div>

          <Form>
            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <div style={{ fontFamily: "League Spartan" }}>
                  <strong>Username</strong>
                </div>
              </Form.Label>
              <Form.Control type="user" placeholder="user" onChange={this.handleNameChange} value={this.state.name} autoFocus />
            </Form.Group>
            <Form.Group className="m-2" controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                <div style={{ fontFamily: "League Spartan" }}>
                  <strong>Comments</strong>
                </div>
              </Form.Label>
              <Form.Control as="textarea" rows={3} onChange={this.handleCommentChange} value={this.state.comment} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "white" }}>
          {/* <Button variant="primary" onClick={this.handlePostComment}>
          Post Comment
         </Button> */}
          <Button variant="dark" disabled={this.state.isLoading} onClick={this.handlePostComment} className= "postComment me-3"style={{ fontFamily: "League Spartan" }}>
            {this.state.isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            Post Comment
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
