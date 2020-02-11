import React,{Component} from 'react';
import { Link,  } from "react-router-dom";
import {connect} from 'react-redux'
import './cart.css'
import ImageApple from '../../centralized/images/apple.jpg'
import Tick from '../../centralized/images/tick.png'
import DeleteBtnIcon from '../../centralized/images/delete-button.png'
import {userCart} from '../../../actions/productsAction'
import axios from 'axios'
import {addToCart,totalPrice,infoPathCheck} from '../../../actions/productsAction'


// var totalPrice = []
var lineTotalArr = []

 class Cart extends Component{
     constructor(Props){
         
        super(Props);
        this.state={
            cartProducts: undefined,
            cartArray:undefined,
            loader:true,
            cartData: [],
            quantity:undefined,
            evein: true,
            tick:'none',
            cart:[],
            arr:[],
            loader:'none',
            totalPrices:undefined,
            edit:false,
            totalPrice:'' || this.props.totalPrice,
        }

        setTimeout(()=>{
            
        }
        ,10800000)
        
     }
     
     componentDidMount(){
         console.log('local styorge',this.props.cartProducts) 
         this.setState({
             cartProducts:this.props.cartProducts
         })        
         this.props.totalPrice(this.state.totalPrice)

     }

    //  try{
    //      this.state.cartProducts ===  JSON.parse(localStorage.getItem('CartProduct'))
    //  }
    //  catch(){

    //  }

     delCart(key,productId,quantity){
        let {cartProducts} = this.state

        let delBody = {
            key: key,
            productId: productId,
            quantity: quantity

        }
        if(this.state.totalPrice){
            console.log('andar total prce ky',this.state.totalPrice)
        }
        this.props.totalPrice(this.state.totalPrice)
        localStorage.setItem('totalPrice',JSON.stringify(this.state.totalPrice))

        // cartProducts.splice(0,1);
       
        console.log('cart del Ponka. >>>>', delBody)

        axios.post("http://localhost:5000/api/user-data/delCart", delBody)
            .then(res => {

             
                if(this.state.totalPrice){
                    console.log('andar total prce ky',this.state.totalPrice)
                }
                localStorage.setItem('totalPrice',JSON.stringify(this.state.totalPrice))
                this.props.totalPrice(this.state.totalPrice)

                var delFromLocalStorage=cartProducts.findIndex(cart=>cart.cartSchemaId===key);
                if(delFromLocalStorage!==-1){
                    cartProducts.splice(delFromLocalStorage,1);
                  localStorage.setItem('CartProduct', JSON.stringify(cartProducts));
                  this.setState({
                                evein: false
                            })
                            window.location.reload()
                  console.log('del k ho gai lcl strge sy... ', delFromLocalStorage)
                }
                else{
                    console.log('del nh hui lcl strge sy... ', delFromLocalStorage)

                }
                // localStorage.removeItem('CartProduct');
            }) .catch(err => {
                console.log('cart del ka error.. >',err.message)
            })


     }

    

     onChange(id,index,price,e){
        // var totatPrice = []

         e.preventDefault();
        console.log('price', this.state.totalPrice)
         const arr = this.state.cartProducts
       
         var qnty  = arr.map((item,i) => {
            
            if(item.cartSchemaId === id){
                item.quantity = parseInt(e.target.value)
                return arr
            }
        })
        // console.log('qty',qnty[index][index].quantity)
        var lineTotal = (qnty[index][index].quantity*price)
        // console.log('line total', lineTotal)
        // totatPrice=[qnty[index][index].quantity*price]
        // totalPrice.push(lineTotal)
        // console.log()
        var finalIndex = totalPrice[totalPrice.length-1]
        var secondLast = totalPrice[totalPrice.length-2]
        // console.log('akhri ky sum',finalIndex+secondLast)
        lineTotalArr.push(qnty[index][index].quantity*price)
        // console.log('line total arr', lineTotalArr)
        var newPrice = lineTotalArr.reduce((a, b) => {return a+b })
        // console.log('array total price ki', newPrice )
        this.setState({cartArray:qnty[index],tick:'none',})

        // this.setState({
        //     totalPrices: this.state.totalPrice
        // })
        this.props.totalPrice(this.state.totalPrice)

            // localStorage.setItem('CartProduct',JSON.stringify(qnty))        


     }

     updateCart(e){
         e.preventDefault();
        this.setState({loader:'inline'}) 
        let update={
            qnty:this.state.cartArray
        }
        console.log('price ki state',this.state.totalPrice)
        this.props.totalPrice(this.state.totalPrice)
    //  console.log()
        axios.put("http://localhost:5000/api/user-data/updateCart", update )
        .then(res => {
            console.log('Update cart res----',res.data)
            this.state.cartProducts.forEach((item,index)=>{
                // console.log('CartProducts New=====',res.)
                var matchItem = res.data.finalArr.findIndex(i => i._id == item.cartSchemaId );
                console.log('MatchItem ID-------',matchItem);
                item.quantity=res.data.finalArr[matchItem].quantity

                localStorage.setItem('totalPrice',JSON.stringify(this.state.totalPrice))
            })
            localStorage.setItem('CartProduct',JSON.stringify(this.state.cartProducts))
            console.log(this.state.cartProducts)
            this.props.totalPrice(this.state.totalPrice)
            this.setState({tick:'inline',loader:'none',quantity:undefined})
            window.location.reload()
       
        })

        .catch(err => {
            console.log('cart update ka error.. >',err.message)
        })
     }

     proceed(){
         let checker = {
             flag: true
         }
         this.props.infoPathCheck(checker)
        this.props.history.push('/information')
        var arr=[]
       this.props.cartProducts.map((item)=>{
        arr.push((item.filterProduct.price)*item.quantity)
       })
        var total=arr.reduce((a, b) => {return a + b})
        this.setState({
            totalPrice:total
        })
        
     }

     componentWillReceiveProps(nextProps){

          console.log("Will recieve props h boss......",nextProps)
         if(nextProps.cartProducts){
            //  console.log("nxt prop......",nextProps)
             this.setState({
                 loader:false,
                 cartProducts:nextProps.cartProducts
             })
         }
         else{
            //  console.log("nhi aya beta.......")
         }
     }

     componentWillMount(){
        // console.log('props cart will mnt sy', this.props)
    }

        render(){
           
            var arr=[0]

            
            return(
                <div>
                    <div className='container'>
                       {this.state.cartProducts?(
                        <div>
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
                                        arr.push(item.quantity*(item.filterProduct.price))
                                    return(
                                        <tr>
                                        <th scope="row"><img 
                                        
                                            className="cursor-pointer img-for-cart" 
                                            style={{marginRight:'25px'}} 
                                            src={item.filterProduct.image}/></th>
                                        <td className='cart-body'>{item.filterProduct.name}</td>
                                        <td className='cart-body'>Rs.{item.filterProduct.price}</td>
                                        <td className='cart-body cart-qty-td' ><input className="crt-qty-fnl" type='number' name={item._id} defaultValue={item.quantity}
                                        onChange={this.onChange.bind(this,item.cartSchemaId,index,arr.reduce((a, b) => {return a + b}))} value={this.state.quantity} id={index} min='1' max={item.filterProduct.stock} /></td>
                                    <td className='cart-body' style={{color:"#5BA616"}}>Rs. {
                                    (this.state.cartArray)? this.state.cartArray[index].quantity*(item.filterProduct.price) :
                                    (item.filterProduct.price)*item.quantity}  </td>
                                        <td className='cart-body ' style={{color:"#5BA616"}}><img onClick={this.delCart.bind(this,item.cartSchemaId,item.filterProduct._id,item.quantity,index)}

                                        className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>

        
                                        </tr>
                                    )})}
                                
                                    
                                </tbody>
                                </table>
            
                                {(this.state.cartArray)?
                                    <div style={{marginBottom:"100px"}}>
                                <button onClick={this.updateCart.bind(this)} type='submit' className='update-btn'>Update Cart</button>
                                <span><img   
                                             style={{display:this.state.tick,marginTop:'10px',marginLeft:'15px',float:'left',textAlign:'left'}} 
                                            src={Tick}/></span>
                                </div>  
                                :''}
                                <div className="proceed-btn">
                                    <h4>CART TOTAL</h4>
                                    {console.log('array total price',arr)}
                                    <div>
                                        <span style={{float:'left',marginLeft:'20px', marginTop:'20px', fontSize:'20px'}}>TOTAL</span>
                            
                                       <input type='text' 
                                       style={{ color:'#5BA616',float:'right', marginRight:'25px', marginTop:'20px', fontSize:'20px'}}
                                       value={this.state.totalPrice=arr.reduce((a, b) => {return a + b})} className={this.state.edit === false ? 'inputStatic': void 0} />
                                   
                                    </div>
                                    <div >
                                        <button onClick={this.proceed.bind(this)} type="submit" class="btn btn-success btn-lg cart-btn">PROCEED TO CKECKOUT</button>
                                    </div>
                                </div>
                    </div>
                                ): <h5 style={{margin:'100px'}}>Your cart is currently empty.<br/>Continue browsing <Link to='/collections'>here.</Link></h5>}   
                </div>

                    {/* testing */}

                   <p>{this.state.totalPrice}</p>
                </div>        
            )
        }
    }   

    // redux

    const mapStateToProps = (state) =>{
        // var array= Array.from(state.products.cartProducts)
        console.log("Reducer check cart prod.............", state.cartReducer.totalPrice)
        return{ 
            cartProducts: state.cartReducer.cart,
            products: state.products,
            totalPriceReducer: state.cartReducer.totalPrice
        }
    } 

    export default connect(
        mapStateToProps,
        { userCart, addToCart,totalPrice,infoPathCheck }
      )(Cart);