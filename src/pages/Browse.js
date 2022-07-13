import axios from "axios";
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Container, Row, Button, Card, Col } from 'react-bootstrap';

export default class Browse extends React.Component {
url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/"

state = {
  submitted: false,
  searchInput:"",
  searchCountry:"",
  collection: [],
  minprice:0,
  maxprice:1000
}
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

  searchBarSoap  = async () => {
    this.setState({
      submitted: true,
    });


    let query = "";
    const {searchInput, searchCountry, minprice, maxprice} = this.state
    let inserted = 0;
    if(searchInput != ""){
      query+=`search=${searchInput}`;
      inserted+=1;
    }

    if(searchCountry != ""){
      if(inserted > 0){
        query+="&"
      }
      query+=`country_origin=${searchCountry}`;
      inserted+=1;
    }

    if(minprice >= 0 && maxprice > minprice){
      if(inserted > 0){
        query+="&"
      }
      query+=`min_cost=${minprice}&max_cost=${maxprice}`;
      inserted+=1;
    }

    const response = await axios.get(this.url + "soap_listings?"+query);
    console.log(response);
    if(response.data && response.data.length > 0){
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

  render() {
    return (
      <React.Fragment>
        <Container style={{"margin":"10px 0px",height:"95%", "width":"100%"}}>
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
                    style={{"width":"100px"}}
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
                    <option key="placeholder" name="selectone" value = "">
                    ---Select One---
                  </option>
                  {this.showCountries()}
                  </select>
                </div>
                <div>
                  
                  <label>Color</label>
                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="white"
                  />
                  <label class="form-check-label">White</label>

                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="orange"
                  />
                  <label class="form-check-label">Orange</label>

                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="red"
                  />
                  <label class="form-check-label">Red</label>

                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="blue"
                  />
                  <label class="form-check-label">Blue</label>

                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="green"
                  />
                  <label class="form-check-label">Green</label>

                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="yellow"
                  />
                  <label class="form-check-label">Yellow</label>

                  <input
                    type="checkbox"
                    onChange={this.newColor}
                    className="form-check-input"
                    name="color"
                    value="Orange"
                  />
                  <label class="form-check-label">Orange</label>
                </div>
                
                <div>
                  <label>Cost</label>
                  <div>
                    <label>Max Amount</label>
                    <input
                      className="form-control"
                      type="text"
                        name="maxprice"
                        value={this.state.maxprice}
                      placeholder="Max"
                        onChange={this.updateSearchFormField}
                    />
                    <label>Min Amount</label>
                    <input
                      className="form-control"
                      type="text"
                        name="minprice"
                        value={this.state.minprice}
                      placeholder="Min"
                        onChange={this.updateSearchFormField}
                    />
                  </div>
                </div>
                <div>
                  <label>Skin Type</label>
                  <input
                    type="checkbox"
                    onChange={this.newSkin}
                    className="form-check-input"
                    name="color"
                    value="sensitive"
                  />
                  <label class="form-check-label">Sensitive</label>

                  <input
                    type="checkbox"
                    onChange={this.newSkin}
                    className="form-check-input"
                    name="color"
                    value="oily"
                  />
                  <label class="form-check-label">Oily</label>

                  <input
                    type="checkbox"
                    onChange={this.newSkin}
                    className="form-check-input"
                    name="color"
                    value="dry"
                  />
                  <label class="form-check-label">Dry</label>
                </div>
                <div>
                  <label>Oil Ingredients</label>
                  <input
                    type="checkbox"
                    onChange={this.newOil}
                    className="form-check-input"
                    name="color"
                    value="coconut oil"
                  />
                  <label class="form-check-label">Coconut oil</label>
                  <input
                    type="checkbox"
                    onChange={this.newOil}
                    className="form-check-input"
                    name="color"
                    value="butter oil"
                  />
                  <label class="form-check-label">Butter oil</label>
                  <input
                    type="checkbox"
                    onChange={this.newOil}
                    className="form-check-input"
                    name="color"
                    value="butter oil"
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
                        <a className="AddBtn btn btn-dark m-3" style={{ color: "#ebd8b8" }} onClick={this.searchBarSoap}>Search</a>
                    </div>
              </div>
              
            </Col>
            <Col xs="12" lg="9">{/* search results */}
           
            <div className=" mt-3 " style={{ background: "#ebd8b8",height:"95%" }}>
                    <h1 className="AddForm">All Collections</h1>
                    <div className="row justify-content-center col-sm col-md col-lg">
                    {/* <ul className="list-group  item"> */}
                        {
                            this.state.collection.map(r => <React.Fragment key={r._id}>
                                <li className="list-group-item  item  rounded-3 m-3" style={{ background: "#ebd8b8" }}>
                                 <span className=" mx-1"> <img style={{height:"250px",width:"350px"}}src={r.image_url}alt="new"/></span>
                                    <div><strong>Soap Name: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.soap_label}</span></div>
                                    <div><strong>Country Origin: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.country_origin}</span></div>
                                    <div><strong>Color: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.color}</span></div>
                                    
                                    {/* <div>Skin_Type:
                                    {
                                        r.skin_type.map(i => 
                                           <span key={i} className="badge rounded-pill bg-primary mx-1">{i}
                                        </span>)
                                    }
                                    </div> */}

                                    <div><strong>Skin_Type:</strong>
                                    {
                                        Object.keys(r.skin_type).map((i) =>
                                            <span className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}} key={`${i}`}> {r.skin_type[i]}</span>
                                        )

                                    }
                                     </div>
                                     <div><strong>Treat:</strong>
                                    {
                                        Object.keys(r.suitability.treat).map((i) =>
                                            <span className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}} key={`${i}`}>  {r.suitability.treat[i]}</span>
                                        )



                                    }
                                       </div>
                                    {
                                        Object.keys(r.ingredients).map((iType) =>
                                        (
                                            <>
                                                {console.log('data=>', iType)}
                                                <div><strong>Ingredients: {iType}</strong></div>
                                                
                                                {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`}  className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}}>
                                                 {info}
                                                </span>)}
                       
                                            </>)
                                        )
                                    }
                            
                                   
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
                                        <a className="More btn btn-dark my-1" style={{color:"#ebd8b8"}} onClick={this.addNew}>More</a>
                                    </div>
                                </li>

                            </React.Fragment>)
                        }
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
