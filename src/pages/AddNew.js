import axios from "axios";
import React from "react";
import Swal from 'sweetalert2'



export default class AddNew extends React.Component {
  url = "https://project-2-soap.herokuapp.com/";

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
      show: "Irritable Skin",
      value: "irritable_skin",
    },
    {
      show: "Inflammation",
      value: "inflammation",
    },
    {
      show: "Skin Abrasion",
      value: "skin_abrasion",
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
    


    try {
      let res = await axios.post(this.url + "soap_listings", {
        name: this.state.newName,
        email: this.state.newEmail,
        contact_no: this.state.newContactNo,
        soap_label: this.state.newSoapLabel,
        image_url: this.state.newImageUrl,
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
       Swal.fire({
        fontFamily:"League Spartan",
        icon: 'success',
        title: 'Collection has been added',
        showConfirmButton: false,
        timer: 1700
      })

      this.props.goTo("search");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 406) {
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
          &nbsp;&nbsp;<input type="radio" name="newColor" value={eachOne.value} onChange={this.updateFormField} checked={this.state.newColor === eachOne.value} />
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



  render() {

    return (
      <React.Fragment>
        <div className="row d-flex col-sm col-md col-lg">
          <img className="addbg" src={require("../images/add_page_soap.jpg")} />
          <h2 className="title d-flex justify-content-center" style={{fontFamily:"League Spartan",marginTop:"30px"}}>Add New Soap</h2>
        </div>
        <div className="p-3 m-2 col-sm col-md col-lg">
          <div className="formNames row border border-dark border-2 m-2 rounded-3 p-4" style={{ backgroundColor: "white",fontFamily:"League Spartan",fontSize:"1.2rem" }}>
         

         
              <div className="infoPic mb-3">
                <label><strong>Image URL</strong></label>
                <div>
                  {this.state.newImageUrl !== "" && (
                    <img className="mb-2" src={this.state.newImageUrl} key={this.state.newImageUrl} alt="<No Image>" 
                    style={{ "max-width": "250px" }} 
                    />
                  )}
                </div>
                <input name="newImageUrl" type="text" placeholder="eg. https://cdn.pixabay.com/photo/2020/03/13/03/58/handmade-soap-4926841_960_720.jpg" value={this.state.newImageUrl} onChange={this.updateFormField} className="form-control" />
                {this.showError("image_url")}
              </div>
             
              <div className="mb-3">
                <label><strong>Soap Label</strong></label>
                <input
                  name="newSoapLabel"
                  type="text"
                  value={this.state.newSoapLabel}
                  placeholder="eg. Orange Fragrance"
                  onChange={this.updateFormField}
                  className="form-control"
                />
                {this.showError("soap_label")}
              </div>
           
              <div className="mb-3">
                <label><strong>Name</strong></label>
                <input name="newName" type="text" value={this.state.newName} placeholder="eg. James" onChange={this.updateFormField} className="form-control" />
                {this.showError("name")}
              </div>
              <div className="mb-3">
                <label><strong>Email</strong></label>
                <input name="newEmail" type="text" value={this.state.newEmail} placeholder="eg. james@hotmail.com.sg" onChange={this.updateFormField} className="form-control" />
                {this.showError("email")}
              </div>

              <div className="mb-3">
                <label><strong>Country Origin</strong></label>
                <select className="form-select form-control" name="newCountry" value={this.state.newCountry} onChange={this.updateFormField}>
                  <option key="placeholder" name="selectone" value="">
                    ---Select One---
                  </option>
                  {this.showCountries()}
                </select>
                {this.showError("country_origin")}
              </div>

              <div className="mb-3">
                <label><strong>Cost</strong></label>
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

              <div className="mb-3">
                <label><strong>Contact No</strong></label>
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

              <div className="mb-3">
                <label><strong>Recommended Use</strong></label>
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

  
              <div className="mb-3">
                <label><strong>Color</strong></label>
                {this.showColors()}
                {this.showError("color")}
              </div>

              <div className="mb-3">
                <label><strong>Skin Type</strong></label>
                {this.skinType.map((eachOne) => {
                  return (
                    <React.Fragment key={eachOne.value}>
                      &nbsp;&nbsp;<input
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

              <div className="mb-3">
                <label><strong>Treat</strong></label>
                {this.treat.map((eachOne) => {
                  return (
                    <React.Fragment key={eachOne.value}>
                      &nbsp;&nbsp;<input
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
              </div>

              <div className="mb-3">
                <label><strong>Oil Ingredients</strong></label>
                <div class="chipsWrapper" id="chipParent">
                  {this.state.oilIngredients.map((iType, i) => (
                    <>
                      <span key={`${iType}`} className="badge badge-pill bg-dark mx-1 mb-1">
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

              <div className="mb-3">
                <label><strong>Base Ingredients</strong></label>
                <div class="chipsWrapper" id="chipParent">
                  {this.state.baseIngredients.map((iType, i) => (
                    <>
                      <span key={`${iType}`} className="badge badge-pill bg-dark mx-1 mb-1">
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

              <div className="mb-3">
                <label><strong>Milk Ingredients</strong></label>
                <div class="chipsWrapper" id="chipParent">
                  {this.state.milkIngredients.map((iType, i) => (
                    <>
                      <span key={`${iType}`} className="badge badge-pill bg-dark mx-1 mb-1">
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
              <br/>     
              <div className="text-center ms-auto ">
              <a className="AddBtn btn btn-dark mt-5" style={{ color: "white" }} onClick={this.addNew}>
                Add
              </a>
            </div>
            </div>

        
       
          </div>
      </React.Fragment>
    );
  }
}
