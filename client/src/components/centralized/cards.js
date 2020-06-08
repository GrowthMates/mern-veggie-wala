import React ,{useState}from 'react';
import "./style/home.css"
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom"
import { Transformation, Image } from "cloudinary-react";
import Rating from '@material-ui/lab/Rating';
import heart from './images/heart.png'
import shoppingcart from './images/shopping-cart.png'
import {addToCart, wishList} from '../../actions/productsAction'




const ProductCards = (props) =>{

    const [contniueShoping, setContinueShopping] = useState(false)

    console.log(props)

    const starRating = props.item.starRating?.length>0?Math.round(props.item.starRating.reduce((a,b)=>a+b)/props.item.starRating.length):0;

    const redirectToLogin = () => {
        props.history.push('/user/login')
    }

    const addToCartHandler = () => {
        console.log('onAddToCartHandler',props.item)
       
        if(props.auth.isAuthenticated && props.auth.user.id && props.item.stock > 0){
            let productId = {
                item:props.item,
                quantity:1,
                checker: false,
                userId:props.auth.user.id
    
            }
    
            props.addToCart(productId)
            console.log('new prod====',productId)
    
        }
        else{
            redirectToLogin()
        }
    }

    const addToWishListHandler = () => {
        const userId = props.auth.user.id 
        let wishList = {
            userId,
            productId:props.item._id,
        }
        props.wishList(wishList)
    }

    return(

        


        <div key={props.item._id} className="card p1" style={{width: '14rem',marginBottom:'10%'}} >
            <div style={{maxHeight:'13rem',overflow:'hidden', position:'relative'}}>
            <Link to = {`/product/${props.item._id}`}>
                {/* <img className="card-img-top" src={props.item.images[0].image} alt="Card image cap" style={{height:'13rem'}} /> */}
                <Image publicId={props.item.images[0].imageId}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="280"
                                                        height="222"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                 </Image>
                </Link>
                <div className='card-hover-icons' >
                    {/* Add To Cart */}
                   {props.auth.isAuthenticated && props.item.stock>0?
                   <span title='Add to Cart' data-toggle="modal" data-target={`#addToCart${props.item._id}`} onClick={addToCartHandler}><img src={shoppingcart} alt='Shopping cart' style={{width:'16px'}}/></span>
                    :
                    <span title='Add to Cart' onClick={redirectToLogin}><img src={shoppingcart} alt='Shopping cart' style={{width:'16px'}}/></span>
                    } 

                    {/* Add to WishList */}
                   {props.auth.isAuthenticated? <span title='Add to Wishlist' onClick={addToWishListHandler}><img src={heart} alt='Heart' style={{width:'16px'}}/></span>
                   : <span title='Add to Wishlist' onClick={redirectToLogin}><img src={heart} alt='Heart' style={{width:'16px'}}/></span>
                    }


                    {/* <span><i class="fa fa-search" style={{margin:'0', padding:'0'}}></i></span> */}
                </div>
            </div>
            <div className="card-body">
            <div className='row card-props.item-name'>
                 <div className="col-7">
                <Link   style={{textDecoration:'none', color:'black'}} to = {`/product/${props.item._id}`} > <h5 style={{textAlign:'left'}}>{props.item.name}</h5></Link>
                <h5 style={{textAlign: 'left', marginBottom: '10px'}} >Rs.{props.item.price}</h5>
                 </div>
                 <div className="col-5">
                <h5 style={{textAlign:'right', width:'100%'}}>1(Kg)</h5>
                <div style={{marginTop:'5px'}}> 
                       <Rating name="read-only small-size" value={starRating} size='small' style={{fontSize:'0.9rem'}} readOnly />
                </div>
                 </div>
                 </div> 
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            </div>

            <div class="modal fade" id={`addToCart${props.item._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLongTitle"> {props.item.name} </h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  style={{fontWeight:'300'}}>
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body row">
                                                            <div className='col-3' style={{overflow:'hidden', width:'80px',height:'80px'}}>
                                                                <img src={props.item.images[0].image} width='120px' height='120px' style={{marginTop: '0px', marginBottom: '0px'}} />
                                                            </div>
                                                            <div className='col-9'>
                                                                <p>Added To Cart Succesfully</p>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" onClick= {() => setContinueShopping(!contniueShoping)} class="btn btn-secondary" data-dismiss="modal"  style={{fontWeight:'300'}}>Continue Shipping</button>
                                                            <button type="button" data-dismiss="modal" onClick={() => props.history.push('/cart')} class="btn btn-primary"  style={{fontWeight:'300'}}>Go to Cart</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                 </div>

            </div>

    )
}


// redux

const mapStateToProps = (state) => {

    // while(state.product.apiProducts)
    console.log('Collections ki product',state)
  
    return{
      products: state.products.products,
      cart:state.cart,
      loading:state.products.loading,
      auth: state.auth,
  }
}

export default connect(
    mapStateToProps,
     {addToCart, wishList}
     )(withRouter(ProductCards));
