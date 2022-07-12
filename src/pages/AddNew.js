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
        oilInput: '',
        oilIngredients: [],
        baseInput: '',
        baseIngredients: [],
        milkInput: '',
        milkIngredients: [],
        newTreat: [],
        newRecommended: '',
        newDate: '',
        submitted: false
    }


    colors = [

        {
            'show': 'Green',
            'value': 'green'
        },
        {
            'show': 'Blue',
            'value': 'blue'
        },
        {
            'show': 'Red',
            'value': 'red'
        },
        {
            'show': 'Yellow',
            'value': 'yellow'
        },
        {
            'show': 'Brown',
            'value': 'brown'
        },
        {
            'show': 'Black',
            'value': 'black'
        },
        {
            'show': 'Orange',
            'value': 'orange'
        },
        {
            'show': 'Purple',
            'value': 'purple'
        },
        {
            'show': 'White',
            'value': 'white'
        }
    ]

    countries = [


        {
            'show': 'Germany',
            'value': 'germany'
        },
        {
            'show': 'Russia',
            'value': 'russia'
        },
        {
            'show': 'Italy',
            'value': 'italy'
        },
        {
            'show': 'Uk',
            'value': 'uk'
        },
        {
            'show': 'Japan',
            'value': 'japan'
        },
        {
            'show': 'South Korea',
            'value': 'southkorea'
        },
        {
            'show': 'France',
            'value': 'france'
        },
        {
            'show': 'Singapore',
            'value': 'singapore'
        }

    ]



    skinType = [
        {
            'show': 'Sensitive',
            'value': 'sensitive'
        },
        {
            'show': 'Dry',
            'value': 'dry'
        },
        {
            'show': 'Oily',
            'value': 'oily'
        }
    ]


    treat = [
        {
            'show': 'Irritable skin',
            'value': 'irritable_skin'
        },
        {
            'show': 'Inflammation',
            'value': 'inflammation'
        },
        {
            'show': 'Skin Abrasion',
            'value': 'skin_Abrasion'
        },
        {
            'show': 'Skin Cuts',
            'value': 'skin_cut'
        }
    ]






    updateFormField = (i) => {
        this.setState({
            [i.target.name]: i.target.value
        })
    }



    addNew = async () => {


        this.setState({
            'submitted': true
        })

        await axios.post(this.url + 'soap_listings', {
            'name': this.state.newName,
            'email': this.state.newEmail,
            'contact_no': this.state.newContactNo,
            'soap_label': this.state.newSoapLabel,
            'image_url': this.state.newImageUrl,
            'color': this.state.newColor,
            'country_origin': this.state.newCountry,
            'cost': parseInt(this.state.newCost),
            'skin_type': this.state.newSkinType,
            'ingredients': {
                'oil_ingredient': this.state.oilIngredients,
                'base_ingredient': this.state.baseIngredients,
                'milk_ingredient': this.state.milkIngredients
            },
            'suitability': {
                'treat': this.state.newTreat,
                'recommended_use': this.state.newRecommended,
                'date_posted': this.state.newDate

            }




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
                    value={eachOne.value}
                    onChange={this.updateFormField}
                    checked={this.state.newColor === eachOne.value}
                />
                <span>{eachOne.show}</span>
            </React.Fragment>


            radioColor.push(selectedRb);
        }
        return radioColor;
    }


    // rendering all selected countries == dropdown
    showCountries = () => {

        let selectedCountry = this.countries.map(eachOne => {
            return <option key={eachOne.value} value={eachOne.value}>{eachOne.show}</option>
        })
        return selectedCountry;
    }


    // let ingredientInfo = i.target.value.split(",");
    // let oilList = []
    // for(let word of ingredientInfo){
    //     oilList.push(word.strip().trim());
    // }

    // let cloned = [...this.state.oilIngredients, ...oilList];
    // console.log("oilList: ",oilList);
    // this.setState({
    //     'oilIngredients':cloned
    // })

    showSkin = (e) => {
        if (this.state.newSkinType.includes(e.target.value)) {


            let indexToRemove = this.state.newSkinType.findIndex((eachOne) => {
                return eachOne === e.target.value
            })

            let cloned = [
                ...this.state.newSkinType.slice(0, indexToRemove),
                ...this.state.newSkinType.slice(indexToRemove + 1)
            ];
            this.setState({
                'newSkinType': cloned
            })
        } else {

            let cloned = [...this.state.newSkinType, e.target.value];
            this.setState({
                'newSkinType': cloned
            })
        }

    }


    removeOilTag = (i) => {
        let oilTagList = [
            ...this.state.oilIngredients.slice(0, i),
            ...this.state.oilIngredients.slice(i + 1)
        ];
        this.setState({ oilIngredients: oilTagList })
    }

    updateOilIngredients = (i) => {
        if ((i.key === 'Enter' || i.code === 'Enter') && i.target.value.trim() !== "") {
            console.log(this.state.oilIngredients)
            const testList = [...this.state.oilIngredients]
            testList.push(i.target.value.trim())
            console.log(i);
            console.log(testList);
            this.setState({ oilIngredients: testList })
            this.setState({ oilInput: "" })
        }

    }


    removeBaseTag = (i) => {
        let baseTagList = [
            ...this.state.baseIngredients.slice(0, i),
            ...this.state.baseIngredients.slice(i + 1)
        ];
        this.setState({ baseIngredients: baseTagList })
    }

    updateBaseIngredients = (i) => {
        if ((i.key === 'Enter' || i.code === 'Enter') && i.target.value.trim() !== "") {
            console.log(this.state.baseIngredients)
            const testList = [...this.state.baseIngredients]
            testList.push(i.target.value.trim())
            console.log(i);
            console.log(testList);
            this.setState({ baseIngredients: testList })
            this.setState({ baseInput: "" })
        }

    }



    removeMilkTag = (i) => {
        let milkTagList = [
            ...this.state.milkIngredients.slice(0, i),
            ...this.state.milkIngredients.slice(i + 1)
        ];
        this.setState({ milkIngredients: milkTagList })
    }

    updateMilkIngredients = (i) => {
        if ((i.key === 'Enter' || i.code === 'Enter') && i.target.value.trim() !== "") {
            console.log(this.state.milkIngredients)
            const testList = [...this.state.milkIngredients]
            testList.push(i.target.value.trim())
            console.log(i);
            console.log(testList);
            this.setState({ milkIngredients: testList })
            this.setState({ milkInput: "" })
        }

    }


    showTreatment = (e) => {
        if (this.state.newTreat.includes(e.target.value)) {


            let indexToRemove = this.state.newTreat.findIndex((eachOne) => {
                return eachOne === e.target.value
            })

            let cloned = [
                ...this.state.newTreat.slice(0, indexToRemove),
                ...this.state.newTreat.slice(indexToRemove + 1)
            ];
            this.setState({
                'newTreat': cloned
            })
        } else {

            let cloned = [...this.state.newTreat, e.target.value];
            this.setState({
                'newTreat': cloned
            })
        }

    }


    showNameError = () => {
        let nameLength = this.state.newName.length
        return (nameLength < 3 ? "Name should have more than 3 characters" : null)

    }
    showEmailError = () => {
        let email= this.state.newEmail.includes('@')
        return (!email ? "Email error.Please try again" : null)

    }
    showContactError = () => {
        let contact = this.state.newContactNo.length
        return ( contact < 3? "Contact should have more than 3 numbers" : null)

    }
    showContactError = () => {
        let contact = this.state.newContactNo.length
        return ( contact < 3? "Contact should have more than 3 numbers" : null)

    }



    render() {
        // console.log(this.state);
        return <React.Fragment>
            <div className="p-3 mx-2 my-3 col-sm col-md col-lg" >
                <div className="formNames row border border-dark border-2 m-2 rounded-3 p-3" style={{ backgroundColor: "#ebd8b8" }}>
                    <h2 className="title d-flex justify-content-center">Add New Soap</h2>

                    <div className="col-12 col-lg-4">
                        <div>
                            <label>Name</label>
                            <input name="newName" type="text" value={this.state.newName}
                                onChange={this.updateFormField}
                                className="form-control" />
                            {this.showNameError() && this.state.submitted ? <div style={{ color: 'red' }} className="error">{this.showNameError()}</div> : ""}
                        </div>
                        <div >
                            <label>Email</label>
                            <input name="newEmail" type="text" value={this.state.newEmail}
                                onChange={this.updateFormField}
                                className="form-control" />
                        {this.showEmailError() && this.state.submitted ? <div style={{ color: 'red' }} className="error">{this.showEmailError()}</div> : ""}
                        </div>
                        <div >
                            <label>Contact No</label>
                            <input name="newContactNo" type="text" value={this.state.newContactNo}
                                onChange={this.updateFormField}
                                className="form-control" />
                                 {this.showContactError() && this.state.submitted ? <div style={{ color: 'red' }} className="error">{this.showContactError()}</div> : ""}
                        </div>
                        <div >
                            <label>Soap Label</label>
                            <input name="newSoapLabel" type="text" value={this.state.newSoapName}
                                onChange={this.updateFormField}
                                className="form-control" />
                        </div>
                        </div>

                        
                        <div className="col-12 col-lg-4">
                        <div >
                            <label>Image URL</label>
                            <input name="newImageUrl" type="text" value={this.state.newImageUrl}
                                onChange={this.updateFormField}
                                className="form-control" />
                        </div>
                        <div>
                            <label>Cost</label>
                            <input name="newCost" type="number" value={parseInt(this.state.newCost)}
                                onChange={this.updateFormField}
                                className="form-control" />
                        </div>
                        <div >
                            <label>Recommended Use</label>
                            <input name="newRecommended" type="text" value={this.state.newRecommended}
                                onChange={this.updateFormField}
                                className="form-control" />
                        </div>
                        <div >
                            <label>Date Posted</label>
                            <input name="newDate" type="text" value={this.state.newDate}
                                onChange={this.updateFormField}
                                className="form-control" />
                        </div>
                    </div>
                    
                    <div className="col-12 col-lg-4">
                        <div>
                            <label>Country Origin</label>
                            <select name="newCountry" value={this.state.newCountry} onChange={this.updateFormField}>
                                {this.showCountries()}
                            </select>
                        </div>
                        <div>
                            <label>Color</label>
                            {this.showColors()}
                        </div>
                        <div>
                            <label>Skin Type</label>
                            {this.skinType.map(eachOne => {
                                return <React.Fragment key={eachOne.value}>
                                    <input type="checkbox"
                                        name="newSkinType"
                                        value={eachOne.value}
                                        onChange={this.showSkin}
                                        checked={this.state.newSkinType.includes(eachOne.value)}
                                    />
                                    <span>{eachOne.show}</span>
                                </React.Fragment>
                            })}
                        </div>
                        <div>
                            <label>Treat</label>
                            {this.treat.map(eachOne => {
                                return <React.Fragment key={eachOne.value}>
                                    <input type="checkbox"
                                        name="newTreat"
                                        value={eachOne.value}
                                        onChange={this.showTreatment}
                                        checked={this.state.newTreat.includes(eachOne.value)}
                                    />
                                    <span>{eachOne.show}</span>
                                </React.Fragment>
                            })}
                        </div>
                        <div>
                            <label>Oil Ingredients</label>
                            <div class="chipsWrapper" id="chipParent">
                                {
                                    this.state.oilIngredients.map((iType, i) =>
                                    (
                                        <>
                                            <span key={`${iType}`} className="badge badge-pill bg-dark mx-1">
                                                {iType}
                                                <span onClick={() => this.removeOilTag(i)} style={{ marginLeft: "5px" }}>X</span></span>

                                        </>)
                                    )
                                }

                            </div>
                            <input type="text" name="oilInput" placeholder="<name> <Enter to add>" value={this.state.oilInput} onKeyDown={this.updateOilIngredients} onChange={this.updateFormField} />
                        </div>

                        <div>
                            <label>Base Ingredients</label>
                            <div class="chipsWrapper" id="chipParent">
                                {
                                    this.state.baseIngredients.map((iType, i) =>
                                    (
                                        <>
                                            <span key={`${iType}`} className="badge badge-pill bg-dark mx-1">
                                                {iType}
                                                <span onClick={() => this.removeBaseTag(i)} style={{ marginLeft: "5px" }}>X</span></span>

                                        </>)
                                    )
                                }
                            </div>
                            <input type="text" name="baseInput" placeholder="<name> <Enter to add>" value={this.state.baseInput} onKeyDown={this.updateBaseIngredients} onChange={this.updateFormField} />

                        </div>

                        <div>
                            <label>Milk Ingredients</label>
                            <div class="chipsWrapper" id="chipParent">
                                {
                                    this.state.milkIngredients.map((iType, i) =>
                                    (
                                        <>
                                            <span key={`${iType}`} className="badge badge-pill bg-dark mx-1">
                                                {iType}
                                                <span onClick={() => this.removeMilkTag(i)} style={{ marginLeft: "5px" }}>X</span></span>

                                        </>)
                                    )
                                }
                            </div>
                            <input type="text" name="milkInput" placeholder="<name> <Enter to add>" value={this.state.milkInput} onKeyDown={this.updateMilkIngredients} onChange={this.updateFormField} />

                        </div>
                    </div>

                    <br />
                    <div className=" text-center ms-auto">
                        <a className="AddBtn btn btn-dark my-1" style={{ color: "#ebd8b8" }} onClick={this.addNew}>Add</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}