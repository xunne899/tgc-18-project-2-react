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
          output = minute.toFixed(0) + " minute(s) ago";
        }
      } else {
        output = hours.toFixed(0) + " hour(s) ago";
      }
    } else {
      output = days.toFixed(0) + " day(s) ago";
    }
    return output;
  };

  getCommentData = (comments) => {
    if (comments == undefined) {
      return;
    }
    return comments.reverse().map((commentInfo) => (
      <React.Fragment key={commentInfo._id}>
        <div className="infoUserLabel">
          {((commentInfo.username !="")?commentInfo.username:"Anonymous")}-<span className="infoDate">{this.getPostedTime(commentInfo.datePosted)}</span>
        </div>
        {/* <div className="infoLabel">
          UserName:<span>{commentInfo.username}</span>
        </div> */}
        <div className="infoDescLabel">
          <span>{commentInfo.comment}</span>
        </div>
        <div className="infoBottomLabel">{/* Date:<span>{this.getPostedTime(commentInfo.datePosted)}</span> */}</div>
      </React.Fragment>
    ));
  };

  getUpperCase = (selectedField)=>{
    // const { selectedData } = this.props;
    if (selectedField){
   return  selectedField[0].toUpperCase() + selectedField.slice(1)
    }
  }

  render() {
    const { selectedData, isViewVisible, setIsViewVisible } = this.props;
    console.log("Checking comments type==>", this.state.comments, typeof this.state.comments);
    return (
      <Modal size="lg" style={{ paddingLeft: "0px" }} show={isViewVisible} onHide={setIsViewVisible}>
        <Modal.Header style={{ background: "white" }} closeButton>
          <Modal.Title style={{ fontFamily: "League Spartan" }}>View</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "white" }}>
          <div className="infoTitle">{selectedData.soap_label}</div>
          <div className="infoPrice" style={{ color: "black" }}>
            ${selectedData.cost}
          </div>

          <div className="infoWrapper row  mx-auto">
            <div
              className="infoImage rounded-3 mx-auto mb-1"
              style={{
                //  "max-height": "250px",
                "max-width": "500px",
              }}
            >
              <img className="mx-auto rounded-3" src={selectedData.image_url} />
            </div>

            <div className="row mt-3 ">
              <div className="col-sm-12 col-lg-6 mb-4 ">
                <h5>Contact Info</h5>
                <div className="text-wrap">
                  <strong className="text-left">Name: </strong> <span className="text-right">{this.getUpperCase(selectedData.name)}</span>
                </div>
                <div classname="mt-4">
                  <div className="text-wrap">
                    <strong className="text-left">Email: </strong> <span className="text-right">{selectedData.email}</span>
                  </div>
                </div>
                <div classname="mt-4">
                  <div className="text-wrap">
                    <strong className="text-left">Contact Number: </strong> <span className="text-right">{selectedData.contact_no}</span>
                  </div>
                </div>
                <div className="text-wrap">
                  <strong className="text-left">Date Posted: </strong>
                  <span className="text-right">{new Date(selectedData.suitability.date_posted).toLocaleString()}</span>
                </div>
              </div>

              <div className="col-sm-12 col-lg-6 mb-4">
                <h5>Treatment Info</h5>

                <div className="text-wrap">
                  <strong className="text-left">Treat: </strong>
                  <span className="text-right">
                    {selectedData.suitability.treat
                      .map((item) => {
                        return (this.getUpperCase(item))
                      })
                      .join(", ")}
                  </span>
                </div>
                <div className="text-wrap">
                  <strong className="text-left">Usage: </strong>
                  <span className="text-right">{this.getUpperCase(selectedData.suitability.recommended_use)}</span>
                </div>

                <div classname="mt-4">
                  <div className="text-wrap">
                    <strong className="text-left">Skin Type: </strong> <span className="text-right">   
                    {selectedData.skin_type
                      .map((item) => {
                        return (this.getUpperCase(item))
                      })
                      .join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-sm-12 col-lg-6 mb-4 ">
                <h5>Product Info</h5>
                <div classname="mt-4">
                  <div className="text-wrap">
                  {/* <strong className="text-left">Country Origin: </strong> <span className="text-right">{selectedData.country_origin[0].toUpperCase() + selectedData.country_origin.slice(1)}</span> */}
                    <strong className="text-left">Country Origin: </strong> <span className="text-right">{this.getUpperCase(selectedData.country_origin)}</span>
                  </div>
                </div>
                <div classname="mt-4">
                  <div className="text-wrap">
                    <strong className="text-left">Color: </strong> <span className="text-right">{this.getUpperCase(selectedData.color)}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 mb-4 ">
                <h5>Ingredient Info</h5>
                <div className="text-wrap">
                  <strong className="text-left">Oil Ingredient: </strong>
                  <span className="text-right">
                    {selectedData.ingredients.oil_ingredient
                      .map((item) => {
                        return (this.getUpperCase(item))
                      })
                      .join(", ")}
                  </span>
                </div>

                <div className="text-wrap">
                  <strong className="text-left">Base Ingredient: </strong>
                  <span className="text-right">
                    {selectedData.ingredients.base_ingredient
                      .map((item) => {
                        return (this.getUpperCase(item))
                      })
                      .join(", ")}
                  </span>
                </div>
                <div className="text-wrap">
                  <strong className="text-left">Milk Ingredient: </strong>
                  <span className="text-right">
                    {" "}
                    {selectedData.ingredients.milk_ingredient
                      .map((item) => {
                        return (this.getUpperCase(item))
                      })
                      .join(", ")}
                  </span>
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
              <strong>Reviews:</strong>
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
          <Button
            variant="dark"
            disabled={this.state.isLoading}
            onClick={this.handlePostComment}
            className="postComment me-3"
            style={{ fontFamily: "League Spartan" }}
          >
            {this.state.isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            Post Comment
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
