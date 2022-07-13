import React from 'react'
import axios from 'axios'
// import '../style.css'

export default class Listing extends React.Component {
    url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/"

    state = {
        collection: []
    }



    async componentDidMount() {
        console.log("Soap listing did mount");
        let response = await axios.get(this.url + 'soap_listings')
        this.setState({
            collection: response.data,
        })

    }
    render() {
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
                                        <a className="More btn btn-dark my-1" style={{color:"#ebd8b8"}} onClick={this.addNew}>More</a>
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