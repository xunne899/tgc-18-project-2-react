import React from 'react';
// import { Container, Row, Button, Card, Col } from 'react-bootstrap';


export default class Browse extends React.Component {


  // url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us53.gitpod.io/"

  // state = {
  //     full_collection: [],
  //     collection: []
  // }



  // async componentDidMount() {
  //     console.log("Soap listing did mount");
  //     let response = await axios.get(this.url + 'soap_listings')
  //     this.setState({
  //         full_collection: response.data,
  //         collection: response.data,
  //     })

  //     let filterCollection = []
  //     console.log(response.data)
  //     for(let data of response.data){
  //         for(let soapColor of data.color){
  //             if(soapColor.includes("blue")){
  //                 filterCollection.push(data);
  //             }

  //             continue;
  //         }

  //         if(data.soap_label.includes("vanilla")){
  //             filterCollection.push(data);
  //             continue;
  //         }
  //     }
  //     console.log("filtered lst: ", filterCollection)

  //     this.setState({
  //         collection: filterCollection
  //     })
  // }
  render() {
    return (
      <React.Fragment>

        <div>
          <label>Color</label>
          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="white" />
          <label class="form-check-label">White</label>

          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="orange" />
          <label class="form-check-label">Orange</label>

          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="red" />
          <label class="form-check-label" >Red</label>

          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="blue" />
          <label class="form-check-label" >Blue</label>

          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="green" />
          <label class="form-check-label" >Green</label>

          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="yellow" />
          <label class="form-check-label" >Yellow</label>

          <input type="checkbox" onChange={this.newColor} className="form-check-input" name="color" value="Orange" />
          <label class="form-check-label" >Orange</label>
        </div>
        <div>
          <label>Country:</label>
          <select
          // name="country" value={this.state.country} onChange={this.updateFormField}
          >
            <option value="germany">Germany</option>
            <option value="russia">Russia</option>
            <option value="italy">Italy</option>
            <option value="uk">UK</option>
            <option value="france">France</option>
            <option value="singapore">Singapore</option>
          </select>
        </div>
        <div>
          <label>Cost</label>
          <div>
            <label>Max Amount</label>
            <input
              className='form-control'
              type="text"
              //   name="searchCost"
              //   value={this.state.cost}
              placeholder="Max"
            //   onChange={this.updateSearchFormField} 
            />
            <label>Min Amount</label>
            <input
              className='form-control'
              type="text"
              //   name="searchCost"
              //   value={this.state.cost}
              placeholder="Min"
            //   onChange={this.updateSearchFormField} 
            />
          </div>
        </div>
        <div>
          <label>Skin Type</label>
          <input type="checkbox" onChange={this.newSkin} className="form-check-input" name="color" value="sensitive" />
          <label class="form-check-label">Sensitive</label>

          <input type="checkbox" onChange={this.newSkin} className="form-check-input" name="color" value="oily" />
          <label class="form-check-label">Oily</label>

          <input type="checkbox" onChange={this.newSkin} className="form-check-input" name="color" value="dry" />
          <label class="form-check-label" >Dry</label>

        </div>
        <div>
          <label>Oil Ingredients</label>
          <input type="checkbox" onChange={this.newOil} className="form-check-input" name="color" value="coconut oil" />
          <label class="form-check-label">Coconut oil</label>
          <input type="checkbox" onChange={this.newOil} className="form-check-input" name="color" value="butter oil" />
          <label class="form-check-label">Butter oil</label>
          <input type="checkbox" onChange={this.newOil} className="form-check-input" name="color" value="butter oil" />
          <label class="form-check-label">Grapeseed oil</label>


        </div>
        <div>
          <label>Base Ingredients</label>
          <input type="checkbox" onChange={this.newBase} className="form-check-input" name="color" value="coconut oil" />
          <label class="form-check-label">Mugwort Powder</label>
          <input type="checkbox" onChange={this.newBase} className="form-check-input" name="color" value="butter oil" />
          <label class="form-check-label">Tomato Powder</label>
          <input type="checkbox" onChange={this.newBase} className="form-check-input" name="color" value="butter oil" />
          <label class="form-check-label">Tumeric Powder</label>


        </div>
        <div>
          <label>Milk Ingredients</label>
          <input type="checkbox" onChange={this.newMilk} className="form-check-input" name="color" value="coconut oil" />
          <label class="form-check-label">Butter Milk</label>
          <input type="checkbox" onChange={this.newMilk} className="form-check-input" name="color" value="butter oil" />
          <label class="form-check-label">Oatmeal Milk</label>
          <input type="checkbox" onChange={this.newMilk} className="form-check-input" name="color" value="butter oil" />
          <label class="form-check-label">Goat Milk</label>


        </div>


      </React.Fragment>
    )
  }
}


