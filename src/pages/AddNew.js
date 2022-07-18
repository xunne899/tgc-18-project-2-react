import axios from "axios";
import React from "react";

// import Select from "react-select";

// const skinOptions = [
//   { value: "sensitive", label: "Sensitive" },
//   { value: "dry", label: "Dry" },
//   { value: "oily", label: "Oily" },
// ];

// import Select from 'react-select';

// import { Form, Container, Row, Button, Card, Col } from 'react-bootstrap';

export default class AddNew extends React.Component {
  url = "https://project-2-soap.herokuapp.com/";

  state = {
    newName: "",
    newEmail: "",
    newContactNo: "",
    newSoapLabel: "",
    newImageUrl: "",
    // newDescription:"",
    newColor: "",
    newCountry: "",
    newCost: 0,
    // barColor: '#FFAAAA',
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

    this.setState({
      errorMsg: {},
    });

    //let newSkinType = this.state.newSkinType.map(s=>s.value)
    // let newSkinType = this.state.selectedSkin.map((s) => s.value);
    // if (this.showNameError()===null && this.showEmailError()===null) {
    //   this.setState({
    //     submitted: true,
    //   });

    // }
    try {
      let res = await axios.post(this.url + "soap_listings", {
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

      this.props.goTo("collection");
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

  // rendering all selected colors == radiobutton
  showColors = () => {
    let radioColor = [];
    for (let eachOne of this.colors) {
      let selectedRb = (
        <React.Fragment key={eachOne.value}>
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
        <option key={eachOne.value} value={eachOne.value}>
          {eachOne.show}
        </option>
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

  // showNameError = () => {
  //   console.log(this.state.errorMsg);
  //   return this.state.errorMsg["name"];
    // if (this.state.newName.length < 3 && this.state.newName === "") {
    //   return "Name should have and input and should have more than 3 characters";
    // } else {
    //   return null;
    // }
    // if("name" in this.state.errorMsg){
    //   return "Name should have and input and should have more than 3 characters";
    // }
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

  //   showTreatError =()=>{

  // let result = Array.isArray(this.state.newTreat);
  // return result.includes() === ''? "At least one check box should be ticked" : null;
  //   }
  // clickBarColor = (ev)=>{
  //     this.setState({
  //         "barColor": ev.value
  //     })
  // }

  render() {
    // console.log(this.state);

    // const { selectedSkin } = this.state;
    return (
      <React.Fragment>
        <div className="row d-flex col-sm col-md col-lg">
          <img className="addbg" src={require("../coconutsoap.jpg")} />
        </div>
        <div className="p-3 mx-2 my-3 col-sm col-md col-lg">
          <div className="formNames row border border-dark border-2 m-2 rounded-3 p-3" style={{ backgroundColor: "#ebd8b8" }}>
            <h2 className="title d-flex justify-content-center">Add New Soap</h2>

            <div className="col-12 col-lg-4">
              <div>
                <label>Image URL</label>
                <div>
                  {this.state.newImageUrl !== "" && (
                    <img src={this.state.newImageUrl} key={this.state.newImageUrl} alt="<No Image>" style={{ "max-width": "100px" }} />
                  )}
                </div>
                <input name="newImageUrl" type="text" value={this.state.newImageUrl} onChange={this.updateFormField} className="form-control" />
                {this.showError("image_url")}
              </div>
              <div>
                <label>Soap Label</label>
                <input
                  name="newSoapLabel"
                  type="text"
                  value={this.state.newSoapLabel}
                  placeholder="Soap Name"
                  onChange={this.updateFormField}
                  className="form-control"
                />
                {this.showError("soap_label")}
              </div>
              <div>
                <label>Name</label>
                <input name="newName" type="text" value={this.state.newName} placeholder="Name" onChange={this.updateFormField} className="form-control" />
                {this.showError("name")}
              </div>
              <div>
                <label>Email</label>
                <input name="newEmail" type="text" value={this.state.newEmail} placeholder="Email" onChange={this.updateFormField} className="form-control" />
                {this.showError("email")}
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div>
                <label>Country Origin</label>
                <select className="form-select form-control" name="newCountry" value={this.state.newCountry} onChange={this.updateFormField}>
                  <option key="placeholder" name="selectone">
                    ---Select One---
                  </option>
                  {this.showCountries()}
                </select>
                {this.showError("country_origin")}
              </div>

              <div>
                <label>Cost</label>
                <input
                  name="newCost"
                  type="number"
                  value={parseInt(this.state.newCost)}
                  placeholder="Cost"
                  onChange={this.updateFormField}
                  className="form-control"
                />
                {this.showError("cost")}
              </div>
              <div>
                <label>Contact No</label>
                <input
                  name="newContactNo"
                  type="text"
                  value={this.state.newContactNo}
                  placeholder="e.g. 99898989"
                  onChange={this.updateFormField}
                  className="form-control"
                />
                {this.showError("contact_no")}
              </div>
              <div>
                <label>Recommended Use</label>
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
            </div>

            <div className="col-12 col-lg-4">
              <div>
                <label>Color</label>
                {/* <div><input type="color" value={this.state.barColor} onChange={this.clickBarColor}/></div> */}
                {this.showColors()}
                {this.showError("color")}
              </div>
              <div>
                <label>Skin Type</label>
                {this.skinType.map((eachOne) => {
                  return (
                    <React.Fragment key={eachOne.value}>
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
              <div>
                <label>Treat</label>
                {this.treat.map((eachOne) => {
                  return (
                    <React.Fragment key={eachOne.value}>
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
              <div>
                <label>Oil Ingredients</label>
                <div class="chipsWrapper" id="chipParent">
                  {this.state.oilIngredients.map((iType, i) => (
                    <>
                      <span key={`${iType}`} className="badge badge-pill bg-dark mx-1">
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
                  placeholder="eg.butter oil <Enter to add>"
                  value={this.state.oilInput}
                  onKeyDown={this.updateOilIngredients}
                  onChange={this.updateFormField}
                />
                {this.showError("oil_ingredient")}
              </div>

              <div>
                <label>Base Ingredients</label>
                <div class="chipsWrapper" id="chipParent">
                  {this.state.baseIngredients.map((iType, i) => (
                    <>
                      <span key={`${iType}`} className="badge badge-pill bg-dark mx-1">
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
                  placeholder="eg.tomato powder <Enter to add>"
                  value={this.state.baseInput}
                  onKeyDown={this.updateBaseIngredients}
                  onChange={this.updateFormField}
                />
                {this.showError("base_ingredient")}
              </div>

              <div>
                <label>Milk Ingredients</label>
                <div class="chipsWrapper" id="chipParent">
                  {this.state.milkIngredients.map((iType, i) => (
                    <>
                      <span key={`${iType}`} className="badge badge-pill bg-dark mx-1">
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
            </div>

            <br />
            <br />
            <div className="text-center ms-auto">
              <a className="AddBtn btn btn-dark m-3" style={{ color: "#ebd8b8" }} onClick={this.addNew}>
                Add
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
