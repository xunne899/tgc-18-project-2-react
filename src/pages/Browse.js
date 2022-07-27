import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


import Accordion from "react-bootstrap/Accordion";

import InfoModal from "../components/InfoModal";
import EditInfoModal from "../components/InfoEditModal";
import DeleteInfoModal from "../components/DeleteInfoModal";
import Spinner from "../mainpage_components/Spinner";

export default class Browse extends React.Component {
  url = "https://project-2-soap.herokuapp.com/";

  state = {
    submitted: false,
    searchInput: "",
    searchCountry: "",
    collection: [],
    minprice: 0,
    maxprice: 1000,
    searchColor: "",
    searchSkin: [],
    searchOil: [],
    searchBase: [],
    searchMilk: [],
    selectedData: {},
    isViewVisible: false,
    isEditVisible: false,
    isDeleteVisible: false,
    contentLoaded: false,
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

  searchBarSoap = async () => {
    this.setState({
      submitted: true,
    });

    let query = "";
    
    const { searchInput, searchCountry, minprice, maxprice, searchSkin, searchColor, searchOil, searchBase, searchMilk } = this.state;
    let inserted = 0;
    if (searchInput !== "") {
      query += `search=${searchInput}`;
      inserted += 1;
    }

    if (searchCountry !== "") {
      if (inserted > 0) {
        query += "&";
      }
      query += `country_origin=${searchCountry}`;
      inserted += 1;
    }

    if (minprice >= 0  && maxprice > minprice) {
      if (inserted > 0) {
        query += "&";
      }
      query += `min_cost=${minprice}&max_cost=${maxprice}`;
      inserted += 1;
    }

    if (searchColor !== "") {
      if (inserted > 0) {
        query += "&";
      }
      query += `color=${searchColor}`;
      inserted += 1;
    }

    if (searchSkin.length > 0) {
      if (inserted > 0) {
        query += "&";
      }

      query += "skin_type[]=" + searchSkin.join("&skin_type[]=");
      inserted += 1;
    }

    if (searchOil.length > 0) {
      if (inserted > 0) {
        query += "&";
      }
      query += "oil_ingredient[]=" + searchOil.join("&oil_ingredient[]=");
      inserted += 1;
    }

    if (searchBase.length > 0) {
      if (inserted > 0) {
        query += "&";
      }
      query += "base_ingredient[]=" + searchBase.join("&base_ingredient[]=");
      inserted += 1;
    }

    if (searchMilk.length > 0) {
      if (inserted > 0) {
        query += "&";
      }
      query += "milk_ingredient[]=" + searchMilk.join("&milk_ingredient[]=");
      inserted += 1;
    }

    const response = await axios.get(this.url + "soap_listings?" + query);
    console.log(response);
    if (response.data && response.data.length > 0) {
      this.setState({
        collection: response.data,
      });
    } else {
      this.setState({
        collection: [],
      });
    }

  };

  updateSearchFormField = (i) => {
    this.setState({
      [i.target.name]: i.target.value,
    });
  };

  componentDidMount() {
    console.log("Soap listing did mount");
    this.getData();
  }


  getData = async () => {
    let response = await axios.get(this.url + "soap_listings");

    this.setState({
      collection: response.data,
      contentLoaded: true
    });
  };

  renderSpinner() {
    if (!this.state.contentLoaded) {
      return (
      <div className= "d-flex justify-content-center">
        <Spinner/>
      </div>
    )}
  }

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

  showColor = () => {
    let selectedColor = this.colors.map((eachOne) => {
      return (
        <option key={eachOne.value} value={eachOne.value}>
          {eachOne.show}
        </option>
      );
    });
    return selectedColor;
  };

  updateSkin = (evt) => {
    if (this.state.searchSkin.includes(evt.target.value)) {
      let clone = this.state.searchSkin.slice();

      let indexToRemove = this.state.searchSkin.findIndex(function (sk) {
        return sk === evt.target.value;
      });
      clone.splice(indexToRemove, 1);

      this.setState({
        searchSkin: clone,
      });
    } else {
      let clone = this.state.searchSkin.slice();

      clone.push(evt.target.value);

      this.setState({
        searchSkin: clone,
      });
    }
  };

  updateOil = (e) => {
    if (this.state.searchOil.includes(e.target.value)) {
      let clone = this.state.searchOil.slice();

      let indexToRemove = this.state.searchOil.findIndex(function (o) {
        return o === e.target.value;
      });
      clone.splice(indexToRemove, 1);

      this.setState({
        searchOil: clone,
      });
    } else {
      let clone = this.state.searchOil.slice();

      clone.push(e.target.value);

      this.setState({
        searchOil: clone,
      });
    }
  };

  updateBase = (e) => {
    if (this.state.searchBase.includes(e.target.value)) {
      let clone = this.state.searchBase.filter((v) => {
        return v !== e.target.value;
      });
      this.setState({
        searchBase: clone,
      });
    } else {
      const clone = [...this.state.searchBase];

      clone.push(e.target.value);

      this.setState({
        searchBase: clone,
      });
    }
  };

  updateMilk = (e) => {
    if (this.state.searchMilk.includes(e.target.value)) {
      let clone = this.state.searchMilk.filter((v) => {
        return v !== e.target.value;
      });
      this.setState({
        searchMilk: clone,
      });
    } else {
      const clone = [...this.state.searchMilk];

      clone.push(e.target.value);

      this.setState({
        searchMilk: clone,
      });
    }
  };

  view = (r) => {
    this.setState({ selectedData: r });
  };

  setIsEditViewVisible = () => {
    this.setState({
      isEditVisible: !this.state.isEditVisible,
    });

    if (this.state.submitted === true) {
      this.searchBarSoap();
    } else {
      this.getData();
    }
  };

  setIsViewVisible = () => {
    this.setState({
      isViewVisible: !this.state.isViewVisible,
    });
  };

  setIsDeleteViewVisible = () => {
    this.setState({
      isDeleteVisible: !this.state.isDeleteVisible,
    });

    if (this.state.submitted === true) {
      this.searchBarSoap();
    } else {
      this.getData();
    }
  };


  showMinPriceError = () => {
    let Minprice = parseInt(this.state.minprice);
    let Maxprice = parseInt(this.state.maxprice);

  
    if (Minprice < 0) {
      return "Please input a positive value";
    }
    if (Maxprice < Minprice) {
      return "MinPrice should not be more than MaxPrice";
    }
  };

  showMaxPriceError = () => {
    let Minprice = parseInt(this.state.minprice);
    let Maxprice = parseInt(this.state.maxprice);


    if (Maxprice < 0) {
      return "Please input a positive value";
    }
    if (Maxprice < Minprice) {
      return "MaxPrice should not be lesser than MinPrice";
    }
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.contentLoaded ? (this.renderSpinner()) : (<Container style={{ height: "100%", width: "100%" }}>
          <Row>
            <Col xs="12" className="mt-3 mx-auto">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Search</Accordion.Header>
                  <Accordion.Body>
                    <div className="row mt-1 p-2 col" style={{ fontFamily: "League Spartan" }}>
                      <div className="col-12 col-lg-6">
                        <label>
                          <strong>Search</strong>
                        </label>
                        <div>
                          <input value={this.state.searchInput} type="text" onChange={this.updateSearchFormField} className="form-control" name="searchInput" />
                        </div>
                        <div className="mt-2">
                          <label>
                            <strong>Country</strong>
                          </label>
                          <select
                            className="form-select form-control"
                            value={this.state.searchCountry}
                            onChange={this.updateSearchFormField}
                            name="searchCountry"
                          >
                            <option key="placeholder" name="selectone" value="">
                              Select One
                            </option>
                            {this.showCountries()}
                          </select>
                        </div>

                        <div className="mt-2">
                          <label>
                            <strong>Color</strong>
                          </label>
                          <select
                            className="form-select form-control"
                            value={this.state.searchColor}
                            onChange={this.updateSearchFormField}
                            name="searchColor"
                          >
                            <option key="placeholder" name="selectone" value="">
                              Select One
                            </option>
                            {this.showColor()}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 mt-3">
                        <label>
                          <strong>Cost</strong>
                        </label>
                        <div>
                          <label>
                            <strong>Min Amount</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="minprice"
                            value={this.state.minprice}
                            placeholder="Min"
                            onChange={this.updateSearchFormField}
                          />
                          {this.showMinPriceError() && this.state.submitted ? (
                            <div style={{ color: "red" }} className="error">
                              {this.showMinPriceError()}
                            </div>
                          ) : (
                            ""
                          )}
                          <label>
                            <strong>Max Amount</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="maxprice"
                            value={this.state.maxprice}
                            placeholder="Max"
                            onChange={this.updateSearchFormField}
                          />
                          {this.showMaxPriceError() && this.state.submitted ? (
                            <div style={{ color: "red" }} className="error">
                              {this.showMaxPriceError()}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="mt-3">
                          <label>
                            <strong>Skin Type</strong>
                          </label>
                          &nbsp;&nbsp;
                          <input
                            type="checkbox"
                            onChange={this.updateSkin}
                            className="form-check-input"
                            name="searchSkin"
                            value={"sensitive"}
                            checked={this.state.searchSkin.includes("sensitive")}
                          />
                          <label class="form-check-label">Sensitive</label>
                          &nbsp;&nbsp;
                          <input
                            type="checkbox"
                            onChange={this.updateSkin}
                            className="form-check-input"
                            name="searchSkin"
                            value={"oily"}
                            checked={this.state.searchSkin.includes("oily")}
                          />
                          <label class="form-check-label">Oily</label>
                          &nbsp;&nbsp;
                          <input
                            type="checkbox"
                            onChange={this.updateSkin}
                            className="form-check-input"
                            name="searchSkin"
                            value={"dry"}
                            checked={this.state.searchSkin.includes("dry")}
                          />
                          <label class="form-check-label">Dry</label>
                        </div>
                      </div>

                
                      <div className="text-center ms-auto">
                        <a className="AddBtn btn btn-dark mt-5" style={{ color: "white" }} onClick={this.searchBarSoap}>
                          Search
                        </a>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>

            <Col xs="12">
        
              <div className="m-4 d-flex justify-content-center" style={{ background: "white", height: "85%" }}>
     
                <div className="row  d-flex justify-content-center col-sm col-md col-lg">
                  {this.state.collection.length === 0 && <div className="noSearchLabel">No Results Found!</div>}
        
                  {this.state.collection.map((r) => (
                    <React.Fragment key={r._id}>
                      <div className="list-group-item  item rounded-3 m-4" style={{ background: "white" }}>
         
                        <h4 className="text-center" style={{ color: "black", fontFamily: "League Spartan" }}>
                          {r.soap_label}
                        </h4>
                        <a
                          className="deleteBtn "
                          style={{ textDecoration: "none", fontSize: "20px" }}
                          onClick={() => {
                            this.view(r);
                            this.setState({ isDeleteVisible: true });
                          }}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </a>
                        <div className="infoImage mx-auto m-2">
                          {" "}
                          <img style={{ width: "300px", height: "200px" }} src={r.image_url} alt="new" />
                        </div>

                        <div>
                          <span className="badge bg-dark mx-1" style={{ color: "white", fontFamily: "League Spartan" }}>
                            {r.country_origin}
                          </span>

                          <span className="badge bg-dark mx-1" style={{ color: "white", fontFamily: "League Spartan" }}>
                            ${r.cost}
                          </span>

                          <span className="badge mx-1" style={{ backgroundColor: "#ECECEC", color: "black", fontFamily: "League Spartan" }}>
                            {r.color}
                          </span>

                          {Object.keys(r.skin_type).map((i) => (
                            <span className="badge ms-1" style={{ backgroundColor: "#ECECEC", color: "black", fontFamily: "League Spartan" }} key={`${i}`}>
                              {" "}
                              {r.skin_type[i]}
                            </span>
                          ))}
                        </div>


                        <div className="d-flex justify-content-between gap-1 mt-4" style={{ fontFamily: "League Spartan" }}>
             
                          <button
                            className="btn  col d-flex  justify-content-center align-items-center"
                            style={{ height: "30px", backgroundColor: "#ECECEC", color: "black", fontSize: "15px" }}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isEditVisible: true });
                            }}
                          >
                            Edit
                          </button>

                        </div>

                        <button
                          className=" btn btn-dark mt-1 d-flex  justify-content-center align-items-center col-12"
                          style={{ height: "30px", color: "white", fontSize: "15px", fontFamily: "League Spartan" }}
                          onClick={() => {
                            this.view(r);
                            this.setState({ isViewVisible: true });
                          }}
                        >
                          More
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
             
                </div>
                {this.state.isEditVisible && (
                  <EditInfoModal
                    selectedID={this.state.selectedData._id}
                    isViewVisible={this.state.isEditVisible}
                    setIsViewVisible={this.setIsEditViewVisible}
                  />
                )}
                {this.state.isViewVisible && (
                  <InfoModal selectedData={this.state.selectedData} isViewVisible={this.state.isViewVisible} setIsViewVisible={this.setIsViewVisible} />
                )}

                {this.state.isDeleteVisible && (
                  <DeleteInfoModal
                    selectedData={this.state.selectedData}
                    isViewVisible={this.state.isDeleteVisible}
                    setIsViewVisible={this.setIsDeleteViewVisible}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>)}
  
      </React.Fragment>
    );
  }
}
