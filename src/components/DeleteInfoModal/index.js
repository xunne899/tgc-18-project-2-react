// import React from "react";
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

export default class DeleteInfoModal extends React.Component {
  state = {
    collection: [],
  };


  // delete collection function 
  processDeleteCollection = async (r) => {
    const url = "https://project-2-soap.herokuapp.com/";

    let res = await axios.delete(url + `soap_listings/${r._id}`);
    // delete

    if (res.status === 200) {
      this.props.setIsViewVisible(false);
      Swal.fire({
        fontFamily: "League Spartan",
        icon: "success",
        title: "Collection has been deleted",
        showConfirmButton: false,
        timer: 1700,
      });
    }
  };


  //display delete modal view
  render() {
    const { selectedData, isViewVisible, setIsViewVisible } = this.props;
    return (
      <React.Fragment>
        <Modal show={isViewVisible} onHide={setIsViewVisible} centered>
          <Modal.Header style={{ background: "white" }} closeButton>
            <Modal.Title className="deleteText d-flex justify-content-center" style={{ fontFamily: "League Spartan", color: "red" }}>
              View
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "white" }}>
            <div className="infoWrapper">
              <img className="exclamationIcon row mx-auto" src={require("../../images/exclamation.png")} alt="no img" />
              <div className="d-flex justify-content-center mt-2" style={{ color: "red" }}>
                <h3>Confirm Delete</h3>
              </div>
              <div className="deleteContent d-flex justify-content-center" style={{ color: "red" }}>
                <h3>
                  <strong>{selectedData.soap_label}</strong>{" "}
                </h3>
              </div>
              <div className="infoImage">
                <img src={selectedData.image_url} alt="no img" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ background: "white" }}>
            <Button
              className="confirmDeleteBtn  mx-auto"
              variant="outline-danger"
              onClick={() => this.processDeleteCollection(selectedData)}
              style={{ fontFamily: "League Spartan" }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
