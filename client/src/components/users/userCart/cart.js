import React,{Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import './cart.css'
import ImageApple from '../../centralized/images/apple.jpg'
import DeleteBtnIcon from '../../centralized/images/delete-button.png'




export default class Register extends Component{
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
                                <tr>
                                <th scope="row"><img 
                                    className="cursor-pointer img-for-cart" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageApple}/></th>
                                <td className='cart-body'>Apple</td>
                                <td className='cart-body'>$60</td>
                                <td className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name='quantity' id="quantity" min='1' defaultValue='1'/></td>
                                <td className='cart-body' style={{color:"#5BA616"}}>$60</td>
                                <td className='cart-body ' style={{color:"#5BA616"}}><img className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>


                                </tr>
                                {/*2nd*/}
                                <tr>
                                <th scope="row"><img 
                                    className="cursor-pointer img-for-cart" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageApple}/></th>
                                <td className='cart-body'>Apple</td>
                                <td className='cart-body'>$60</td>
                                <td className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name='quantity' id="quantity" min='1' defaultValue='1'/></td>
                                <td className='cart-body' style={{color:"#5BA616"}}>$60</td>
                                <td className='cart-body ' style={{color:"#5BA616"}}><img className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>


                                </tr>
                             {/* 2nd end */}

                                <tr>
                                <th scope="row" style={{fontWeight:'400', color:'black', fontSize: '18px'}}>SUBTOTAL</th>
                                <td className='cart-body'></td>
                                <td className='cart-body'></td>
                                <td className='cart-body cart-qty-td' ></td>
                                <td className='' style={{color:"#5BA616"}}>$80</td>
                                <td className='cart-body'></td>



                                </tr>
                                
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
                </div>        
            )
        }
    }   