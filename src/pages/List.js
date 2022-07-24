import React from "react";
import axios from "axios";
import "../components/InfoModal/index.css";


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
    this.setState({
      collection: response.data,
    });
  };


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
    

    await axios.delete(this.url + `soap_listings/${r._id}`); // delete

    let response = await axios.get(this.url + "soap_listings"); // get all data
    this.setState({
      collection: response.data,
    });
    
  };

  
  render() {
    return (
      <React.Fragment>

        <div className="m-4 d-flex justify-content-center" style={{ background: "white" }}>

          <div className="row d-flex justify-content-center col-sm-12 col-md-12 col-lg-8">

            {this.state.collection.map((r) => (
              <React.Fragment key={r._id}>
                <li className="list-group-item item rounded-3 m-2" style={{ background: "white" }}>

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
                         
                      

                          <span className="badge bg-dark mx-1" style={{ color: "white",fontFamily:"League Spartan" }}>
                            {r.country_origin}
                          </span>

                          <span className="badge bg-dark mx-1" style={{ color: "white",fontFamily:"League Spartan" }}>
                            ${r.cost}
                          </span>
                     
                          <span className="badge mx-1" style={{backgroundColor:"#ECECEC", color: "black",fontFamily:"League Spartan" }}>
                            {r.color}
                          </span>

                       

                          {Object.keys(r.skin_type).map((i) => (
                            <span className="badge ms-1" style={{ backgroundColor:"#ECECEC", color: "black",fontFamily:"League Spartan" }} key={`${i}`}>
                              {" "}
                              {r.skin_type[i]}
                            </span>
                          ))}

                        </div>
   
                    
                          <div className="d-flex justify-content-between gap-1 mt-4" style={{ fontFamily:"League Spartan" }}>
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
