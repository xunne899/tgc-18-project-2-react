import React from 'react'

export default function Logo(props){
    return (
           <img src={props.LogoFile}
         style = {{height: "50px",width:"150px"}}
         />)
  }