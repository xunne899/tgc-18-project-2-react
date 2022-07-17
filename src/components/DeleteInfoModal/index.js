// import React from "react";
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class DeleteInfoModal extends React.Component {
  state = {
    collection: [],
  };

  processDeleteCollection = async (r) => {
    const url =
      "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/";

    let res = await axios.delete(url + `soap_listings/${r._id}`); // delete
    // await axios.delete(this.url + `soap_listings/${this.state.collection._id}`)
    //console.log(res);
    if (res.status == 200) {
      this.props.setIsViewVisible(false);
    }
    //this.props.goTo("collection");
  };

  render() {
    const { selectedData, isViewVisible, setIsViewVisible } = this.props;
    return (
      <React.Fragment>
        <Modal show={isViewVisible} onHide={setIsViewVisible}>
          <Modal.Header style={{ background: "#ebd8b8" }} closeButton>
            <Modal.Title>View</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "#ebd8b8" }}>
            <div className="infoTitle">{selectedData.soap_label}</div>
            <div className="infoPrice">${selectedData.cost}</div>
            <div className="infoWrapper">
              <div className="infoImage">
                <img src={selectedData.image_url} />
              </div>
              <div>Name :{selectedData.name}</div>
              <div>Email :{selectedData.email}</div>
              <div>Contact Number :{selectedData.contact_no}</div>
              <div>Color :{selectedData.color}</div>
              <div>Country Origin :{selectedData.country_origin}</div>
              <div>Skin Type :{selectedData.skin_type}</div>
              <div>
                Oil Ingredient :{selectedData.ingredients.oil_ingredient}
              </div>
              <div>
                Base Ingredient :{selectedData.ingredients.base_ingredient}
              </div>
              <div>
                Milk Ingredient :{selectedData.ingredients.milk_ingredient}
              </div>
              <div>
                Treat:
                {selectedData.suitability.treat.map((item) => (
                  <span className="badge rounded-pill bg-dark">{item}</span>
                ))}
              </div>
              <div>
                Recommended Usage:{selectedData.suitability.recommended_use}
              </div>
              <div>Date Posted:{selectedData.suitability.date_posted}</div>

              <h3 style={{ color: "red" }}>
                Confirm to delete ? {selectedData.soap_label}
              </h3>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ background: "#ebd8b8" }}>
            <Button
              variant="danger"
              onClick={() => this.processDeleteCollection(selectedData)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}