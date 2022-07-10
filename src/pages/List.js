import React from 'react'
import axios from 'axios'
// import '../style.css'

export default class Listing extends React.Component {
    url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us53.gitpod.io/"

    state = {

        collection: []
    }

    async componentDidMount() {
        console.log("Soap listing did mount");
        let response = await axios.get(this.url + 'soap_listings')
        this.setState({
            collection: response.data
        })
    }
    render() {
        return (
            <React.Fragment>
                <div style={{ background: "#ebd8b8" }}>
                    <h1 className="AddForm">All Collections</h1>
                    <ul className="list-group item">
                        {
                            this.state.collection.map(r => <React.Fragment key={r._id}>
                                <li className="list-group-item  border border-dark border-3 r-3 m-2"  style={{ background: "#ebd8b8" }}>
                                    <div>Soap Name: <span className="badge bg-primary mx-1">{r.soap_label}</span></div>
                                    <div>Country Origin: <span className="badge bg-primary mx-1">{r.country_origin}</span></div>
                                    <div>Color</div>
                                    {
                                        r.color.map(i => <span key={i} className="badge bg-primary mx-1">
                                            {i}
                                        </span>)

                                    }
                                    {/* <h3>SkinType</h3>
                                    {
                                        r.skin_type.map(i => <span key={i} className="badge bg-danger mx-1">
                                            {i}
                                        </span>)

                                    } */}

                                    {
                                        Object.keys(r.skin_type).map((i) =>
                                        <div>Skin_type:<span className="badge bg-success mx-1" key={`${i}`}>  {r.skin_type[i]}</span></div>
                                                )
                                            
                                            
                                            
                                            }  

                                

                                    

                                    {
                                            Object.keys(r.ingredients).map((iType) =>
                                            (
                                                <>
                                                    {console.log('data=>', iType)}
                                                    <div>Ingredients: {iType}</div>

                                                    {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`} className="badge bg-success mx-1">
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
                                </li>
                            </React.Fragment>)
                        }
                    </ul>
                </div>
            </React.Fragment>

        )
    }
}