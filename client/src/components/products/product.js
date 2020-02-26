import React,{Component} from 'react';
import './product.css'
import ImageAppla from '../centralized/images/apple.jpg' 
import FacebookIcon from '../centralized/images/facebook-icon.png'
import TwitterIcon from '../centralized/images/twitter-icon.png'
import PinterestIcon from '../centralized/images/pinterest-icon.png'
import {connect} from 'react-redux';
import {userCart} from '../../actions/productsAction'
import {addToCart} from '../../actions/productsAction'
import axios from 'axios'





class Product extends Component{
    constructor(Props){
        super(Props);
        this.state={
            loader: true,
            name:'',
            price:undefined,
            description:'',
            quantity:undefined,
            product:undefined
        }
    }
    
componentWillMount(){
    // var prod = JSON.parse(localStorage.getItem('Products'));
    console.log('abi ka error',this.props.products)
      if(this.props.products){
        var filterObj = this.props.products.filter((e) => {
            return e._id === this.props.match.params.id
          });
          console.log('Product Comp Filter',filterObj[0])
          this.setState({
              product:filterObj[0]
          })
      }
}

componentDidMount(){
    console.log(this.props)
}
componentWillReceiveProps(nextProps){
    if(nextProps){
        console.log("Prev. props......",this.props.product)
        console.log("Cart Array......",nextProps)
        this.setState({
            loader:false
        })
    }
    console.log('jsvjd',nextProps)
    if(nextProps.products){
        var filterObj = nextProps.products.filter((e) => {
            return e._id === this.props.match.params.id
          });
          console.log('Product Comp Filter',filterObj[0])
          this.setState({
              product:filterObj[0]
          })
      }
}

onChangeQty(e){
 e.preventDefault();
 this.setState({quantity: parseInt(e.target.value)})
}

 onSubmit=(item,e)=>{
    e.preventDefault();
    // console.log('onsubmit',id)
    // return false;
    // this.setState({
    //     name ,
    //     price ,
    //     description
    // })
    let productId;
    if(this.state.quantity==undefined){
        productId = {
            item,
            quantity:1,
           checker: false,

        }
        this.setState({
            quantity:1
        })
    }
    // console.log('product quantity====',this.state.quantity)
    else{
     productId = {
        item,
        quantity:this.state.quantity,
        checker: false,
    }
}

    // this.props.history.push('/cart')

    // this.props.userCart(this.props.history);
    this.props.addToCart(productId)
    console.log('new prod')
    // this.props.history.push('/cart')
}



    render(){
        console.log('Product Compnents',this.state.product,this.state.quantity,this.props)
        var currProduct=this.state.product
        return(
            <div>
                 <section className='contact-upper col-lg-12' >
                    <div className='contact-img-text'>
                        <h1>Product </h1>
                        {/* <p>A Real Estate Organization You Can Trust</p> */}
                    </div>
               </section>
               {this.state.product!==undefined?(

            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                    <div className='product-img'>
                       <img className="cursor-pointer" src={this.state.product.image[0]} width='540' height='540' />
                     </div> 

                   </div>


                    <div className="col-md-6 col-lg-6 col-sm-6">
                                   
                        <div className="container">
                            <div className="product-data">
                               <h3>{this.state.product.name}</h3>
                               <h5>Rs.{this.state.product.price}</h5>
                                 <h5 className="product-data-desc">{this.state.product.description}</h5>
                              <div className="container">
                                <div className="row">  
                                 
                                 <form>
                                    <div className="container">   
                                        <div className="row">  
                                        <div className="col-md-12 col-lg-12 col-sm-12 size-qty" >
                                       
                                        {/*For Size of packets (1Kg, 2Kg, 3Kg...)*/ }

                                            {/* <div className="col-md-5 col-lg-5 col-sm-5 details-style">
                                                    <label for="dropdownMenuButton">
                                                        SIZE
                                                    </label>  
                                                    
                                                    <div class=" drop-style">
                                                        <select class=" product-size-btn" aria-labelledby="dropdownMenuButton" defaultValue='1 KG' style={{width:'220px'}}>
                                                            <option class="dropdown-item drop-item" >1 KG</option>
                                                            <option class="dropdown-item drop-item" >2 KG</option>
                                                            <option class="dropdown-item drop-item" >3 KG</option>
                                                            <option class="dropdown-item drop-item" >4 KG</option>
                                                            <option class="dropdown-item drop-item" >5 KG</option>
                                                        </select>
                                                    </div>
                                                </div> */}


                                                {/*For quantity of packets (if there are kgs above, change the float to right)*/ }   
                                                <div className="col-md-5 col-lg-5 col-sm-5" style={{float:'left'}}>
                                                <label for="quantity" >QUANTITY</label>
                                                <input onChange={this.onChangeQty.bind(this)} type="number" name="quantity" min="1" defaultValue='1' value={this.state.value} className="form-control qty-inp" id="quantity"/>

                                                </div>          
                                        </div>
                                        {currProduct.stock>0
                                                ?<button onClick={this.onSubmit.bind(this,currProduct)}  type="button" class="btn btn-success btn-lg cart-btn" style={{marginTop:''}}>Add to cart</button>
                                                :<p style={{fontSize:'30px'}}><u style={{color:'red'}}>Out of Stock</u></p>}
                                        </div>
                                     </div>   
                                   </form>

                                  <div className="col-md-12 col-lg-12 col-sm-12 size-qty" >
                                        <div className="col-md-8 col-lg-8 col-sm-8 raw-data">
                                               <table>
                                                   <tr>
                                                       <th>SKU:  </th>
                                                       <td> 99 </td>
                                                   </tr>
                                                   <tr>
                                                       <th> CATEGORIES:</th>
                                                       <td>  Fruits2 Top Sale  </td>
                                                   </tr>
                                                   <tr>
                                                       <th>     TAGS:  </th>
                                                       <td> $200-$300 </td>
                                                   </tr>
                                                   <tr>
                                                       <th className='share-icons'> SHARE: </th>
                                                       <td>
                                                            <img className="cursor-pointer icon-img" src={FacebookIcon} width='' height='' />
                                                            <img className="cursor-pointer icon-img" src={TwitterIcon} width='' height='' />
                                                            <img className="cursor-pointer icon-img" src={PinterestIcon} width='' height='' />
                                                       </td>
                                                   </tr>


                                               </table>
                                        </div>
                                       
                                  </div>

                                 </div>
                             </div>           

                            </div>
                            
                        </div>
                      {/* SMS sending testing  */}
                      
                        {/* <input type='text' value={this.state.SMS} onchange={e=>{this.setState({SMS:e.target.value})}}/>
                        <button onClick={
                            (e)=>{
                                axios.post('http://localhost:5000/api/cart-owner/send-message',{SMS:'Hello world'}).then(res=>console.log(res))
                            }
                        }>Send</button> */}

                   
                                      
                    </div>

                </div>
            </div>
                            ):('Loading...')}

            </div>  
        )
    }

}

const mapStateToProps = (state) => {
    console.log('Collections ki product',state)
  return{
      products: state.products.products,
      cart:state.cart
  }
}

// const mapDispatchToProps = (dispatch) => {
//     return ({ 
//         productDetail: (productDetail) => {
//             dispatch(getProducts(productDetail))
//         }
//     });

// }

export default connect(
    mapStateToProps,
    { userCart, addToCart }
  )(Product);