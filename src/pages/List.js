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
                <div  style={{ background: "#ebd8b8" }}>
                    <h1 className="AddForm">All Collections</h1>
                    <ul className="list-group">
                        {
                            this.state.collection.map(r => <React.Fragment key={r._id}>
                                <li className="list-group-item" style={{ background: "#ebd8b8" }}>
                                    <h3>Soap Name: {r.soap_label}</h3>
                                    <h3>Country Origin: {r.country_origin}</h3>
                                    {
                                        r.color.map(i => <span key={i} className="badge bg-primary mx-1">
                                            Color:{i}
                                        </span>)

                                    }
                                    {
                                        r.skin_type.map(i => <span key={i} className="badge bg-danger mx-1">
                                            SkinType:{i}
                                        </span>)

                                    }
                                    {
                                        Object.keys(r.ingredients).map((iType) =>
                                        (
                                            <>
                                                {console.log('data=>', iType)}
                                                <div>Skin Type: {iType}</div>

                                                {r.ingredients[iType].map((info, i) => <span key={`${iType}_${i}`} className="badge bg-danger mx-1">
                                                    {info}
                                                </span>)}

                                            </>)
                                        )
                                    }
                                </li>
                            </React.Fragment>)
                        }
                    </ul>
                </div>
            </React.Fragment>

        )
    }
}