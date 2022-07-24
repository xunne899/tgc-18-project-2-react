import { render } from '@testing-library/react'
import React from 'react'



export default function HomeImage(props) {

return(

<div style={{'background': props.bgC}}>
<section id="ref">
    <div id="cta">
        <a  href="#">
           { props.msg}
        </a >
    </div>
</section>
</div>
)
}