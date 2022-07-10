import axios from 'axios'
import React from 'react'


export default class AddNew extends React.Component{
    
    url ="https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us53.gitpod.io/"

    
    
    state = {
        newName:'',
        newEmail:'',
        newContactNo:'',
        newSoapLabel:'',
        newImageUrl:null,
        newColor:[],
        newCountry:'',
        newCost:0,
        newSkinType:[],
        
    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    addNew = async () => {
        await axios.post(this.url + 'soap_listings', {
            'soap_label': this.state.newSoapLabel,
            'country_origin': this.state.newCountry,

        })
        this.props.changePage('collection')
    }

    render() {
        return <React.Fragment>
            <div className="block-example border border-dark p-3" style={{background:"#ebd8b8"}}>
            <h2 >Add New Soap</h2>
            <div >
                <label>Name</label>
                <input name="newName" type="text" value={this.state.newSoapName} 
                       onChange={this.updateFormField} 
                       className="form-control"/>
            </div>
            <div >
                <label>Email</label>
                <input name="newEmail" type="text" value={this.state.newSoapName} 
                       onChange={this.updateFormField} 
                       className="form-control"/>
            </div>
            <div >
                <label>Contact No</label>
                <input name="newEmail" type="text" value={this.state.newSoapName} 
                       onChange={this.updateFormField} 
                       className="form-control"/>
            </div>
            <div >
                <label>Soap Label</label>
                <input name="newSoapLabel" type="text" value={this.state.newSoapName} 
                       onChange={this.updateFormField} 
                       className="form-control"/>
            </div>
            <div >
                <label>Image URL</label>
                <input name="newImageUrl" type="text" value={this.state.newSoapName} 
                       onChange={this.updateFormField} 
                       className="form-control"/>
            </div>
            <div>
                <label>Color</label>
                <input name="newColor" type="text" value={this.state.newColor}
                       onChange={this.updateFormField}
                       className="form-control"/>
            </div>
            <div>
                <label>Country Origin</label>
                <input name="newCountry" type="text" value={this.state.newCountry}
                       onChange={this.updateFormField}
                       className="form-control"/>
            </div>
            <div>
                <label>Cost</label>
                <input name="newColor" type="text" value={this.state.newCost}
                       onChange={this.updateFormField}
                       className="form-control"/>
            </div>
            <div>
                <label>Skin Type</label>
                <input name="newSkinType" type="text" value={this.state.newSkinType}
                       onChange={this.updateFormField}
                       className="form-control"/>
            </div>
         
            <button className="btn btn-dark my-1" onClick={this.addNew}>Add</button>
            </div>
            </React.Fragment>
    }
}