import React,{Component} from 'react';
import './product.css'
import { Redirect } from 'react-router-dom';
import FacebookIcon from '../centralized/images/facebook-icon.png'
import TwitterIcon from '../centralized/images/twitter-icon.png'
import PinterestIcon from '../centralized/images/pinterest-icon.png'
import {connect} from 'react-redux';
import {userCart, getSingleProduct} from '../../actions/productsAction'
import {addToCart} from '../../actions/productsAction'
import ProductCard from '../centralized/cards'
import { CloudinaryContext } from 'cloudinary-react';
import ReadOnlyRating from "../centralized/Reviews/readOnlyRating"
import { Transformation, Image } from "cloudinary-react";
import MakeReview from '../centralized/Reviews/makeReview';








class Product extends Component{
    constructor(Props){
        super(Props);
        this.state={
            loader: true,
            name:'',
            price:undefined,
            description:'',
            quantity:undefined,
            product:undefined,
            errors:undefined,
            loading:false,
            user:undefined,
            redirect:false,
            displayImage:'',
            rotate1:false,
            rotate2:false,
            rotate3:false,
            writeReviewToggle:false,
        }
    }
    
// componentWillMount(){
//     // var prod = JSON.parse(localStorage.getItem('Products'));
//     console.log('abi ka error',this.props.products)
//       if(this.props.products){
//         var filterObj = this.props.products.filter((e) => {
//             return e._id === this.props.match.params.id
//           });
//           console.log('Product Comp Filter',filterObj[0])
//           this.setState({
//               product:filterObj[0]
//           })
//       }
// }

componentDidMount(){
    window.scrollTo(0, 0)
    console.log(this.props)
    let id=this.props.match.params.id
    let {singleProduct} = this.props
    if(singleProduct){
      if(singleProduct._id===id){
          this.setState({product:singleProduct,displayImage:singleProduct.images[0].imageId})
      }
    }
    // else{
        this.props.getSingleProduct(id)
    // }
    this.setState({user:this.props.auth.user})
}
componentWillReceiveProps(nextProps){
    if(nextProps){
        console.log("Prev. props......",this.props.product)
        console.log("Cart Array......",nextProps)
        this.setState({
            loader:false,
            loading:false,
            user:nextProps.auth,
        })
        if(nextProps.error){
            console.log(nextProps.error)
            this.setState({errors:nextProps.error})
        }
    }
    console.log('jsvjd',nextProps)
    // if(nextProps.products){
    //     var filterObj = nextProps.products.filter((e) => {
    //         return e._id === this.props.match.params.id
    //       });
    //       console.log('Product Comp Filter',filterObj[0])
    //       this.setState({
    //           product:filterObj[0]
    //       })
    //   }
    if(nextProps.singleProduct){
       this.setState({
           product:nextProps.singleProduct,
           displayImage:nextProps.singleProduct.images[0].imageId
       })
    }
}

onChangeQty(e){
 e.preventDefault();
 this.setState({quantity: parseInt(e.target.value)})
}

onChangeReview(e){
    this.setState({[e.target.name]:e.target.value})
}

onSubmitReview(){
    const {review, reviewTitle} = this.state
}


 onSubmit=(item,e)=>{
    e.preventDefault();
    console.log(this.props.auth.user)
    if(this.props.auth.user.id){
    
        this.setState({loading:true})
        let productId;
        if(this.state.quantity===undefined){
            productId = {
                item,
                quantity:1,
               checker: false,
               userId:this.props.auth.user.id,
    
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
            userId:this.props.auth.user.id,
        }
    }
    
        // this.props.history.push('/cart')
    
        // this.props.userCart(this.props.history);
        this.props.addToCart(productId)
        setTimeout(()=>{this.setState({loading:false})},5000)
        console.log('new prod')
        // this.props.history.push('/cart')
    }
    else{
        this.setState({redirect:true})
    }
}



