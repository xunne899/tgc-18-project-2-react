import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Container, Row, Button, Card, Col } from 'react-bootstrap';

export default class Browse extends React.Component {
  url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/";

  state = {
    submitted: false,
    searchInput: "",
    searchCountry: "",
    collection: [],
    minprice: 0,
    maxprice: 1000,
    searchColor:"",
    searchSkin:[],
    searchOil:[]
  };
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
    const { searchInput, searchCountry, minprice, maxprice,searchSkin,searchColor,searchOil } = this.state;
    let inserted = 0;
    if (searchInput != "") {
      query += `search=${searchInput}`;
      inserted += 1;
    }

    if (searchCountry != "") {
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

        if(searchColor!= ""){
      if(inserted > 0){
        query+="&"
      }
      query+=`color=${searchColor}`;
      inserted+=1;
    }

    if(searchSkin!= ""){
      if(inserted > 0){
        query+="&"
      }
      query+=`skin_type[]=${searchSkin}`;
      inserted+=1;
    }

    if(searchOil!= ""){
      if(inserted > 0){
        query+="&"
      }
      query+=`oil_ingredient[]=${searchOil}`;
      inserted+=1;
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




  updateSkin = (evt) => {
        if (this.state.searchSkin.includes(evt.target.value)) {
          // case 1: the array already  have the value
    
          // 1. clone
          let clone = this.state.searchSkin.slice();
    
          // 2. modify the clone
          let indexToRemove = this.state.searchSkin.findIndex(function (sk) {
            return sk === evt.target.value; // <-- evt.target.value is the value of the checkbox that has been just checked
          });
          clone.splice(indexToRemove, 1);
    
          // 3 replace
          this.setState({
            searchSkin: clone
          });
        } else {
          // case 2: the array don't have the value
          // 1. make a clone of the original array
          let clone = this.state.searchSkin.slice();
    
          // 2. change the clone
          clone.push(evt.target.value);
    
          // 3. replace the array in the state with the clone
          this.setState({
            searchSkin: clone
          });
        }
      }


      updateOil = (e) => {
        if (this.state.searchOil.includes(e.target.value)) {
          // case 1: the array already  have the value
    
          // 1. clone
          let clone = this.state.searchOil.slice();
    
          // 2. modify the clone
          let indexToRemove = this.state.searchOil.findIndex(function (o) {
            return o === e.target.value; // <-- evt.target.value is the value of the checkbox that has been just checked
          });
          clone.splice(indexToRemove, 1);
    
          // 3 replace
          this.setState({
            searchOil: clone
          });
        } else {
          // case 2: the array don't have the value
          // 1. make a clone of the original array
          let clone = this.state.searchOil.slice();
    
          // 2. change the clone
          clone.push(e.target.value);
    
          // 3. replace the array in the state with the clone
          this.setState({
            searchOil: clone
          });
        }
      }






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
                    className="form-check-input"
                    name="searchInput"
                    style={{ width: "240px",height:"30px" }}
                  />
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
                </div>
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
                    <label>Max Amount</label>
                    <input
                      className="form-control"
                      type="text"
                      name="maxprice"
                      value={this.state.maxprice}
                      placeholder="Max"
                      onChange={this.updateSearchFormField}
                    />
                  </div>
                </div>
                <div>
                   <label>Skin Type</label>
                  <input
                    type="checkbox"
                    onChange={this.updateSkin}
                    className="form-check-input"
                    name="searchSkin"
                    value="sensitive"
                    checked={this.state.searchSkin.includes('sensitive')}
                  />
                  <label class="form-check-label">Sensitive</label>

                  <input
                    type="checkbox"
                    onChange={this.updateSkin}
                    className="form-check-input"
                    name="searchSkin"
                    value="oily"
                    checked={this.state.searchSkin.includes('oily')}
                  />
                  <label class="form-check-label">Oily</label>

                  <input
                    type="checkbox"
                    onChange={this.updateSkin}
                    className="form-check-input"
                    name="searchSkin"
                    value="dry"
                    checked={this.state.searchSkin.includes('dry')}
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
                    value="coconut oil"
                  />
                  <label class="form-check-label">Coconut oil</label>
                  <input
                    type="checkbox"
                    onChange={this.updateOil}
                    className="form-check-input"
                    name="searchOil"
                    value="butter oil"
                  />
                  <label class="form-check-label">Butter oil</label>
                  <input
                    type="checkbox"
                    onChange={this.updateOil}
                    className="form-check-input"
                    name="searchOil"
                    value="grapeseed oil"
                  />
                  <label class="form-check-label">Grapeseed oil</label>
                </div>
                <div>
                  <label>Base Ingredients</label>
                  <input
                    type="checkbox"
                    onChange={this.newBase}
                    className="form-check-input"
                    name="color"
                    value="coconut oil"
                  />
                  <label class="form-check-label">Mugwort Powder</label>
                  <input
                    type="checkbox"
                    onChange={this.newBase}
                    className="form-check-input"
                    name="color"
                    value="butter oil"
                  />
                  <label class="form-check-label">Tomato Powder</label>
                  <input
                    type="checkbox"
                    onChange={this.newBase}
                    className="form-check-input"
                    name="color"
                    value="butter oil"
                  />
                  <label class="form-check-label">Tumeric Powder</label>
                </div>
                <div>
                  <label>Milk Ingredients</label>
                  <input
                    type="checkbox"
                    onChange={this.newMilk}
                    className="form-check-input"
                    name="color"
                    value="coconut oil"
                  />
                  <label class="form-check-label">Butter Milk</label>
                  <input
                    type="checkbox"
                    onChange={this.newMilk}
                    className="form-check-input"
                    name="color"
                    value="butter oil"
                  />
                  <label class="form-check-label">Oatmeal Milk</label>
                  <input
                    type="checkbox"
                    onChange={this.newMilk}
                    className="form-check-input"
                    name="color"
                    value="butter oil"
                  />
                  <label class="form-check-label">Goat Milk</label>
                </div>
                <div className="text-center ms-auto">
                  <a
                    className="AddBtn btn btn-dark m-3"
                    style={{ color: "#ebd8b8" }}
                    onClick={this.searchBarSoap}
                  >
                    Search
                  </a>
                </div>
              </div>
            </Col>
            <Col xs="12" lg="9">
              {/* search results */}

              <div
                className=" mt-3 "
                style={{ background: "#ebd8b8", height: "95%" }}
              >
                {/* <h1 className="AddForm">All Collections</h1> */}
                <div className="row justify-content-center col-sm col-md col-lg">
                  {/* <ul className="list-group  item"> */}
                  {this.state.collection.map((r) => (
                    <React.Fragment key={r._id}>
                      <li
                        className="list-group-item  item  rounded-3 m-3"
                        style={{ background: "#ebd8b8" }}
                      >
                        <span className=" mx-1">
                          {" "}
                          <img
                            style={{ height: "250px", width: "350px" }}
                            src={r.image_url}
                            alt="new"
                          />
                        </span>
                        <div>
                          <strong>Soap Name: </strong>
                          <span
                            className="badge rounded-pill bg-dark mx-1"
                            style={{ color: "#ebd8b8" }}
                          >
                            {r.soap_label}
                          </span>
                        </div>
                        <div>
                          <strong>Country Origin: </strong>
                          <span
                            className="badge rounded-pill bg-dark mx-1"
                            style={{ color: "#ebd8b8" }}
                          >
                            {r.country_origin}
                          </span>
                        </div>
                        <div>
                          <strong>Color: </strong>
                          <span
                            className="badge rounded-pill bg-dark mx-1"
                            style={{ color: "#ebd8b8" }}
                          >
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
                            <span
                              className="badge rounded-pill bg-dark"
                              style={{ color: "#ebd8b8" }}
                              key={`${i}`}
                            >
                              {" "}
                              {r.skin_type[i]}
                            </span>
                          ))}
                        </div>
                        <div>
                          <strong>Treat:</strong>
                          {Object.keys(r.suitability.treat).map((i) => (
                            <span
                              className="badge rounded-pill bg-dark"
                              style={{ color: "#ebd8b8" }}
                              key={`${i}`}
                            >
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
                              <span
                                key={`${iType}_${i}`}
                                className="badge rounded-pill bg-dark"
                                style={{ color: "#ebd8b8" }}
                              >
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
                          <a
                            className="More btn btn-dark my-1"
                            style={{ color: "#ebd8b8" }}
                            onClick={this.addNew}
                          >
                            More
                          </a>
                        </div>
                      </li>
                    </React.Fragment>
                  ))}
                  {/* </ul> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

// import axios from "axios";
// import React from "react";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// // import { Container, Row, Button, Card, Col } from 'react-bootstrap';

// export default class Browse extends React.Component {
// url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/"

// state = {
//   submitted: false,
//   searchInput:"",
//   searchCountry:"",
//   collection: [],
//   minprice:0,
//   maxprice:1000,
//   searchColor:"",
//   searchSkin:[]
// }

// countries = [
//   {
//     show: "Germany",
//     value: "germany",
//   },
//   {
//     show: "Russia",
//     value: "russia",
//   },
//   {
//     show: "Italy",
//     value: "italy",
//   },
//   {
//     show: "Uk",
//     value: "uk",
//   },
//   {
//     show: "Japan",
//     value: "japan",
//   },
//   {
//     show: "South Korea",
//     value: "southkorea",
//   },
//   {
//     show: "France",
//     value: "france",
//   },
//   {
//     show: "Singapore",
//     value: "singapore",
//   },
// ]

//   searchBarSoap  = async () => {
//     this.setState({
//       submitted: true,
//     });

//     let query = "";
//     const {searchInput, searchCountry, minprice, maxprice,searchColor} = this.state
//     let inserted = 0;
//     if(searchInput != ""){
//       query+=`search=${searchInput}`;
//       inserted+=1;
//     }

//     if(searchCountry != ""){
//       if(inserted > 0){
//         query+="&"
//       }
//       query+=`country_origin=${searchCountry}`;
//       inserted+=1;
//     }

//     if(minprice >= 0 && maxprice > minprice){
//       if(inserted > 0){
//         query+="&"
//       }
//       query+=`min_cost=${minprice}&max_cost=${maxprice}`;
//       inserted+=1;
//     }

//     if(searchColor!= ''){
//       if(inserted > 0){
//         query+="&"
//       }
//       query+=`color=${searchColor}`;
//       inserted+=1;
//     }

//     if(searchSkin!= ''){
//       if(inserted > 0){
//         query+="&"
//       }
//       query+=`color=${searchSkin}`;
//       inserted+=1;
//     }

//     const response = await axios.get(this.url + "soap_listings?"+query);
//     console.log(response);
//     if(response.data && response.data.length > 0){
//       this.setState({
//         collection: response.data,
//       });
//     }
//     //this.props.goTo("browse");
//   }

//   updateSearchFormField = (i) => {
//     this.setState({
//       [i.target.name]: i.target.value,
//     });
//   };

//   //

//   // state = {
//   //     full_collection: [],
//   //     collection: []
//   // }

//   // async componentDidMount() {
//   //     console.log("Soap listing did mount");
//   //     let response = await axios.get(this.url + 'soap_listings')
//   //     this.setState({
//   //         full_collection: response.data,
//   //         collection: response.data,
//   //     })

//   //     let filterCollection = []
//   //     console.log(response.data)
//   //     for(let data of response.data){
//   //         for(let soapColor of data.color){
//   //             if(soapColor.includes("blue")){
//   //                 filterCollection.push(data);
//   //             }

//   //             continue;
//   //         }

//   //         if(data.soap_label.includes("vanilla")){
//   //             filterCollection.push(data);
//   //             continue;
//   //         }
//   //     }
//   //     console.log("filtered lst: ", filterCollection)

//   //     this.setState({
//   //         collection: filterCollection
//   //     })
//   // }
//   // rendering all selected countries == dropdown
//   showCountries = () => {
//     let selectedCountry = this.countries.map((eachOne) => {
//       return (
//         <option key={eachOne.value} value={eachOne.value}>
//           {eachOne.show}
//         </option>
//       );
//     });
//     return selectedCountry;
//   };

//   updateSkin = (evt) => {
//     if (this.state.searchSkin.includes(evt.target.value)) {
//       // case 1: the array already  have the value

//       // 1. clone
//       let clone = this.state.searchSkin.slice();

//       // 2. modify the clone
//       let indexToRemove = this.state.searchSkin.findIndex(function (sk) {
//         return sk === evt.target.value; // <-- evt.target.value is the value of the checkbox that has been just checked
//       });
//       clone.splice(indexToRemove, 1);

//       // 3 replace
//       this.setState({
//         searchSkin: clone
//       });
//     } else {
//       // case 2: the array don't have the value
//       // 1. make a clone of the original array
//       let clone = this.state.searchSkin.slice();

//       // 2. change the clone
//       clone.push(evt.target.value);

//       // 3. replace the array in the state with the clone
//       this.setState({
//         searchSkin: clone
//       });
//     }
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Container style={{"margin":"10px 0px",height:"95%", "width":"100%"}}>
//           <Row>
//             <Col xs="12" lg="3">
//               <div className="m-3  p-3">
//               <label>Search</label>
//               <div>
//                   <input
//                     type="text"
//                     onChange={this.updateSearchFormField}
//                     className="form-check-input"
//                     name="searchInput"
//                     style={{"width":"245px","height":"30px"}}
//                   />
//                   </div>
//                   <div>
//                   <label>Country:</label>
//                   <select
//                   className="form-select form-control"
//                    value={this.state.searchCountry}
//                    onChange={this.updateSearchFormField}
//                    name="searchCountry"
//                   // name="country" value={this.state.country} onChange={this.updateFormField}
//                   >
//                     <option key="placeholder" name="selectone" value = "">
//                     ---Select One---
//                   </option>
//                   {this.showCountries()}
//                   </select>
//                 </div>
//                 <div>

//                   <label>Color</label>
//                   <input
//                     type="radio"
//                     onChange={this.updateSearchFormField}
//                     className="form-check-input"
//                     name="searchColor"
//                     value="green"
//                     checked={this.state.searchColor ==="green"}
//                   />
//                   <label class="form-check-label">Green</label>

//                   <input
//                      type="radio"
//                      onChange={this.updateSearchFormField}
//                     className="form-check-input"
//                     name="searchColor"
//                     value="blue"
//                     checked={this.state.searchColor ==="blue"}
//                   />
//                   <label class="form-check-label">Blue</label>

//                   <input
//                      type="radio"
//                      onChange={this.updateSearchFormField}
//                     className="form-check-input"
//                     name="searchColor"
//                     value="red"
//                     checked={this.state.searchColor ==="red"}
//                   />
//                   <label class="form-check-label">Red</label>

//                   <input
//                     type="radio"
//                     onChange={this.updateSearchFormField}
//                     className="form-check-input"
//                     name="searchColor"
//                     value="yellow"
//                     checked={this.state.searchColor ==="yellow"}
//                   />
//                   <label class="form-check-label">Yellow</label>

//                   <input
//                      type="radio"
//                      onChange={this.updateSearchFormField}
//                     className="form-check-input"
//                     name="searchColor"
//                     value="orange"
//                     checked={this.state.searchColor ==="orange"}
//                   />
//                   <label class="form-check-label">Orange</label>
//                 </div>

//                 <div>
//                   <label>Cost</label>
//                   <div>
//                     <label>Max Amount</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                         name="maxprice"
//                         value={this.state.maxprice}
//                       placeholder="Max"
//                         onChange={this.updateSearchFormField}
//                     />
//                     <label>Min Amount</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                         name="minprice"
//                         value={this.state.minprice}
//                       placeholder="Min"
//                         onChange={this.updateSearchFormField}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label>Skin Type</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.updateSkin}
//                     className="form-check-input"
//                     name="searchSkin"
//                     value="sensitive"
//                     checked={this.state.searchSkin.includes('sensitive')}
//                   />
//                   <label class="form-check-label">Sensitive</label>

//                   <input
//                     type="checkbox"
//                     onChange={this.updateSkin}
//                     className="form-check-input"
//                     name="searchSkin"
//                     value="oily"
//                     checked={this.state.searchSkin.includes('oily')}
//                   />
//                   <label class="form-check-label">Oily</label>

//                   <input
//                     type="checkbox"
//                     onChange={this.updateSkin}
//                     className="form-check-input"
//                     name="searchSkin"
//                     value="dry"
//                     checked={this.state.searchSkin.includes('dry')}
//                   />
//                   <label class="form-check-label">Dry</label>
//                 </div>
//                 <div>
//                 <div>
//                   <label>Oil Ingredients</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newOil}
//                     className="form-check-input"
//                     name="color"
//                     value="coconut oil"
//                   />
//                   <label class="form-check-label">Coconut oil</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newOil}
//                     className="form-check-input"
//                     name="color"
//                     value="butter oil"
//                   />
//                   <label class="form-check-label">Butter oil</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newOil}
//                     className="form-check-input"
//                     name="color"
//                     value="butter oil"
//                   />
//                   <label class="form-check-label">Grapeseed oil</label>
//                 </div>
//                 <div>
//                   <label>Base Ingredients</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newBase}
//                     className="form-check-input"
//                     name="color"
//                     value="coconut oil"
//                   />
//                   <label class="form-check-label">Mugwort Powder</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newBase}
//                     className="form-check-input"
//                     name="color"
//                     value="butter oil"
//                   />
//                   <label class="form-check-label">Tomato Powder</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newBase}
//                     className="form-check-input"
//                     name="color"
//                     value="butter oil"
//                   />
//                   <label class="form-check-label">Tumeric Powder</label>
//                 </div>
//                 <div>
//                   <label>Milk Ingredients</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newMilk}
//                     className="form-check-input"
//                     name="color"
//                     value="coconut oil"
//                   />
//                   <label class="form-check-label">Butter Milk</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newMilk}
//                     className="form-check-input"
//                     name="color"
//                     value="butter oil"
//                   />
//                   <label class="form-check-label">Oatmeal Milk</label>
//                   <input
//                     type="checkbox"
//                     onChange={this.newMilk}
//                     className="form-check-input"
//                     name="color"
//                     value="butter oil"
//                   />
//                   <label class="form-check-label">Goat Milk</label>
//                 </div>
//                 <div className="text-center ms-auto">
//                         <a className="AddBtn btn btn-dark m-3" style={{ color: "#ebd8b8" }} onClick={this.searchBarSoap}>Search</a>
//                     </div>
//               </div>

//             </Col>
//             <Col xs="12" lg="9">{/* search results */}

//             <div className=" mt-3 " style={{ background: "#ebd8b8",height:"95%" }}>
//                     <h1 className="AddForm">All Collections</h1>
//                     <div className="row justify-content-center col-sm col-md col-lg">
//                     {/* <ul className="list-group  item"> */}
//                         {
//                             this.state.collection.map(r => <React.Fragment key={r._id}>
//                                 <li className="list-group-item  item  rounded-3 m-3" style={{ background: "#ebd8b8" }}>
//                                  <span className=" mx-1"> <img style={{height:"250px",width:"350px"}}src={r.image_url}alt="new"/></span>
//                                     <div><strong>Soap Name: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.soap_label}</span></div>
//                                     <div><strong>Country Origin: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.country_origin}</span></div>
//                                     <div><strong>Color: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.color}</span></div>

//                                     {/* <div>Skin_Type:
//                                     {
//                                         r.skin_type.map(i =>
//                                            <span key={i} className="badge rounded-pill bg-primary mx-1">{i}
//                                         </span>)
//                                     }
//                                     </div> */}

//                                     <div><strong>Skin_Type:</strong>
//                                     {
//                                         Object.keys(r.skin_type).map((i) =>
//                                             <span className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}} key={`${i}`}> {r.skin_type[i]}</span>
//                                         )

//                                     }
//                                      </div>
//                                      <div><strong>Treat:</strong>
//                                     {
//                                         Object.keys(r.suitability.treat).map((i) =>
//                                             <span className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}} key={`${i}`}>  {r.suitability.treat[i]}</span>
//                                         )

//                                     }
//                                        </div>
//                                     {
//                                         Object.keys(r.ingredients).map((iType) =>
//                                         (
//                                             <>
//                                                 {console.log('data=>', iType)}
//                                                 <div><strong>Ingredients: {iType}</strong></div>

//                                                 {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`}  className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}}>
//                                                  {info}
//                                                 </span>)}

//                                             </>)
//                                         )
//                                     }

//                                     {/* {
//                                         Object.keys(r.suitability).map((iType) =>
//                                         (
//                                             <>
//                                                 {console.log('data=>', iType)}
//                                                 <div>: {iType}</div>
//                                                 {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`} className="badge bg-danger mx-1">
//                                                     {info}
//                                                 </span>)}
//                                             </>)
//                                         )
//                                     } */}
//                                     <div className="ms-auto text-end">
//                                         <a className="More btn btn-dark my-1" style={{color:"#ebd8b8"}} onClick={this.addNew}>More</a>
//                                     </div>
//                                 </li>

//                             </React.Fragment>)
//                         }
//                     {/* </ul> */}
//                     </div>
//                 </div>

//             </Col>
//           </Row>
//         </Container>
//       </React.Fragment>
//     );
//   }
// }
