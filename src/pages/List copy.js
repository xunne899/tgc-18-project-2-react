import React from "react";
import axios from "axios";
import "../components/InfoModal/index.css";
// import '../style.css'

import InfoModal from "../components/InfoModal";
import EditInfoModal from "../components/InfoEditModal";
import DeleteInfoModal from "../components/DeleteInfoModal";

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
        <div className=" rounded-3 m-4" style={{ background: "white" }}>
          {/* <h1 className="AddForm">All Collections</h1> */}
          <div className="row justify-content-center col-sm col-md col-lg">
            {/* <ul className="list-group  item"> */}
            {this.state.collection.map((r) => (
              <React.Fragment key={r._id}>
                <li className="list-group-item  item  rounded-3 m-3" style={{ background: "white" }}>
                <div>
                    {/* <strong>Soap Name: </strong> */}
                    <span className="badge rounded-pill bg-dark mx-1" style={{ color: "white" }} style={{fontFamily:"League Spartan"}}>
                      {r.soap_label}
                    </span>
                  </div>
                  <div className="infoImage mx-1">
                    {" "}
                    <img style={{ height: "250px", width: "350px" }} src={r.image_url} alt="new" />
                  </div>
                  {/* <span className=" mx-1"> <img style={{height:"250px",width:"350px"}}src={r.image_url}alt="new"/></span> */}
              
                  <div>
                    <strong>Country Origin: </strong>
                    <span className="badge rounded-pill bg-dark mx-1" style={{ color: "white" }}>
                      {r.country_origin}
                    </span>
                  </div>
                  {/* <div><strong>Color: </strong><span className="badge rounded-pill bg-dark mx-1" style={{color:"#ebd8b8"}}>{r.color}</span></div> */}

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
                      <span className="badge rounded-pill bg-dark" style={{ color: "white" }} key={`${i}`}>
                        {" "}
                        {r.skin_type[i]}
                      </span>
                    ))}
                  </div>

                  <div>
                    <strong>Treat:</strong>
                    {Object.keys(r.suitability.treat).map((i) => (
                      <span className="badge rounded-pill bg-dark" style={{ color: "white" }} key={`${i}`}>
                        {" "}
                        {r.suitability.treat[i]}
                      </span>
                    ))}
                  </div>

                  {/* {
                                        Object.keys(r.ingredients).map((iType) =>
                                        (
                                            <>
        
                                                <div><strong>Ingredients: {iType}</strong></div>
                                                
                                                {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`}  className="badge rounded-pill bg-dark" style={{color:"#ebd8b8"}}>
                                                 {info}
                                                </span>)}
                       
                                            </>)
                                        )
                                    } */}

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
                      className=" btn btn-dark my-1 ms-2"
                      style={{ color: "white" }}
                      onClick={() => {
                        this.view(r);
                        this.setState({ isEditVisible: true });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className=" btn btn-dark my-1 ms-2"
                      style={{ color: "white" }}
                      onClick={() => {
                        this.view(r);
                        this.setState({ isViewVisible: true });
                      }}
                    >
                      More
                    </button>

                    <button
                      className=" btn btn-dark my-1 ms-2"
                      style={{ color: "white" }}
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
