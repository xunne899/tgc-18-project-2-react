import React, { useState } from "react";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default class EditInfoModal extends React.Component {
  state = {
    newName: "",
    newEmail: "",
    newContactNo: "",
    newSoapLabel: "",
    newImageUrl: "",
    newColor: "",
    newCountry: "",
    newCost: 0,
    newSkinType: [],
    oilInput: "",
    oilIngredients: [],
    baseInput: "",
    baseIngredients: [],
    milkInput: "",
    milkIngredients: [],
    newTreat: [],
    newRecommended: "",
    newDate: "",
    submitted: false,
    selectedSkin: null,
    errorMsg: {},
  };

  componentDidMount() {
    console.log("Edit Modal showing");

    this.getSingleData();
    // const { selectedData } = this.props;
    // console.log(selectedData);
    // this.setState({
    //   newName: selectedData.name,
    //   newEmail: selectedData.email,
    //   newContactNo: selectedData.contact_no,
    //   newSoapLabel: selectedData.soap_label,
    //   newImageUrl: selectedData.image_url,
    //   newColor: selectedData.color,
    //   newCountry: selectedData.country_origin,
    //   newCost: selectedData.cost,
    //   newSkinType: selectedData.skin_type,
    //   oilIngredients: selectedData.ingredients.oil_ingredient,
    //   baseIngredients: selectedData.ingredients.base_ingredient,
    //   milkIngredients: selectedData.ingredients.milk_ingredient,
    //   newTreat: selectedData.suitability.treat,
    //   newRecommended: selectedData.suitability.recommended_use,
    // });

    console.log(this.state);
  }

  getSingleData = async () => {
    const url = "https://project-2-soap.herokuapp.com/";
    const { selectedID } = this.props;
    try {
      let res = await axios.get(url + "soap_listings/" + selectedID);

      console.log(res);
      if (res.status == 200) {
        //res.data;
        this.setState({
          newName: res.data.name,
          newEmail: res.data.email,
          newContactNo: res.data.contact_no,
          newSoapLabel: res.data.soap_label,
          newImageUrl: res.data.image_url,
          newColor: res.data.color,
          newCountry: res.data.country_origin,
          newCost: res.data.cost,
          newSkinType: res.data.skin_type,
          oilIngredients: res.data.ingredients.oil_ingredient,
          baseIngredients: res.data.ingredients.base_ingredient,
          milkIngredients: res.data.ingredients.milk_ingredient,
          newTreat: res.data.suitability.treat,
          newRecommended: res.data.suitability.recommended_use,
        });
      }
    } catch (e) {
      // error hnadling
      console.log(e);
    }
  };

  handleChange = (selectedSkin) => {
    this.setState({ selectedSkin });
    console.log(`Option selected:`, selectedSkin);
  };

  colors = [
    {
      show: "Green",
      value: "green",
    },
    {
      show: "Blue",
      value: "blue",
    },
    {
      show: "Red",
      value: "red",
    },
    {
      show: "Yellow",
      value: "yellow",
    },
    {
      show: "Orange",
      value: "orange",
    },
  ];

  countries = [
    {
      show: "Germany",
      value: "germany",
    },
    {
      show: "Russia",
      value: "russia",
    },
    {
      show: "Italy",
      value: "italy",
    },
    {
      show: "Uk",
      value: "uk",
    },
    {
      show: "Japan",
      value: "japan",
    },
    {
      show: "South Korea",
      value: "southkorea",
    },
    {
      show: "France",
      value: "france",
    },
    {
      show: "Singapore",
      value: "singapore",
    },
  ];

  skinType = [
    {
      show: "Sensitive",
      value: "sensitive",
    },
    {
      show: "Dry",
      value: "dry",
    },
    {
      show: "Oily",
      value: "oily",
    },
  ];

  treat = [
    {
      show: "Irritable skin",
      value: "irritable_skin",
    },
    {
      show: "Inflammation",
      value: "inflammation",
    },
    {
      show: "Skin Abrasion",
      value: "skin_Abrasion",
    },
    {
      show: "Skin Cuts",
      value: "skin_cut",
    },
  ];

  updateFormField = (i) => {
    this.setState({
      [i.target.name]: i.target.value,
    });
  };

  addNew = async () => {
    this.setState({
      submitted: true,
    });
  };
  // rendering all selected colors == radiobutton
  showColors = () => {
    let radioColor = [];
    for (let eachOne of this.colors) {
      let selectedRb = (
        <React.Fragment key={eachOne.value}>
          &nbsp;&nbsp;
          <input type="radio" name="newColor" value={eachOne.value} onChange={this.updateFormField} checked={this.state.newColor === eachOne.value} />
          <span>{eachOne.show}</span>
        </React.Fragment>
      );

      radioColor.push(selectedRb);
    }
    return radioColor;
  };

  // rendering all selected countries == dropdown
  showCountries = () => {
    let selectedCountry = this.countries.map((eachOne) => {
      return (
        <React.Fragment>
          &nbsp;&nbsp;
          <option key={eachOne.value} value={eachOne.value}>
            {eachOne.show}
          </option>
        </React.Fragment>
      );
    });
    return selectedCountry;
  };

  // let ingredientInfo = i.target.value.split(",");
  // let oilList = []
  // for(let word of ingredientInfo){
  //     oilList.push(word.strip().trim());
  // }

  // let cloned = [...this.state.oilIngredients, ...oilList];
  // console.log("oilList: ",oilList);
  // this.setState({
  //     'oilIngredients':cloned
  // })

  showSkin = (e) => {
    if (this.state.newSkinType.includes(e.target.value)) {
      let indexToRemove = this.state.newSkinType.findIndex((eachOne) => {
        return eachOne === e.target.value;
      });

      let cloned = [...this.state.newSkinType.slice(0, indexToRemove), ...this.state.newSkinType.slice(indexToRemove + 1)];
      this.setState({
        newSkinType: cloned,
      });
    } else {
      let cloned = [...this.state.newSkinType, e.target.value];
      this.setState({
        newSkinType: cloned,
      });
    }
  };

  removeOilTag = (i) => {
    let oilTagList = [...this.state.oilIngredients.slice(0, i), ...this.state.oilIngredients.slice(i + 1)];
    this.setState({ oilIngredients: oilTagList });
  };

  updateOilIngredients = (i) => {
    let key = i.key;
    let code = i.code;
    let value = i.target.value;
    if ((key === "Enter" || code === "Enter") && value.trim() !== "") {
      console.log(this.state.oilIngredients);
      const testList = [...this.state.oilIngredients];
      testList.push(value.trim());
      console.log(i);
      console.log(testList);
      this.setState({ oilIngredients: testList });
      this.setState({ oilInput: "" });
    }
  };

  removeBaseTag = (i) => {
    let baseTagList = [...this.state.baseIngredients.slice(0, i), ...this.state.baseIngredients.slice(i + 1)];
    this.setState({ baseIngredients: baseTagList });
  };

  updateBaseIngredients = (i) => {
    let key = i.key;
    let code = i.code;
    let value = i.target.value;
    if ((key === "Enter" || code === "Enter") && value.trim() !== "") {
      console.log(this.state.baseIngredients);
      const testList = [...this.state.baseIngredients];
      testList.push(value.trim());
      console.log(i);
      console.log(testList);
      this.setState({ baseIngredients: testList });
      this.setState({ baseInput: "" });
    }
  };

  removeMilkTag = (i) => {
    let milkTagList = [...this.state.milkIngredients.slice(0, i), ...this.state.milkIngredients.slice(i + 1)];
    this.setState({ milkIngredients: milkTagList });
  };

  updateMilkIngredients = (i) => {
    let key = i.key;
    let code = i.code;
    let value = i.target.value;
    if ((key === "Enter" || code === "Enter") && value.trim() !== "") {
      console.log(this.state.milkIngredients);
      const testList = [...this.state.milkIngredients];
      testList.push(value.trim());
      console.log(i);
      console.log(testList);
      this.setState({ milkIngredients: testList });
      this.setState({ milkInput: "" });
    }
  };

  showTreatment = (e) => {
    if (this.state.newTreat.includes(e.target.value)) {
      let indexToRemove = this.state.newTreat.findIndex((eachOne) => {
        return eachOne === e.target.value;
      });

      let cloned = [...this.state.newTreat.slice(0, indexToRemove), ...this.state.newTreat.slice(indexToRemove + 1)];
      this.setState({
        newTreat: cloned,
      });
    } else {
      let cloned = [...this.state.newTreat, e.target.value];
      this.setState({
        newTreat: cloned,
      });
    }
  };

  showError = (fieldName) => {
    return (
      this.state.errorMsg[fieldName] &&
      this.state.submitted &&
      this.state.errorMsg[fieldName].map((msg, index) => (
        <div style={{ color: "red" }} key={index} className="error">
          {msg}
        </div>
      ))
    );
  };

  // showNameError = () => {
  //   if (this.state.newName.length < 3 && this.state.newName === "") {
  //     return "Name should have and input and should have more than 3 characters";
  //   } else {
  //     return null;
  //   }
  // };

  // showEmailError = () => {
  //   let email = this.state.newEmail.includes("@");
  //   return !email ? "Email error.Please try again" : null;
  // };
  // showContactError = () => {
  //   let contact = this.state.newContactNo.length;
  //   return contact < 3 ? "Contact should have more than 3 numbers" : null;
  // };
  // showLabelError = () => {
  //   let label = this.state.newSoapLabel.length;
  //   return label < 3 ? "Soap Label should have more than 3 characters" : null;
  // };

  // showImageError = () => {
  //   let inputlength = this.state.newImageUrl.length;
  //   return inputlength < 3 ? "Input should have more than 3 characters" : null;
  // };
  handlePutSoapData = async () => {
    this.setState({
      submitted: true,
    });

    this.setState({
      errorMsg: {},
    });
    const { selectedID } = this.props;
    const url = "https://project-2-soap.herokuapp.com/";
    try {
      let res = await axios.put(url + "soap_listings/" + selectedID, {
        // {

        name: this.state.newName,
        email: this.state.newEmail,
        contact_no: this.state.newContactNo,
        soap_label: this.state.newSoapLabel,
        image_url: this.state.newImageUrl,
        // description:this.state.newDescription,
        color: this.state.newColor,
        country_origin: this.state.newCountry,
        cost: parseInt(this.state.newCost),
        skin_type: this.state.newSkinType,
        ingredients: {
          oil_ingredient: this.state.oilIngredients,
          base_ingredient: this.state.baseIngredients,
          milk_ingredient: this.state.milkIngredients,
        },
        suitability: {
          treat: this.state.newTreat,
          recommended_use: this.state.newRecommended,
          date_posted: new Date().getTime(),
        },
      });
      console.log("Response=>", res);
      if (res.status == 200) {
        this.props.setIsViewVisible(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status == 406) {
        this.setState({
          errorMsg: err.response.data.Errors,
        });
      } else {
        alert("We are facing issue with our services, try again later.");
      }
    }
  };
  render() {
    const { selectedData, isViewVisible, setIsViewVisible } = this.props;
    return (
      <div classname="d-flex justify-content-center">
        <Modal size="lg" show={isViewVisible} onHide={setIsViewVisible}>
          <div classname="d-flex justify-content-center">
            {/* <div style={{ width:"800px", alignContent:"center"}}> */}
            <Modal.Header style={{ background: "white" }} closeButton>
              <Modal.Title style={{ fontFamily: "League Spartan" }}>View</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ background: "white" }}>
              <div className="p-3 col-sm col-md col-lg">
                <div className="formNames row border border-dark border-2 m-2 rounded-3 p-3" style={{ backgroundColor: "white" }}>
                  <h2 className="title d-flex justify-content-center">Update Soap</h2>

                  {/* <div className="col-12 col-lg-4"> */}
                  <div>
                    <label>
                      <strong>Image URL</strong>
                    </label>
                    <div className="infoPic">
                      {this.state.newImageUrl !== "" && (
                        <img className="mb-2" src={this.state.newImageUrl} key={this.state.newImageUrl} alt="<No Image>" style={{ "max-width": "200px" }} />
                      )}
                    </div>
                    <input
                      name="newImageUrl"
                      placeholder="eg. https://cdn.pixabay.com/photo/2020/03/13/03/58/handmade-soap-4926841_960_720.jpg"
                      type="text"
                      value={this.state.newImageUrl}
                      onChange={this.updateFormField}
                      className="form-control"
                    />
                    {this.showError("image_url")}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Soap Label</strong>
                    </label>
                    <input
                      name="newSoapLabel"
                      type="text"
                      value={this.state.newSoapLabel}
                      placeholder="eg. Rose Fragrance"
                      onChange={this.updateFormField}
                      className="form-control"
                    />
                    {this.showError("soap_label")}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Name</strong>
                    </label>
                    <input name="newName" type="text" value={this.state.newName} placeholder="eg. James" onChange={this.updateFormField} className="form-control" />
                    {this.showError("name")}
                  </div>

                  <div className="mt-2">
                    <label>
                      <strong>Email</strong>
                    </label>
                    <input
                      name="newEmail"
                      type="text"
                      value={this.state.newEmail}
                      placeholder="eg. james@hotmail.com.sg"
                      onChange={this.updateFormField}
                      className="form-control"
                    />
                    {this.showError("email")}
                  </div>
                  {/* </div> */}

                  {/* <div className="col-12 col-lg-4"> */}
                  <div className="mt-2">
                    <label>
                      <strong>Country Origin</strong>
                    </label>
                    <select className="form-select form-control" name="newCountry" value={this.state.newCountry} onChange={this.updateFormField}>
                      <option key="placeholder" name="selectone" value="">
                        ---Select One---
                      </option>
                      {this.showCountries()}
                    </select>
                    {this.showError("country_origin")}
                  </div>

                  <div className="mt-2">
                    <label>
                      <strong>Cost</strong>
                    </label>
                    <input
                      name="newCost"
                      type="number"
                      value={parseInt(this.state.newCost)}
                      placeholder="eg. 20"
                      onChange={this.updateFormField}
                      className="form-control"
                    />
                    {this.showError("cost")}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Contact No</strong>
                    </label>
                    <input
                      name="newContactNo"
                      type="text"
                      value={this.state.newContactNo}
                      placeholder="eg. 99898989"
                      onChange={this.updateFormField}
                      className="form-control"
                    />
                    {this.showError("contact_no")}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Recommended Use</strong>
                    </label>
                    <input
                      name="newRecommended"
                      type="text"
                      value={this.state.newRecommended}
                      placeholder="eg. Use 4 times in a week"
                      onChange={this.updateFormField}
                      className="form-control"
                    />
                    {this.showError("recommended_use")}
                  </div>

                  {/* <div >
                            <label>Date Posted</label>
                            <input name="newDate" type="text" value={this.state.newDate}
                                placeholder="DD-MM-YYYY"
                                onChange={this.updateFormField}
                                className="form-control" />
                        </div> */}
                  {/* </div> */}
                  {/* 
                  <div className="col-12 col-lg-4"> */}
                  <div className="mt-2">
                    <label>
                      <strong>Color</strong>
                    </label>
                    {/* <div><input type="color" value={this.state.barColor} onChange={this.clickBarColor}/></div> */}

                    {this.showColors()}
                    {this.showError("color")}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Skin Type</strong>
                    </label>
                    {this.skinType.map((eachOne) => {
                      return (
                        <React.Fragment key={eachOne.value}>
                          &nbsp;&nbsp;
                          <input
                            type="checkbox"
                            name="newSkinType"
                            value={eachOne.value}
                            onChange={this.showSkin}
                            checked={this.state.newSkinType.includes(eachOne.value)}
                          />
                          <span>{eachOne.show}</span>
                        </React.Fragment>
                      );
                    })}
                    {this.showError("skin_type")}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Treat</strong>
                    </label>
                    {this.treat.map((eachOne) => {
                      return (
                        <React.Fragment key={eachOne.value}>
                          &nbsp;&nbsp;
                          <input
                            type="checkbox"
                            name="newTreat"
                            value={eachOne.value}
                            placeholder="eg. Irritable skin"
                            onChange={this.showTreatment}
                            checked={this.state.newTreat.includes(eachOne.value)}
                          />
                          <span>{eachOne.show}</span>
                        </React.Fragment>
                      );
                    })}
                    {this.showError("treat")}
                    {/* {this.showTreatError() && this.state.submitted ? (
                  <div style={{ color: "red" }} className="error">
                    {this.showTreatError()}
                  </div>
                ) : (
                  ""
                )} */}
                  </div>
                  <div className="mt-2">
                    <label>
                      <strong>Oil Ingredients</strong>
                    </label>
                    <div class="chipsWrapper" id="chipParent">
                      {this.state.oilIngredients.map((iType, i) => (
                        <>
                          <span key={`${iType}`} className="badge badge-pill bg-dark m-1">
                            {iType}
                            <span onClick={() => this.removeOilTag(i)} style={{ marginLeft: "5px" }}>
                              X
                            </span>
                          </span>
                        </>
                      ))}
                    </div>
                    <input
                      type="text"
                      name="oilInput"
                      className="form-control"
                      placeholder="eg. butter oil <Enter to add>"
                      value={this.state.oilInput}
                      onKeyDown={this.updateOilIngredients}
                      onChange={this.updateFormField}
                    />
                    {this.showError("oil_ingredient")}
                  </div>

                  <div className="mt-2">
                    <label>
                      <strong>Base Ingredients</strong>
                    </label>
                    <div class="chipsWrapper" id="chipParent">
                      {this.state.baseIngredients.map((iType, i) => (
                        <>
                          <span key={`${iType}`} className="badge badge-pill bg-dark m-1">
                            {iType}
                            <span onClick={() => this.removeBaseTag(i)} style={{ marginLeft: "5px" }}>
                              X
                            </span>
                          </span>
                        </>
                      ))}
                    </div>
                    <input
                      type="text"
                      name="baseInput"
                      className="form-control"
                      placeholder="eg. tomato powder <Enter to add>"
                      value={this.state.baseInput}
                      onKeyDown={this.updateBaseIngredients}
                      onChange={this.updateFormField}
                    />
                    {this.showError("base_ingredient")}
                  </div>

                  <div className="mt-2">
                    <label>
                      <strong>Milk Ingredients</strong>
                    </label>
                    <div class="chipsWrapper" id="chipParent">
                      {this.state.milkIngredients.map((iType, i) => (
                        <>
                          <span key={`${iType}`} className="badge badge-pill bg-dark m-1">
                            {iType}
                            <span onClick={() => this.removeMilkTag(i)} style={{ marginLeft: "5px" }}>
                              X
                            </span>
                          </span>
                        </>
                      ))}
                    </div>
                    <input
                      type="text"
                      name="milkInput"
                      className="form-control"
                      placeholder="eg. goat milk <Enter to add>"
                      value={this.state.milkInput}
                      onKeyDown={this.updateMilkIngredients}
                      onChange={this.updateFormField}
                    />
                    {this.showError("milk_ingredient")}
                  </div>
                  {/* <div>
                <label>Skin Type</label>
                <Select
                  isMulti={true}
                  value={this.state.selectedSkin}
                  onChange={this.handleChange}
                  options={skinOptions}
                />
              </div> */}
                  {/* </div> */}

                  <br />
                  <br />
                  <div className="text-center ms-auto">
                    <a className="AddBtn btn btn-dark mt-5" style={{ color: "white" }} onClick={this.handlePutSoapData}>
                      Update
                    </a>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ background: "white" }}></Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}
