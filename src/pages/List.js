import React from "react";
import axios from "axios";
import "../components/InfoModal/index.css";
// import '../style.css'

import InfoModal from "../components/InfoModal";
import EditInfoModal from "../components/InfoEditModal";
import DeleteInfoModal from "../components/DeleteInfoModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
export default class Listing extends React.Component {
  url = "https://project-2-soap.herokuapp.com/";

  state = {
    collection: [],
    deletecollection: null,
    // collectionDeleted: null,
    submitted: false,
    selectedData: {},
    isViewVisible: false,
    isEditVisible: false,
    isDeleteVisible: false,
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

  // let deleteresponse = await axios.delete(this.url + 'soap_listings/:id')
  // this.setState({
  //     deletecollection:deleteresponse.data,
  // })

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  renderAddUser() {
    return (
      <React.Fragment>
        <input type="text" placeholder="User name" value={this.state.newUserName} onChange={this.updateFormField} name="newUserName" />
        <input type="text" placeholder="User email" value={this.state.newUserEmail} onChange={this.updateFormField} name="newUserEmail" />
        <button onClick={this.addUser}>Add</button>
      </React.Fragment>
    );
  }

  // processUpdateUser = () => {
  //     // clone the object
  //     const modifiedUser = {
  //       ...this.state.userBeingEdited,
  //       name: this.state.modifiedUserName,
  //       email: this.state.modifiedUserEmail
  //     };

  //     // replace into the middle of the array

  //     // 0. find the index of the user that we want to replace
  //     let index = -1; // NOT FOUND
  //     for (let i = 0; i < this.state.users.length; i++) {
  //       if (this.state.users[i]._id === modifiedUser._id) {
  //         index = i;
  //         break;
  //       }
  //     }

  //     if (index === -1) {
  //       return;
  //     }

  //     // 1. clone the array in the state
  //     const cloned = [
  //       ...this.state.users.slice(0, index),
  //       modifiedUser,
  //       ...this.state.users.slice(index + 1)
  //     ];

  //     this.setState({
  //       users: cloned,
  //       userBeingEdited: null // indicate that no user is being edited at the moment
  //     });
  //   };

  //   displayDeleteUser = (r) => {
  //     return (
  //       <React.Fragment>
  //         Are you sure to delete the collection? (SoapName: {r.soap_label})
  //         <button
  //           onClick={() => {
  //             this.processDeleteUser(r);
  //           }}
  //         >
  //           Yes
  //         </button>
  //         <button
  //           onClick={() => {
  //             this.setState({
  //                 collectionDeleted: null
  //             });
  //           }}
  //         >
  //           No
  //         </button>
  //       </React.Fragment>
  //     );
  //   };

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

  processDeleteCollection = async (r) => {
    // let index = this.state.collection.findIndex(e=> e._id === r._id)
    // console.log(index)
    // const cloned =[
    //     ...this.state.collection.slice(0,index),
    //     ...this.state.collection.slice(index+1)
    // ]

    // this.setState({
    //     collection:cloned,

    // })

    //let newSkinType = this.state.newSkinType.map(s=>s.value)
    // let deleted_id = this.state.collection.map((s) => s.value);

    //console.log(newSkinType);
    // console.log(newSkinType);
    // this.setState({
    //     deletecollection: r
    // })

    await axios.delete(this.url + `soap_listings/${r._id}`); // delete
    // await axios.delete(this.url + `soap_listings/${this.state.collection._id}`)
    let response = await axios.get(this.url + "soap_listings"); // get all data
    this.setState({
      collection: response.data,
    });
    //this.props.goTo("collection");
  };

  //   processDeleteCollection = (p) => {
  //     let index = this.state.collection.findIndex(e=> e._id === p._id)
  //     console.log(index)
  //     const cloned =[
  //         ...this.state.collection.slice(0,index),
  //         ...this.state.collection.slice(index+1)
  //     ]

  //     this.setState({
  //         collection:cloned
  //     })
  //   };

  render() {
    return (
      <React.Fragment>
          {/* <div className="listlogo mt-1 row mx-auto" src={require("../soapBW_logo.png")} /></div> */}
        {/* <div className="border border-dark border-3 rounded-3 m-4" style={{ background: "white" }}> */}
        <div className="mt-2 m-4 d-flex justify-content-center" style={{ background: "white" }}>
          {/* <h1 className="AddForm">All Collections</h1> */}
          <div className="row d-flex justify-content-center col-sm-12 col-md-12 col-lg-8">
            {/* <ul className="list-group  item"> */}
            {this.state.collection.map((r) => (
              <React.Fragment key={r._id}>
                <li className="list-group-item item rounded-3 m-2" style={{ background: "white" }}>
                           {/* <strong>Soap Name: </strong> */}
                           <h4 className="text-center" style={{ color: "black",fontFamily:"League Spartan" }}>
                            {r.soap_label}
                          </h4>
                          <a className="deleteBtn " style={{textDecoration:"none",fontSize:"20px"}}onClick={() => {
                              this.view(r);
                              this.setState({ isDeleteVisible: true });
                            }}><FontAwesomeIcon icon={faCircleXmark} /></a>
                        <div className="infoImage mx-auto m-2">
                          {" "}
                          <img style={{width:"300px", height:"200px"}}  src={r.image_url} alt="new" />
                        </div>
                        <div>
                         
                      
{/*      
                          <strong>Country Origin: </strong> */}
                          <span className="badge bg-dark mx-1" style={{ color: "white",fontFamily:"League Spartan" }}>
                            {r.country_origin}
                          </span>

                          <span className="badge bg-dark mx-1" style={{ color: "white",fontFamily:"League Spartan" }}>
                            ${r.cost}
                          </span>
                     
                          {/* <strong>Color: </strong> */}
                          <span className="badge mx-1" style={{backgroundColor:"#ECECEC", color: "black",fontFamily:"League Spartan" }}>
                            {r.color}
                          </span>

                       

                        {/* <div>Skin_Type:
                                    {
                                        r.skin_type.map(i => 
                                           <span key={i} className="badge rounded-pill bg-primary mx-1">{i}
                                        </span>)
                                    }
                                    </div> */}

                        
                          {/* <strong>Skin_Type:</strong> */}
                          {Object.keys(r.skin_type).map((i) => (
                            <span className="badge ms-1" style={{ backgroundColor:"#ECECEC", color: "black",fontFamily:"League Spartan" }} key={`${i}`}>
                              {" "}
                              {r.skin_type[i]}
                            </span>
                          ))}
{/*                      
                          <strong>Treat:</strong> */}
                          {/* {Object.keys(r.suitability.treat).map((i) => (
                            <span className="badge rounded-pill bg-warning" style={{ color: "black" }} key={`${i}`}>
                              {" "}
                              {r.suitability.treat[i]}
                            </span>
                          ))}


                               {Object.keys(r.ingredients.oil_ingredient).map((i) => (
                            <span className="badge rounded-pill bg-secondary" style={{ color: "black" }} key={`${i}`}>
                              {" "}
                              {r.ingredients.oil_ingredient[i]}
                            </span>
                          ))}

                            {Object.keys(r.ingredients.base_ingredient).map((i) => (
                            <span className="badge rounded-pill bg-secondary" style={{ color: "black" }} key={`${i}`}>
                              {" "}
                              {r.ingredients.base_ingredient[i]}
                            </span>
                          ))}
                              {Object.keys(r.ingredients.milk_ingredient).map((i) => (
                            <span className="badge rounded-pill bg-secondary" style={{ color: "black" }} key={`${i}`}>
                              {" "}
                              {r.ingredients.milk_ingredient[i]}
                            </span>
                          ))} */}
                        </div>
   
                    

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

{/* <div className="d-flex justify-content-between gap-1 mt-1" style={{ fontFamily:"League Spartan" }}> */}
                                         <div className="d-flex justify-content-between gap-1 mt-4" style={{ fontFamily:"League Spartan" }}>
                          {/* <InfoModal data={this.state}/> */}
                          <button
                            className="btn  col d-flex  justify-content-center align-items-center"
                            style={{  height:"30px",backgroundColor:"#ECECEC",color: "black",fontSize:"15px"}}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isEditVisible: true });
                            }}
                          >
                            Edit
                          </button>
                      
                          {/* <button
                            className="btn btn-light col d-flex  justify-content-center align-items-center "
                            style={{ height:"30px",color: "black",fontSize:"15px"}}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isDeleteVisible: true });
                            }}

                            // {this.processDeleteCollection(r)}}
                          >
                            Delete
                          </button> */}
                        </div>
          
                        <button
                            className=" btn btn-dark mt-1 d-flex  justify-content-center align-items-center col-12"
                            style={{ height:"30px", color: "white",fontSize:"15px",fontFamily:"League Spartan" }}
                            onClick={() => {
                              this.view(r);
                              this.setState({ isViewVisible: true });
                            }}
                          >
                            More
                          </button>
                     
                      </li>
              </React.Fragment>
            ))}
            {/* </ul> */}
          </div>

          {this.state.isEditVisible && (
            <EditInfoModal selectedID={this.state.selectedData._id} isViewVisible={this.state.isEditVisible} setIsViewVisible={this.setIsEditViewVisible} />
          )}
          {this.state.isViewVisible && (
            <InfoModal selectedData={this.state.selectedData} isViewVisible={this.state.isViewVisible} setIsViewVisible={this.setIsViewVisible} />
          )}

          {this.state.isDeleteVisible && (
            <DeleteInfoModal selectedData={this.state.selectedData} isViewVisible={this.state.isDeleteVisible} setIsViewVisible={this.setIsDeleteViewVisible} />
          )}
        </div>
      </React.Fragment>
    );
  }
}
