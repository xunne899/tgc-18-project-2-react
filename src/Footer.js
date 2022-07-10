import React from 'react'; // const React = require('react)
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default class Footer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <footer>
                    <div className="footer col-12">
                        <div style={{"backgroundColor": "#212529" }}>

                            <div className="copyright d-inline-block justify-items-center p-2" style={{ color: "#ebd8b8", fontFamily: "Jost, sans-serif", marginLeft: "10px" }}>

                                Copyright@2022 | For Educational Purposes | <FontAwesomeIcon icon={faFacebook} />&nbsp;
                                <FontAwesomeIcon icon={faWhatsapp} />&nbsp;
                                <FontAwesomeIcon icon={faTwitter} />&nbsp;
                                <FontAwesomeIcon icon={faInstagram} />


                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}
