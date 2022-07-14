import React from 'react'
import axios from 'axios'

// import '../style.css'

import InfoModal from "./InfoModal";


export default class Listing extends React.Component {
    url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/"

    state = {
        collection: [],
        deletecollection:[],
        collectionDeleted: null,
        submitted: false,
    }



    async componentDidMount() {
        console.log("Soap listing did mount");
        let response = await axios.get(this.url + 'soap_listings')
        this.setState({
            collection: response.data,
        })

    }
    // async componentDidMount() {
    //     let deleteresponse = await axios.delete(this.url + 'soap_listings/:id')
    //     this.setState({
    //         deletecollection:deleteresponse.data,
    //     })
    // }



    updateFormField = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    
      renderAddUser() {
        return (
          <React.Fragment>
            <input
              type="text"
              placeholder="User name"
              value={this.state.newUserName}
              onChange={this.updateFormField}
              name="newUserName"
            />
            <input
              type="text"
              placeholder="User email"
              value={this.state.newUserEmail}
              onChange={this.updateFormField}
              name="newUserEmail"
            />
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




    //   processDeleteCollection = async (p) => {
    //     let index = this.state.collection.findIndex(e=> e._id === p._id)
    //     console.log(index)
    //     const cloned =[
    //         ...this.state.collection.slice(0,index),
    //         ...this.state.collection.slice(index+1)
    //     ]

    //     this.setState({
    //         collection:cloned,
    //         submitted:true
    //     })
    
    //     //let newSkinType = this.state.newSkinType.map(s=>s.value)
    //     // let deleted_id = this.state.collection.map((s) => s.value);
    
    //     //console.log(newSkinType);
    //     // console.log(newSkinType);
    //     await axios.delete(this.url + "soap_listings/:id", {
    //         '_id': this.state.collection
    //     });
    //     this.props.goTo("collection");
    //   };






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

 
   





    render(){

     
        return (
            <React.Fragment>
                <div className="border border-dark border-3 rounded-3 m-4" style={{ background: "#ebd8b8" }}>
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
                                        <InfoModal/>
                                        <button className=" btn btn-dark my-1" style={{color:"#ebd8b8"}} onClick={this.processDeleteCollection}>Delete</button>
                                    </div>



                                      
                                </li>
                         
                            </React.Fragment>)
                        }
                    {/* </ul> */}
                    </div>
                </div>
            </React.Fragment>

        )
    }
}