    render(){
        console.log('Product Compnents',this.state.product,this.state.quantity,this.props)
        let currProduct=this.state.product
        if(this.state.redirect){
            return <Redirect to='/user/login'/>
        }

        return(
            <div>
                 <section className='product-detail-upper col-lg-12' >
                    <div className='product-detail-img-text'>
                        {/* <h1>Product </h1> */}
                        {/* <p>A Real Estate Organization You Can Trust</p> */}
                    </div>
               </section>
               {this.state.product!==undefined?(
                
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6 ">
                <CloudinaryContext cloudName="dbevearco">  
                    <div className='product-img'>
                    <Image publicId={this.state.displayImage}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="540"
                                                        height="540"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                 </Image>
                       {/* <img className="cursor-pointer" src={this.state.displayImage} alt={this.state.product.name}  width='100%' height='540' /> */}
                     </div>
                     
                     <div className='row' style={{overflowX:'auto', marginTop:'10px',padding:'0 1rem'}}> 
                         {this.state.product.images.map((images=>{
                             console.log(currProduct.starRating)
                             return <div className='col-4 '>
                                 <Image publicId={images.imageId} onClick={()=>{this.setState({displayImage:images.imageId})}} className='cursor-pointer'>
                                                    <Transformation
                                                        crop="scale"
                                                        width="80"
                                                        height="80"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                 </Image>
                                 {/* <img className='cursor-pointer' src={images.image} alt={this.state.product.name} width='80%' height='70%' onClick={()=>{this.setState({displayImage:images.image})}}/> */}
                                 </div>
                         }))}
                      </div> 
                       </CloudinaryContext> 
                   </div>


                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 ">
                                   
                        <div className="container">
                            <div className="product-data">
                               <h3>{this.state.product.name}</h3>
                               <ReadOnlyRating value={currProduct.starRating.length>0?Math.round(currProduct.starRating.reduce((a,b)=>a+b)/currProduct.starRating.length):0}/>
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
                                        {this.state.loading?
                                        <button class="buttonload" onClick={void 0}>
                                        <i class="fa fa-spinner fa-spin"></i>Loading
                                        </button>
                                        :currProduct.stock>0?
                                        !this.props.auth.user?<button  onClick={e=>{this.setState({redirect:true})}} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>
                                                :<button onClick={this.onSubmit.bind(this,currProduct)}  type="button" class="btn btn-success btn-lg cart-btn" style={{marginTop:''}}>Add to cart</button>
                                                :<p style={{fontSize:'30px'}}><u style={{color:'red'}}>Out of Stock</u></p>}
                                               
                                               {/* <p style={{color:'red'}}>{this.state.errors?this.state.errors:void 0}</p> */}
                                              
                                        </div>
                                     </div>   
                                   </form>

                                  <div className="col-md-12 col-lg-12 col-sm-12 size-qty" >
                                        <div className="col-md-8 col-lg-8 col-sm-8 raw-data">
                                               <table>
                                                   {/* <tr>
                                                       <th>SKU:  </th>
                                                       <td> 99 </td>
                                                   </tr> */}
                                                   <tr>
                                                       <th> CATEGORIES:</th>
                                                       <td> {this.state.product.category}  </td>
                                                   </tr>
                                                   <tr>
                                                       <th>     TAGS:  </th>
                                                       <td> {this.state.product.tag}  </td>
                                                   </tr>
                                                   <tr>
                                                       <th className='share-icons'> SHARE: </th>
                                                       <td>
                                                            <img className="cursor-pointer icon-img" src={FacebookIcon} alt='facebook' />
                                                            <img className="cursor-pointer icon-img" src={TwitterIcon} alt='Twitter' />
                                                            <img className="cursor-pointer icon-img" src={PinterestIcon} alt='Pinterest' />
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
                <hr className='product-desc'/>
                <div className='product-details-bottom'>
                        <button data-toggle="collapse" data-target="#prod-detail-desc"  aria-controls="prod-detail-desc" onClick={()=>{this.setState(({rotate1})=>({rotate1:!rotate1}))}}>Description 
                            <span className='greaterThan' style={this.state.rotate1?{transform:' translateY(-8px) rotate(90deg)',paddingLeft:'1.2em'}:void 0}>
                                <i class="fa fa-angle-right" style={{fontSize:'1.2em', marginLeft:'0'}}></i>
                            </span>
                        </button>
                        <div class="collapse" id="prod-detail-desc">
                        <div class="card card-body" style={{textAlign:'left'}}>
                            {this.state.product.description}
                        </div>
                        </div>

                        {/* <button data-toggle="collapse" data-target="#prod-detail-info"  aria-controls="prod-detail-info" onClick={()=>{this.setState(({rotate2})=>({rotate2:!rotate2}))}}>Additional Information  <span className='greaterThan' style={this.state.rotate2?{transform:' translateY(-8px) rotate(90deg)'}:void 0}>&gt;</span></button>
                        <div class="collapse" id="prod-detail-info">
                        <div class="card card-body" style={{textAlign:'left'}}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                        </div> */}

                        <button data-toggle="collapse" data-target="#prod-detail-reviews"  aria-controls="prod-detail-reviews" onClick={()=>{this.setState(({rotate3})=>({rotate3:!rotate3}))}}>Reviews  
                            <span className='greaterThan' style={this.state.rotate3?{transform:' translateY(-8px) rotate(90deg)',paddingLeft:'1.2em'}:void 0}>
                                 <i class="fa fa-angle-right" style={{fontSize:'1.2em', marginLeft:'0'}}></i>
                            </span>
                        </button>
                        <div class="collapse" id="prod-detail-reviews">
                        <div class="" style={{textAlign:'left'}}>
                            <div className="row">
                                <div className='col-12 col-sm-12 col-md-12 col-lg-6 forCenter'>
                                        <h5 className="col-12 forCenter">Customers Reviews</h5>
                                    
                                </div>
                                <div className='col-12 col-sm-12 col-md-12 col-lg-6 forCenter'>
                                    <h6 className="write-review-toggle cursor-pointer" onClick={() => this.setState(({writeReviewToggle})=>({writeReviewToggle:!writeReviewToggle}))}>Write a Review</h6>
                                </div>
                                 <hr className="col-12"/>
                                <div className='col-12'>{this.state.writeReviewToggle ? <MakeReview productId={this.state.product._id}/> : void 0}</div>
                                <div className="col-12 col-md-12 col-lg-6">
                                        {this.state.product.review?.length > 0 ?
                                        this.state.product.review.map((review,index) => {
                                            return (
                                                <div className="col-12">
                                                    <ReadOnlyRating value={review.star}/>
                                                    <h4 style={{textAlign:'left'}}>{review.reviewTitle}</h4>
                                                    <p style={{textAlign:'left'}}>by {review.customerName}</p>
                                                    <p style={{textAlign:'left'}}><i>"{review.review}"</i></p>
                                                </div>
                                                
                                                )
                                                }) 
                                        : <p className="col-12 no-review-p forCenter">No reviews Yet</p>  
                                        }
                                    </div>

                            </div>
                        </div>
                        </div>

                       
                </div>

                <hr/>

                {/* More Products */}
                <div className='container'>
                <CloudinaryContext cloudName="dbevearco">  
                    <div style={{margin:'50px'}}>
                        <h2 style={{fontWeight:'bold'}}>You May Also Need</h2>
                    </div>

                    <div className='row' style={{margin:'auto',paddingBottom:'90px'}}>
                        
                            {[0,1,2,3].map(()=>{
                                return(
                                <div className='col-12 col-md-6 col-lg-3 ' style={{display:'flex', justifyContent:'center'}}>
                                <div style={{width:'68%'}}>
                                     <ProductCard item={this.state.product}/>
                                </div>
                                </div>
                                )
                            })}

                    </div>
                    </CloudinaryContext>
                </div>

            </div>
                            ):this.state.errors?<div style={{margin:'200px'}}><h3>{this.state.errors}</h3></div>
                            :
                            (
                                <div>
                                    <div class="spinner-border text-success " style={{width: '3rem', height: '3rem',margin:'200px'}} role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            )}

            </div>  
        )
    }

}

const mapStateToProps = (state) => {
    console.log('Collections ki product',state)
  return{
      products: state.products.products,
      cart:state.cartReducer.cart,
      error:state.errors,
      auth:state.auth,
      singleProduct:state.products.singleProduct,
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
    { userCart, addToCart, getSingleProduct }
  )(Product);