import React,{Component} from 'react';
import '../style/editProduct.css'
import Edit from './edit';
import Option from './option';
import Inventory from '../inventory';
import Shipping from './shipping';
import Attributes from './attributes';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit: true,
            option: false,
            inventory: false,
            shipping: false,
            attributes: false,

         }

        }
        edit(){
            this.setState({
            edit: true,
            option: false,
            inventory: false,
            shipping: false,
            attributes: false,
            })
        }
        option(){
        this.setState({
            edit: false,
            option: true,
            inventory: false,
            shipping: false,
            attributes: false,
        })
    }
    inventory(){
        this.setState({
            edit: false,
            option: false,
            inventory: true,
            shipping: false,
            attributes: false,
        })
    }
    attributes(){
        this.setState({
            edit: false,
            option: false,
            inventory: false,
            shipping: false,
            attributes: true,
        })
    }
    shipping(){
        this.setState({
            edit: false,
            option: false,
            inventory: false,
            shipping: true,
            attributes: false,
        })
    }

    render() { 
        return ( 
            <div>
                <div className='row' >
                        <div className='col-lg-9'>
                            <ul className='editProdUl' >
                                <li onClick={this.edit.bind(this)} className={this.state.edit!==false? 'active': void 0} > Edit</li>
                                <li onClick={this.option.bind(this)} className={this.state.option!==false? 'active': void 0}>Options</li>
                                <li onClick={this.inventory.bind(this)} className={this.state.inventory!==false? 'active': void 0}>Inventory</li>
                                <li onClick={this.shipping.bind(this)} className={this.state.shipping!==false? 'active': void 0}>Shipping</li>
                                <li onClick={this.attributes.bind(this)} className={this.state.attributes!==false? 'active': void 0}>Attributes</li>
                            </ul>

                            <div className='container' >
                                <div>
                                    {this.state.edit!==false? (<Edit/>):this.state.option!==false?(<Option/>)
                                    : this.state.inventory!==false ? (<Inventory/>) : this.state.shipping!==false ? (<Shipping/>)
                                    : this.state.attributes!==false ? (<Attributes/>) : void 0
                                }
                            </div>                        
                        </div>

                    </div>
                    
                 
                </div> 
            </div>
         );
    }
}
 
export default EditProduct;