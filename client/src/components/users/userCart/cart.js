import React,{Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import './cart.css'
import ImageApple from '../../centralized/images/apple.jpg'
import DeleteBtnIcon from '../../centralized/images/delete-button.png'
import {userCart} from '../../../actions/productsAction'
import axios from 'axios'



 class Cart extends Component{
     constructor(Props){
        super(Props);
        this.state={
            cartProducts: JSON.parse(localStorage.getItem('CartProduct')) || [],
            loader:true,
            cartData: [],
            quantity:undefined,
            evein: true
        }

        setTimeout(()=>{
            
        }
        ,10800000)
        
     }
     
     componentDidMount(){
         console.log('local styorge',this.state.cartProducts)         
     }

    //  try{
    //      this.state.cartProducts ===  JSON.parse(localStorage.getItem('CartProduct'))
    //  }
    //  catch(){

    //  }

     delCart(key,index){
        let {cartProducts} = this.state

        let delBody = {
            key: key,

        }
        
        // cartProducts.splice(0,1);
       
        // console.log('cart del ka error.. >', delBody)

        axios.post("http://localhost:5000/api/user-data/delCart", delBody)
            .then(res => {

                // cartProducts.splice(index,1);
                // this.setState({
                //     evein: false
                // })

                // console.log('del ka res', res.data.cart)
                // console.log('del ka res', cartProducts.filterProduct._id)
                var delFromLocalStorage=cartProducts.findIndex(cart=>cart.cartSchemaId===key);
                if(delFromLocalStorage!==-1){
                    cartProducts.splice(delFromLocalStorage,1);
                  localStorage.setItem('CartProduct', JSON.stringify(cartProducts));
                  this.setState({
                                evein: false
                            })
                  console.log('del k ho gai lcl strge sy... ', delFromLocalStorage)
                }
                else{
                    console.log('del nh hui lcl strge sy... ', delFromLocalStorage)

                }
                // localStorage.removeItem('CartProduct');
            })

            .catch(err => {
                console.log('cart del ka error.. >',err.message)
            })


     }

     onChange(e){
         e.preventDefault();
         this.setState({
            [e.target.name] : e.target.value     
         });
         console.log(e.target.name,e.target.value ,'crt qnty')

     }
     proceed(){
        // console.log(this.props, 'props')
        // this.props.history.push('/information')
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
                            {this.state.cartProducts.map((item,index) => {
                            return(
                                <tr>
                                <th scope="row"><img 
                                    className="cursor-pointer img-for-cart" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageApple}/></th>
                                <td className='cart-body'>{item.filterProduct.name}</td>
                                <td className='cart-body'>Rs.{item.filterProduct.price}</td>
                                <td className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name={`quantity${index}`}
                                onChange={this.onChange.bind(this)} value={this.state.quantity} id={index} min='1'/></td>
                                <td className='cart-body' style={{color:"#5BA616"}}>$60</td>
                                <td className='cart-body ' style={{color:"#5BA616"}}><img onClick={this.delCart.bind(this,item.cartSchemaId,index)}
                                 className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>


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
                                    <button onClick={this.proceed} type="submit" class="btn btn-success btn-lg cart-btn">PROCEED TO CKECKOUT</button>
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