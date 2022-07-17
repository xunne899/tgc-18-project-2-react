import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Container, Row, Button, Card, Col } from 'react-bootstrap';

import InfoModal from "../components/InfoModal";
import EditInfoModal from "../components/InfoEditModal";
import DeleteInfoModal from "../components/DeleteInfoModal";

export default class Browse extends React.Component {
  url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/";

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
    // add here
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

    if (minprice >= 0 && maxprice > minprice) {
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

      query +="skin_type[]="+ searchSkin.join("&skin_type[]=");
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
    }
    //this.props.goTo("browse");
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
    // let temp = [...this.state.collection]
    // temp = response.data
    // console.log("get soap listings=>", response)
    this.setState({
      collection: response.data,
    });
  };
  //

  // state = {
  //     full_collection: [],
  //     collection: []
  // }

  // async componentDidMount() {
  //     console.log("Soap listing did mount");
  //     let response = await axios.get(this.url + 'soap_listings')
  //     this.setState({
  //         full_collection: response.data,
  //         collection: response.data,
  //     })

  //     let filterCollection = []
  //     console.log(response.data)
  //     for(let data of response.data){
  //         for(let soapColor of data.color){
  //             if(soapColor.includes("blue")){
  //                 filterCollection.push(data);
  //             }

  //             continue;
  //         }

  //         if(data.soap_label.includes("vanilla")){
  //             filterCollection.push(data);
  //             continue;
  //         }
  //     }
  //     console.log("filtered lst: ", filterCollection)

  //     this.setState({
  //         collection: filterCollection
  //     })
  // }
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

    this.getData();
  };

  setIsViewVisible = () => {
    this.setState({
      isViewVisible: !this.state.isViewVisible,
    });

    this.getData();
  };

  setIsDeleteViewVisible = () => {
    this.setState({
      isDeleteVisible: !this.state.isDeleteVisible,
    });

    this.getData();
  };



  showSearchError = () => {
    let search = this.state.searchInput.length;
    return search <= 0 ? "Please input a value" : null;
  };
  showMinPriceError = () => {
    let Minprice = this.state.minprice;
    return Minprice < 0 ? "Please input a positive value" : null;
  };
  showMaxPriceError = () => {
    let Maxprice = this.state.maxprice;
    return Maxprice < 0 ? "Please input a positive value" : null;
  };

  render() {
    return (
      <React.Fragment>
        <Container style={{ margin: "10px 0px", height: "95%", width: "100%" }}>
          <Row>
            <Col xs="12" lg="3">
              <div className="m-3  p-3">
                <label>Search</label>
                <div>
                  <input
                    type="text"
                    onChange={this.updateSearchFormField}
                    className="form-control"
                    name="searchInput"
                    // style={{ width: "240px",height:"30px" }}
                  />
                         {this.showSearchError() && this.state.submitted ? (
                    <div style={{ color: "red" }} className="error">
                      {this.showSearchError()}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  <label>Country:</label>
                  <select
                    className="form-select form-control"
                    value={this.state.searchCountry}
                    onChange={this.updateSearchFormField}
                    name="searchCountry"
                    // name="country" value={this.state.country} onChange={this.updateFormField}
                  >
                    <option key="placeholder" name="selectone" value="">
                      ---Select One---
                    </option>
                    {this.showCountries()}
                  </select>
                </div>

                <div>
                  <label>Color:</label>
                  <select
                    className="form-select form-control"
                    value={this.state.searchColor}
                    onChange={this.updateSearchFormField}
                    name="searchColor"
                    // name="country" value={this.state.country} onChange={this.updateFormField}
                  >
                    <option key="placeholder" name="selectone">
                      ---Select One---
                    </option>
                    {this.showColor()}
                  </select>
                </div>
                {/* <div>
                  <label>Color</label>
                  <input
                    type="radio"
                    onChange={this.updateSearchFormField}
                    className="form-check-input"
                    name="searchColor"
                    value="green"
                    checked={this.state.searchColor === "green"}
                  />
                  <label class="form-check-label">Green</label>

                  <input
                    type="radio"
                    onChange={this.updateSearchFormField}
                    className="form-check-input"
                    name="searchColor"
                    value="blue"
                    checked={this.state.searchColor === "blue"}
                  />
                  <label class="form-check-label">Blue</label>
                  <input
                    type="radio"
                    onChange={this.updateSearchFormField}
                    className="form-check-input"
                    name="searchColor"
                    value="red"
                    checked={this.state.searchColor === "red"}
                  />
                  <label class="form-check-label">Red</label>
                  <input
                    type="radio"
                    onChange={this.updateSearchFormField}
                    className="form-check-input"
                    name="searchColor"
                    value="yellow"
                    checked={this.state.searchColor === "yellow"}
                  />
                  <label class="form-check-label">Yellow</label>

                  <input
                    type="radio"
                    onChange={this.updateSearchFormField}
                    className="form-check-input"
                    name="searchColor"
                    value="orange"
                    checked={this.state.searchColor === "orange"}
                  />
                  <label class="form-check-label">Orange</label>
                </div> */}
                <div>
                  <label>Cost</label>
                  <div>
                    <label>Min Amount</label>
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
                    <label>Max Amount</label>
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
                </div>
                <div>
                  <label>Skin Type</label>
                  <input
                    type="checkbox"
                    onChange={this.updateSkin}
                    className="form-check-input"
                    name="searchSkin"
                    value={"sensitive"}
                    checked={this.state.searchSkin.includes("sensitive")}
                  />
                  <label class="form-check-label">Sensitive</label>

                  <input
                    type="checkbox"
                    onChange={this.updateSkin}
                    className="form-check-input"
                    name="searchSkin"
                    value={"oily"}
                    checked={this.state.searchSkin.includes("oily")}
                  />
                  <label class="form-check-label">Oily</label>

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

                <div>
                  <label>Oil Ingredients</label>
                  <input
                    type="checkbox"
                    onChange={this.updateOil}
                    className="form-check-input"
                    name="searchOil"
                    value={"coconut oil"}
                    checked={this.state.searchOil.includes("coconut oil")}
                  />
                  <label class="form-check-label">Coconut oil</label>
                  <input
                    type="checkbox"
                    onChange={this.updateOil}
                    className="form-check-input"
                    name="searchOil"
                    value={"butter oil"}
                    checked={this.state.searchOil.includes("butter oil")}
                  />
                  <label class="form-check-label">Butter oil</label>
                  <input
                    type="checkbox"
                    onChange={this.updateOil}
                    className="form-check-input"
                    name="searchOil"
                    value={"grapeseed oil"}
                    checked={this.state.searchOil.includes("grapeseed oil")}
                  />
                  <label class="form-check-label">Grapeseed oil</label>
                </div>
                <div>
                  <label>Base Ingredients</label>
                  <input
                    type="checkbox"
                    onChange={this.updateBase}
                    className="form-check-input"
                    name="searchBase"
                    value={"mugwort powder"}
                    checked={this.state.searchBase.includes("mugwort powder")}
                  />
                  <label class="form-check-label">Mugwort Powder</label>
                  <input
                    type="checkbox"
                    onChange={this.updateBase}
                    className="form-check-input"
                    name="searchBase"
                    value={"tomato powder"}
                    checked={this.state.searchBase.includes("tomato powder")}
                  />
                  <label class="form-check-label">Tomato Powder</label>
                  <input
                    type="checkbox"
                    onChange={this.updateBase}
                    className="form-check-input"
                    name="searchBase"
                    value={"tumeric powder"}
                    checked={this.state.searchBase.includes("tumeric powder")}
                  />
                  <label class="form-check-label">Tumeric Powder</label>
                </div>
                <div>
                  <label>Milk Ingredients</label>
                  <input
                    type="checkbox"
                    onChange={this.updateMilk}
                    className="form-check-input"
                    name="searchMilk"
                    value={"butter milk"}
                    checked={this.state.searchMilk.includes("butter milk")}
                  />
                  <label class="form-check-label">Butter Milk</label>
                  <input
                    type="checkbox"
                    onChange={this.updateMilk}
                    className="form-check-input"
                    name="searchMilk"
                    value={"oatmeal milk"}
                    checked={this.state.searchMilk.includes("oatmeal milk")}
                  />
                  <label class="form-check-label">Oatmeal Milk</label>
                  <input
                    type="checkbox"
                    onChange={this.updateMilk}
                    className="form-check-input"
                    name="searchMilk"
                    value={"goat milk"}
                    checked={this.state.searchMilk.includes("goat milk")}
                  />
                  <label class="form-check-label">Goat Milk</label>
                </div>
                <div className="text-center ms-auto">
                  <a className="AddBtn btn btn-dark m-3" style={{ color: "#ebd8b8" }} onClick={this.searchBarSoap}>
                    Search
                  </a>
                </div>
              </div>
            </Col>
            <Col xs="12" lg="9">
              {/* search results */}

              <div className=" mt-3 " style={{ background: "#ebd8b8", height: "95%" }}>
                {/* <h1 className="AddForm">All Collections</h1> */}
                <div className="row justify-content-center col-sm col-md col-lg">
                  {/* <ul className="list-group  item"> */}
                  {this.state.collection.map((r) => (
                    <React.Fragment key={r._id}>
                      <li className="list-group-item  item  rounded-3 m-3" style={{ background: "#ebd8b8" }}>
                        <span className=" mx-1">
                          {" "}
                          <img style={{ height: "250px", width: "350px" }} src={r.image_url} alt="new" />
                        </span>
                        <div>
                          <strong>Soap Name: </strong>
                          <span className="badge rounded-pill bg-dark mx-1" style={{ color: "#ebd8b8" }}>
                            {r.soap_label}
                          </span>
                        </div>
                        <div>
                          <strong>Country Origin: </strong>
                          <span className="badge rounded-pill bg-dark mx-1" style={{ color: "#ebd8b8" }}>
                            {r.country_origin}
                          </span>
                        </div>
                        <div>
                          <strong>Color: </strong>
                          <span className="badge rounded-pill bg-dark mx-1" style={{ color: "#ebd8b8" }}>
                            {r.color}
                          </span>
                        </div>

                        {/* <div>Skin_Type:
                                    {
                                        r.skin_type.map(i => 
                                           <span key={i} className="badge rounded-pill bg-primary mx-1">{i}
                                        </span>)
                                    }
                                    </div> */}

                        <div>
                          <strong>Skin_Type:</strong>
                          {Object.keys(r.skin_type).map((i) => (
                            <span className="badge rounded-pill bg-dark" style={{ color: "#ebd8b8" }} key={`${i}`}>
                              {" "}
                              {r.skin_type[i]}
                            </span>
                          ))}
                        </div>
                        <div>
                          <strong>Treat:</strong>
                          {Object.keys(r.suitability.treat).map((i) => (
                            <span className="badge rounded-pill bg-dark" style={{ color: "#ebd8b8" }} key={`${i}`}>
                              {" "}
                              {r.suitability.treat[i]}
                            </span>
                          ))}
                        </div>
                        {Object.keys(r.ingredients).map((iType) => (
                          <>
                            {console.log("data=>", iType)}
                            <div>
                              <strong>Ingredients: {iType}</strong>
                            </div>

                            {r.ingredients[iType].map((info, i) => (
                              <span key={`${iType}_${i}`} className="badge rounded-pill bg-dark" style={{ color: "#ebd8b8" }}>
                                {info}
                              </span>
                            ))}
                          </>
                        ))}

                        {/* {
                                        Object.keys(r.suitability).map((iType) =>
                                        (
                                            <>
                                                {console.log('data=>', iType)}
                                                <div>: {iType}</div>
                                                {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`} className="badge bg-danger mx-1">
                                                    {info}
                                                </span>)}
                                            </>)
                                        )
                                    } */}
                        <div className="ms-auto text-end">
                          {/* <InfoModal data={this.state}/> */}
                          <button
                            className=" btn btn-dark my-1"
                            style={{ color: "#ebd8b8" }}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isEditVisible: true });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className=" btn btn-dark my-1"
                            style={{ color: "#ebd8b8" }}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isViewVisible: true });
                            }}
                          >
                            More
                          </button>

                          <button
                            className=" btn btn-dark my-1"
                            style={{ color: "#ebd8b8" }}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isDeleteVisible: true });
                            }}

                            // {this.processDeleteCollection(r)}}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    </React.Fragment>
                  ))}
                  {/* </ul> */}
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
        </Container>
      </React.Fragment>
    );
  }
}
