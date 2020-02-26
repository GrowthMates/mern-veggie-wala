import React,{Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {addProduct} from '../../store/actions/productsAction'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';



class AddProduct extends Component{
    constructor(){
        super();
        this.state={
            addName:undefined,
            addPrice:undefined,
            addDiscountedPrice:undefined,
            addStock:undefined,
            addCategory:undefined,
            addTag:undefined,
            addDescription:undefined,
            addColors:[],
            addSizes:[],
            image:''

        }
        this.onChangeImage = this.onChangeImage.bind(this);
        this.handleChangeMultiple = this.handleChangeMultiple.bind(this);
        this.setPersonName = this.setPersonName.bind(this);

    }
    onChangeImage = e => {
        this.setState({ image: e.target.files[0] });
        };
    // onChangePrice(eve){
        // var abc = e.target.value[e.target.value.length-1]!=='0'
     
    //   if(eve.target.value[eve.target.value.length-1]!=='e'){
        // console.log('Price onshange=======',eve.target.value)
    //     this.setState({
    //         [eve.target.name]: eve.target.value
    //     }) 
    // }
    setPersonName = (value, name) => {
        this.setState({
            [name]:value
        })
    }
     handleChangeMultiple = event => {
         event.preventDefault();
         console.log('handle-change-multiple---',event.target.value,this.state.addColors,this.state.addSizes)
        const value= event.target.value;
        // const values = [];
        // for (let i = 0, l = value.length; i < l; i += 1) {
        //   if (value[i].selected) {
        //     values.push(value[i]);
        //   }
        // }
        console.log('value===',value)
        this.setState({
            [event.target.name]:value[0].split(",")
        })
      };   

    onSubmit = e => {
        e.preventDefault();
        const {addName,addPrice,addStock,addDescription,title,image} = this.state
        console.log('oNsubmit State-------',this.state)
            let formData = new FormData();
                formData.append("name", this.state.addName);
                formData.append("description", this.state.addDescription);
                formData.append("price", this.state.addPrice);
                formData.append("discountedPrice", this.state.addDiscountedPrice);
                formData.append("stock", this.state.addStock);
                formData.append("category", this.state.addCategory);
                formData.append("tag", this.state.addTag);
                formData.append("sizes", this.state.addSizes);
                formData.append("colors", this.state.addColors);
                formData.append("image", this.state.image);
                console.log('New product-------',formData)
            this.props.addProduct(formData, this.props.history);

            this.setState({
            addName: "",
            addDescription: '',
            addPrice: '',
            addStock:'',
            addCategory:'',
            addSizes:'',
            addDiscountedPrice:'',
            addColors:'',
            addTag:'',
            image:'',
            
            });

            // console.log(newProduct)
      };

    render(){
        return(
            <div className='addProduct-parent'>
                <div className='col-md-6'>
                             <h1>Product</h1>
                        </div>
                        
                          <div className='col-md-6'>
                          <button type="button" class="btn btn-primary" data-toggle="modal" data-target='#exampleModalCenter'>
                               Add product
                          </button>

                            <div class="modal " id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                      <form onSubmit={this.onSubmit}>
                                    <div class="modal-body number">
                                      <input label="Image"
                                      type="file" 
                                      required
                                      className="form-input"
                                      onChange={this.onChangeImage} 
                                       /> <br/>
                                      <TextField required value={this.state.addName} 
                                         onChange={eve => this.setState({addName: eve.target.value} )} label="Name" /> <br/>
                                      <TextField required value={this.state.addPrice} 
                                         type='number'
                                         onChange={eve => this.setState({ addPrice: eve.target.value })} label="Price" /> <br/>
                                         <TextField required value={this.state.addDiscountedPrice} 
                                         type='number'
                                         onChange={eve => this.setState({ addDiscountedPrice: eve.target.value })} label="Discounted-Price" /> <br/>
                                      <TextField required value={this.state.addStock} type='number'
                                         onChange={eve => this.setState({addStock: eve.target.value} )} label="Stock" /> <br/>

                                        <InputLabel id="demo-mutiple-chip-label">Colors</InputLabel>
                                                <Select
                                                labelId="demo-mutiple-chip-label"
                                                id="demo-mutiple-chip"
                                                multiple
                                                name='addColors'
                                                value={this.state.addColors}
                                                onChange={this.handleChangeMultiple}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={selected => (
                                                    <div style={{display: 'flex', flexWrap: 'wrap',}}>
                                                    {selected.map(value => (
                                                        <Chip key={value} label={value} style={{margin: 2,}} />
                                                    ))}
                                                    </div>
                                                )}
                                                >
                                                {['red','green','blue','orange'].map(name => (
                                                    <MenuItem key={name} value={name}>
                                                    {name}
                                                    </MenuItem>
                                                ))}
                                                </Select>
                                                
                                                <br/>

                                                <InputLabel id="demo-mutiple-chip-label">Sizes</InputLabel>
                                                <Select
                                                labelId="demo-mutiple-chip-label"
                                                id="demo-mutiple-chip"
                                                multiple
                                                name='addSizes'
                                                value={this.state.addSizes}
                                                onChange={this.handleChangeMultiple}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={selected => (
                                                    <div style={{display: 'flex', flexWrap: 'wrap',}}>
                                                    {selected.map(value => (
                                                        <Chip key={value} label={value} style={{margin: 2,}} />
                                                    ))}
                                                    </div>
                                                )}
                                                >
                                                {['s','m','l','xl'].map(name => (
                                                    <MenuItem key={name} value={name}>
                                                    {name}
                                                    </MenuItem>
                                                ))}
                                                </Select>
                                                <br/>


                                         
                                          <TextField required value={this.state.addCategory} 
                                         onChange={eve => this.setState({addCategory: eve.target.value} )} label="Category" /> <br/>
                                          <TextField required value={this.state.addTag} 
                                         onChange={eve => this.setState({addTag: eve.target.value} )} label="Product-Tag" /> <br/>
                                       <TextField required value={this.state.addDescription} 
                                         onChange={eve => this.setState({addDescription: eve.target.value} )} label="Description" /> <br/>
                                     
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Add Product </button>
                                    </div>
                            </form>
                                  </div>
                                </div>
                            </div>                        
                         </div>
            </div>
        );
    }


}
export default connect(
    null,
    {addProduct}
)(AddProduct)