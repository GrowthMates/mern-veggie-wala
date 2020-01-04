import React,{Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import './cart.css'
import ImageApple from '../../centralized/images/apple.jpg'
import DeleteBtnIcon from '../../centralized/images/delete-button.png'
import {userCart} from '../../../actions/productsAction'



 class Cart extends Component{
     constructor(Props){
        super(Props);
        this.state={
            cartProducts: JSON.parse(localStorage.getItem('addCart')) ,
            loader:true
        }
     }
     componentDidMount(){
         console.log('DID MOUNT',this.state.cartProducts)
        
         
     }

     componentWillReceiveProps(nextProps){

         if(nextProps){
             console.log("done h boss......",this.props.cartProducts)
             console.log("nxt prop......",nextProps)
             this.setState({
                 loader:false
             })
         }
         else{
             console.log("nhi aya beta.......")
         }
     }

     componentWillMount(){
        console.log('WILL MOUNT')
    }

        render(){
            return(
                <div>
                    <div className='container'>
                        <table class="table ">
                            <thead className='cart-head'>
                                <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>


                                </tr>
                            </thead>
                            <tbody className='cart-body'>
                            {this.props.cartProducts.map((item,index) => {
                            return(
                                <tr>
                                <th scope="row"><img 
                                    className="cursor-pointer img-for-cart" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageApple}/></th>
                                <td className='cart-body'>{item.name}</td>
                                <td className='cart-body'>Rs.{item.price}</td>
                                <td className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name='quantity' id="quantity" min='1' defaultValue='1'/></td>
                                <td className='cart-body' style={{color:"#5BA616"}}>$60</td>
                                <td className='cart-body ' style={{color:"#5BA616"}}><img className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>


                                </tr>
                            )})}
                                {/*2nd*/}
                                {/* <tr>
                                <th scope="row"><img 
                                    className="cursor-pointer img-for-cart" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageApple}/></th>
                                <td className='cart-body'>Apple</td>
                                <td className='cart-body'>$60</td>
                                <td className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name='quantity' id="quantity" min='1' defaultValue='1'/></td>
                                <td className='cart-body' style={{color:"#5BA616"}}>$60</td>
                                <td className='cart-body ' style={{color:"#5BA616"}}><img className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>


                                </tr> */}
                             {/* 2nd end */}

                                {/* <tr>
                                <th scope="row" style={{fontWeight:'400', color:'black', fontSize: '18px'}}>SUBTOTAL</th>
                                <td className='cart-body'></td>
                                <td className='cart-body'></td>
                                <td className='cart-body cart-qty-td' ></td>
                                <td className='' style={{color:"#5BA616"}}>$80</td>
                                <td className='cart-body'></td>



                                </tr> */}
                                
                            </tbody>
                            </table>
                            <div style={{marginBottom:"100px"}}>
                            <button type='submit' className='update-btn'>Update Cart</button>
                            </div>  
                            <div className="proceed-btn">
                                <h4>CART TOTAL</h4>
                                 
                                 <div>
                                    <span style={{float:'left',marginLeft:'20px', marginTop:'20px', fontSize:'20px'}}>TOTAL</span>
                                   <b> <span style={{ color:'#5BA616',float:'right', marginRight:'25px', marginTop:'20px', fontSize:'20px'}}>$80</span></b>
                                </div>
                                <div >
                                    <button type="submit" class="btn btn-success btn-lg cart-btn">PROCEED TO CKECKOUT</button>
                                </div>
                            </div>
                    </div>

                    {/* testing */}

                   
                </div>        
            )
        }
    }   

    // redux

    const mapStateToProps = (state) =>{
        // var array= Array.from(state.products.cartProducts)
        console.log("Reducer check", state.cart.cartProducts)
        return{ 
            cartProducts: state.cart.cartProducts,
            
        }
    } 

    export default connect(
        mapStateToProps,
        { userCart }
      )(Cart);