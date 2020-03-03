import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import './style/inventory.css'

const log = console.log
class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            carts: undefined,
            selectedCart: ''
         }
    }
    onChange= e => this.setState({[e.target.name]: e.target.value})
    componentDidMount() {
        axios.get('http://localhost:5000/api/getCartOwners')
        .then(res => {
            log('carta ka data',res.data);
            this.setState({
                carts: res.data
            })
        })
        .catch(err => log('cart ka error',err))

       

    }

    render() { 
        let filteredCart=[]
        log(this.state)
        if(this.props.products){
            let products = this.props.products;
            products.forEach(e => {
                if(e.cartStock.length>=1){

                    e.cartStock.forEach(el => {
                        if(el.cart===this.state.selectedCart){
                           
                            filteredCart.push({cart:el.cart,stock:el.stock,product:e.name,image:e.image[0],status:e.status,alarmingStock:e.alarmingStock})
                        }
                      })
                }
            });
            log('if k andr sy',filteredCart)
            // this.setState({

            // })
        }
        // log(this.props.products,filteredCart)

        return ( 
            <div>
             <div className='row' style={{marginTop: '10px'}}>
                <div className='col' >
                    <ul className='inventoryUl' >
                        <li>Carts</li>
                        <li>others</li>
                    </ul>
                </div>
                {/* <div className='col dropdown' style={{paddingLeft: '0px'}}>
                    <button style={{backgroundColor: '#FB005B',color: '#fff', fontSize: '20px'}} className='dropdown-toggle btn btn-block' type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">New Cart</button>
                     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: '100%',padding: '0px 15px'}}>
                        
                     </div>
                </div> */}
             </div>

             <div className='row' >
                <div class="col">
                    {/* <label for="exampleFormControlSelect1">Example select</label> */}
                    <select style={{width: '100%'}} class="custom-select" id="exampleFormControlSelect1" name='selectedCart' onChange={this.onChange} value={this.state.selectedCart} >
                      <option>Select Any Cart</option>
                      {
                          this.state.carts!==undefined ?
                          this.state.carts.map((item,index) => {
                              return (
                                  <option key={index} value={item.cart} > {item.cart} </option>
                              )
                          })
                          :
                          <option>Loading.......</option>
                      }              
                    </select>
                </div>
             </div>

          {filteredCart.length==0 ? (<div class="alert alert-danger" role="alert" style={{marginTop: '40px'}} >
                Please Select any cart from above</div>)
                :
                (
                  <table class="table" style={{marginTop: '40px'}} >
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">item</th>
                        <th scope="col">Product</th>
                        <th scope="col">Cart</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Alarming Stock</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {filteredCart.map((item,index)=>{
                           return (
                            <tr>
                                <th scope="row"> {index+1}</th>
                                <td> <img src={item.image} width='70' height='70'  /> </td>
                                <td>{item.product}</td>
                                <td>{item.cart}</td>
                                <td> {item.stock} </td>
                                <td style={{color: 'red'}} > {item.alarmingStock} </td>
                                <td  >  <span style={{backgroundColor: '#FFF3CD',color: 'brown',padding: '15px',fontWeight:600}} > {item.status} </span> </td>
                            </tr> 
                           )
                       })}                     
                    </tbody>
                 </table>
                )}

          </div>
         );
    }
}

// redux

const mapStateToprops = state => {
    log('redux nechy sy invntry ki', state)
    return {
        products: state.products.products
    }
}
 
export default connect(mapStateToprops,null)(Inventory);