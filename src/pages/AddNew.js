import axios from 'axios'
import React from 'react'
// import { Form, Container, Row, Button, Card, Col } from 'react-bootstrap';

export default class AddNew extends React.Component {

    url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us53.gitpod.io/"



    state = {
        newName: '',
        newEmail: '',
        newContactNo: '',
        newSoapLabel: '',
        newImageUrl: null,
        newColor: '',
        newCountry: '',
        newCost: 0,
        newSkinType: [],
        newIngredients: [],
        newSuitability: []
    }


    colors = [

        {
            'display': 'Green',
            'value': 'green'
        },
        {
            'display': 'Blue',
            'value': 'blue'
        },
        {
            'display': 'Red',
            'value': 'red'
        },
        {
            'display': 'Yellow',
            'value': 'yellow'
        },
        {
            'display': 'Brown',
            'value': 'brown'
        },
        {
            'display': 'Black',
            'value': 'black'
        },
        {
            'display': 'Orange',
            'value': 'orange'
        },
        {
            'display': 'Purple',
            'value': 'purple'
        },
        {
            'display': 'White',
            'value': 'white'
        }
    ]

    countries = [
        
   
        {
            'display': 'Germany',
            'value': 'germany'
        },
        {
            'display': 'Russia',
            'value': 'russia'
        },
        {
            'display': 'Italy',
            'value': 'italy'
        },
        {
            'display': 'Uk',
            'value': 'uk'
        },
        {
            'display': 'China',
            'value': 'china'
        },
        {
            'display': 'Japan',
            'value': 'japan'
        },
        {
            'display': 'South Korea',
            'value': 'southkorea'
        },
        {
            'display': 'France',
            'value': 'france'
        },
        {
            'display': 'Indonesia',
            'value': 'indonesia'
        },
        {
            'display': 'Singapore',
            'value': 'singapore'
        },
        {
            'display': 'Malaysia',
            'value': 'malaysia'
        },
        {
            'display': 'Vietnam',
            'value': 'vietnam'
        },
        {
            'display': 'Thailand',
            'value': 'thailand'
        }
    ]


    
    skinType = [
        {
            'display':'Sensitive',
            'value':'sensitive'
        },
        {
            'display':'Dry',
            'value':'dry'
        },
        {
            'display':'Oily',
            'value':'oily'
        }
    ]


    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    addNew = async () => {
        await axios.post(this.url + 'soap_listings', {
            'name': this.state.newName,
            'email': this.state.newEmail,
            'contact_no': this.state.newContactNo,
            'soap_label': this.state.newSoapLabel,
            'image_url': this.state.newImageUrl,
            'country_origin': this.state.newCountry,
            'cost': this.state.newCost,
            'skin_type': this.state.newSkinType,
            'ingredients': this.state.newIngredients,
            'suitability': this.state.newSuitability


        })
        this.props.goTo('collection')
    }

    // rendering all selected colors == radiobutton
    showColors = () => {
        let radioColor = []
        for (let eachOne of this.colors) {
            let selectedRb = <React.Fragment key={eachOne.value}>
                <input type="radio"
                    name="newColor"
                    checked={this.state.newColor === eachOne.value}
                    value={eachOne.value}
                    onChange={this.updateFormField}
                />
                <span>{eachOne.display}</span>
            </React.Fragment>


            radioColor.push(selectedRb);
        }
        return radioColor;
    }



    // rendering all selected countries == dropdown
    showCountries = () => {

        let selectedCountry = this.countries.map(eachOne => {
            return <option key={eachOne.value} value={eachOne.value}>{eachOne.display}</option>
        })
        return selectedCountry;
    }



    showSkin = (e) => {
        if (this.state.newSkinType.includes(e.target.value)) {

     
         let indexToRemove = this.state.newSkinType.findIndex((eachOne)=>{
             return eachOne === e.target.value
         })
    
         let cloned = [ 
             ...this.state.newSkinType.slice(0, indexToRemove), 
             ...this.state.newSkinType.slice(indexToRemove+1)
           ];
         this.setState({
             'newSkinType':cloned
         })
   } else {
     
        let cloned = [...this.state.newSkinType, e.target.value];
        this.setState({
            'newSkinType': cloned
        })
   }



}

    render() {
        return <React.Fragment>

            <div className="formNames border border-dark border-2 m-2 rounded-3 p-3" style={{ backgroundColor: "#ebd8b8" }}>
                <h2 className="title d-flex justify-content-center">Add New Soap</h2>
                <div>
                    <label>Name</label>
                    <input name="newName" type="text" value={this.state.newName}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div >
                    <label>Email</label>
                    <input name="newEmail" type="text" value={this.state.newEmail}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div >
                    <label>Contact No</label>
                    <input name="newContactNo" type="text" value={this.state.newContactNo}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div >
                    <label>Soap Label</label>
                    <input name="newSoapLabel" type="text" value={this.state.newSoapName}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div >
                    <label>Image URL</label>
                    <input name="newImageUrl" type="text" value={this.state.newImageUrl}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div>
                    <label>Color</label>
                    {this.showColors()}
                </div>
                <div>
                    <label>Country Origin</label>
                    <select name="newCountry" value={this.state.newCountry} onChange={this.updateFormField}>
                    {this.showCountries()}    
                    </select>
                </div>
                <div>
                    <label>Cost</label>
                    <input name="newCost" type="number" value={this.state.newCost}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div>
                    <label>Skin Type</label>
                    { this.skinType.map(eachOne=>{
                    return <React.Fragment key={eachOne.value}>
                        <input type="checkbox"
                                name="newSkinType"
                                value={eachOne.value}
                                onChange={this.showSkin}
                                checked={this.state.newSkinType.includes(eachOne.value)}
                        />
                        <span>{eachOne.display}</span>
                    </React.Fragment>
                })}
                </div>
                <div>
                    <label>Ingredients</label>
                    <input name="newIngredients" type="text" value={this.state.newIngredients}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <div>
                    <label>Suitability</label>
                    <input name="newSuitability" type="text" value={this.state.newSuitability}
                        onChange={this.updateFormField}
                        className="form-control" />
                </div>
                <br/>
                <div className=" text-center ms-auto">
                <a className="AddBtn  btn btn-dark my-1" onClick={this.addNew}>Add</a>
                </div>
            </div>

        </React.Fragment>
    }
}