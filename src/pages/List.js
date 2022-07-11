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
            collection: response.data,
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
                                <li className="list-group-item  border border-dark border-3 r-3 m-2" style={{ background: "#ebd8b8" }}>
                                    <div>Soap Name: <span className="badge rounded-pill bg-primary mx-1">{r.soap_label}</span></div>
                                    <div>Country Origin: <span className="badge rounded-pill bg-primary mx-1">{r.country_origin}</span></div>
                                    <div>Color: <span className="badge rounded-pill bg-primary mx-1">{r.color}</span></div>

                                    {
                                        Object.keys(r.skin_type).map((i) =>
                                            <div>Skin_type:<span className="badge rounded-pill bg-success" key={`${i}`}>  {r.skin_type[i]}</span></div>
                                        )



                                    }

                                    {
                                        Object.keys(r.ingredients).map((iType) =>
                                        (
                                            <>
                                                {console.log('data=>', iType)}
                                                <div>Ingredients: {iType}</div>

                                                {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`} className="badge rounded-pill bg-success">
                                                    {info}
                                                </span>)}

                                            </>)
                                        )
                                    }

{
                                        Object.keys(r.suitability.treat).map((i) =>
                                            <div>Treat:<span className="badge rounded-pill bg-success" key={`${i}`}>  {r.suitability.treat[i]}</span></div>
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
                                        <a className="More  btn btn-secondary my-1" onClick={this.addNew}>More</a>
                                    </div>
                                </li>

                            </React.Fragment>)
                        }
                    </ul>
                </div>
            </React.Fragment>

        )
    }
}