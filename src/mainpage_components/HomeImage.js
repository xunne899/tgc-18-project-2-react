
import React from 'react'


export default function HomeImage(props) {

return(

<div style={{'background': props.bgC,"fontFamily": props.fontFamily}}>
<section id="ref">
    <div className="d-flex flex-column align-items-center justify-content-center" id="cta">
        <div>
           { props.msg}      
        </div>
        <button onClick={() => props.goTo('search')} className="btn btn-dark btn-lg mt-3">Browse</button>
    </div>
</section>
</div>

)
}