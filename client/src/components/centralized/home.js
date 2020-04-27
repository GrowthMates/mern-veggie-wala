import React,{Component} from 'react';
import {connect} from 'react-redux';

import HomeLoader from './home-loader'
import {Link} from 'react-router-dom'

// import axios from 'axios'
// import frt1 from './images/frt1.jpeg'
// import frt2 from './images/frt2.jpeg'
// import veg1 from './images/veg1.jpeg'
// import veg2  from './images/veg2.jpeg'
import fresh from './images/fresh.webp'
import Center from './images/Center.webp'
import eco from './images/eco.webp'
import hearts from './images/hearts.webp'
import yammy from './images/yammy.webp'
import tasty from './images/tasty.webp'
import dlv from './images/dlv.webp'
import ser from './images/ser.webp'
import all from './images/all.webp'
import bana3 from './images/bana3.webp'
import kiwi3 from './images/kiwi3.webp'
import jack from './images/jack.webp'
import papa4 from './images/papa4.webp'
import love from './images/love.png'
import leaf from './images/leaf.png'
import heart1 from './images/heart.png'
import shoppingcart1 from './images/shopping-cart.png'
import search1 from './images/search.png'
import apple from './images/apple.jpg'
import low3 from './images/low3.webp'
import low2 from './images/low2.webp'
import low4 from './images/low4.jpg'
import plums from './images/plums.webp'
import pchs from './images/pchs.webp'
import cmbr from './images/cmbr.webp'
import mrtls from './images/mrtls.webp'
// import spice from './images/spice.png'
import l1 from './images/l1.webp'
import l2 from './images/l2.webp'
import l3 from './images/l3.webp'
import l4 from './images/l4.webp'
import l5 from './images/l5.webp'
import l6 from './images/l6.webp'
import Slide1 from './images/Slider1.jpg'
import Slide2 from './images/Slider2.jpg'
import Slide3 from './images/Slider3.jpg'
import './style/home.css'
import {wishList,userCart} from '../../actions/productsAction'
import Homeimages from "./home-assets/images"
import {gmailLogin} from '../../actions/authActions'
import queryString from "query-string";

// import socketIOClient from "socket.io-client";
// var socket=socketIOClient("http://localhost:5000/")
// import bgLower from './images/bgLower.webp'


// import premium from './images/premium.webp'

// import { connect } from 'mongoose';
// import Axios from 'axios';


 class Home extends Component{

    constructor(Props){
        super(Props);
        this.state={
            loading: true,
            products:undefined,
            user: {}
        }
    }

    // componentDidMount(){

    //     console.log('this.componentDidMount')
    //     var query = queryString.parse(this.props.location.search);
    //     console.log('query=====',query)
    //     if (query.token) {
    //         this.props.gmailLogin(query.token);
    //     //   localStorage.setItem("jwtToken", query.token);
    //       this.props.history.push("/");
    //   } 

    //     axios
    //     .get("http://localhost:5000/api/products")
    //     .then((res) => {
    //                     console.log("Products success", res.data)

    //                     localStorage.setItem('Products', JSON.stringify(res.data));
    //                     console.log('Products from Storage: ',localStorage.getItem('Products'));

    //                       }) // re-direct to login on successful register
    //     .catch(err =>
    //     console.log('Product err: ',err.message)
    //     );
    // }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.products){
            // console.log('Home Products Next Props',nextProps)

        if(nextProps){
            console.log('Home Products Next Props',nextProps)
            if(nextProps.products){
               if(nextProps.products.length>=8){ 
                    var newProducts=[];
                    for(let i=0;i<=7;i++){
                        console.log('ForLoopNextProps====',nextProps.products[i])
                        newProducts.push(nextProps.products[i])
                    }
                    this.setState({
                        products:newProducts,
                        loading:false           
                    })
                 }
                else{
                    this.setState({
                        products:nextProps.products,
                        loading:false           
                    })
                }
        }

        }
    }}
    componentDidMount(){

        //Calling UserCart API...
        if(this.props.auth.user){
            this.props.userCart(this.props.auth.user.id)
        }
        console.log('this.componentDidMount')
        var query = queryString.parse(this.props.location.search);
        console.log('query=====',query)
        if (query.token) {
            this.props.gmailLogin(query.token);
        //   localStorage.setItem("jwtToken", query.token);
          this.props.history.push("/");
        console.log('Home DidMount====',this.props.products)
        }
       if(this.props.products!==undefined){  
        if(this.props.products.length>=8){ 
            var newProducts=[];
            for(let i=0;i<=7;i++){
                console.log('ForLoopNextProps====',this.props.products[i])
                newProducts.push(this.props.products[i])
            }
            this.setState({
                products:newProducts,
                loading:false           
            })
         }
        else{
            this.setState({
                products:this.props.products,
                loading:false           
            })
        }
        }
        }
    changer(){
        this.props.history.push('/collections')
    }
    p1(){
        // console.log('p1',)
        // this.props.history.push('/collections')  
    }

    wishList(userId,productId){
        
        let wishList = {
            userId,
            productId,
        }
        console.log('items wishlist ky ',userId,productId)
        this.props.wishList(wishList)
    }

    render(){
        const {user} = this.props.auth
        // console.log('user', user.id)
        return(

            <div id="home-container">
             
             <section className='col-lg-12 homeImg'> 
             <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" style={{border:'0px'}}>
                        <div className="carousel-item active">
                         <img className="d-block w-100" src={Slide1} alt="First slide" />
                         <div className="shop-now-btn-1 carousel-caption d-none d-md-block">
                        <button className="shop-button">
                            Shop Now
                        </button>
                        </div> 
                        </div>
                        <div className="carousel-item">
                         <img className="d-block w-100" src={Slide2} alt="Second slide"/>
                         <div className="shop-now-btn-2 carousel-caption d-none d-md-block">
                        <button className="shop-button">
                            Shop Now
                        </button>
                        </div> 
                        </div>
                        <div className="carousel-item">
                         <img className="d-block w-100" src={Slide3} alt="Third slide"/>
                         <div className="shop-now-btn-3 carousel-caption d-none d-md-block">
                        <button className="shop-button">
                            Shop Now
                        </button>
                        </div> 
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                       
                    </section>    

               <div id="mid-section-home">

               <div className='homeMiddle'>
                  <div className="grow-best-food">
                   <h2>We Grow Best Food</h2>
                   <h6  style={{color: '#949494',fontSize: '0.8em', opacity: '0.8', width:'30%', margin:'auto'}} >
                        <i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</i></h6>
                  </div>
               </div>
                {/* our qualities  */}
                
               <div className='container threeMiddlw'>
                   {/* <div className="green-bg"> */}
                        <img src={Homeimages.upperLeafs} alt='Leafs' id="upper-leafs-img"/>
                    <div className='row' style={{width:'100%', alignItems: 'center'}} >
                        <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 middleLeft' >
                            
                            <h4><img src={fresh} alt=''/> Fresh</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>

                            
                            <h4><img src={hearts} alt=''/> Healthy</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>

                           
                            <h4><img src={Homeimages.ecoIcon} alt=''/> Eco</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                        </div>

                        {/* center image... */}
                        {/* <div className='col-lg-1 col-md-1 col-sm-12 col-xs-12'></div> */}
                        <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'  >
                            <img src={Homeimages.greenMango} height='auto' width="100%" alt=''/>
                        </div>
                         {/* <div className='col-lg-1 col-md-1 col-sm-12 col-xs-12' ></div> */}

                        <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12 middleRight' >
                            <h4>Tasty <img src={Homeimages.tasteTongue} alt=''/></h4>
                            
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                            <h4>Nutritious <img src={Homeimages.nutritiousIcon} alt=''/></h4>
                            
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                            <h4>Pemium <img src={Homeimages.premiumIcon} alt=''/></h4>
                            
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                        </div>
                    </div>
                   {/* </div> */}
               </div>
               </div>
                {/* our services */}
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 midLow ' >
                            <img src={dlv} width='56' height='42' alt=''/>
                            <h4>Fast Delivery</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}}>Delivery wIthin 12 hour</p>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 midLow' >
                            <img  src={ser} width='49' height='42' alt=''/>
                            <h4>Best Services</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Support online 24/7</p>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 midLow' >
                            <img src={all} width='49' height='42' alt=''/>
                            <h4>All-in-one</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Fruits&Vegetable</p>
                        </div>

                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 midLow' >                          
                 

                            <img src={love} width='49' height='42' alt=''/>
                            <h4>Made with Love</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Best Services</p>
                        
                    </div>
                </div>
                {/* topsale */}

                <div className='' style={{marginTop: '25px'}} >
                    <div className='row '>
                        {
                        (this.state.loading==true)?(<HomeLoader/>):(
                         this.state.products.map((item,index) => {  
                         return(
                            <div key={index} className='p1 col-lg-3 col-md-6 col-sm-12 col-xs-12 ' onClick={this.p1} >
                            {/* <div className='topInner'>
                                    <p>-57%</p>
                                </div> */}

                               <Link to = {`/product/${item._id}`} > <img src={item.image[0]} width='270' height='270' alt=''/></Link>
                                <div className='lowerProd' >
                            
                                    <img src={shoppingcart1} width='25' height='25' alt=''/>
                                    {user.id?
                                        
                                            <img onClick={this.wishList.bind(this,user.id,item._id)}  src={heart1} width='23' height='23' alt=''/>
                                     
                                     :
                                      <Link to='/combined'> <img src={heart1} width='23' height='23' alt=''/>  </Link> }
                                    {/* <img src={heart1} width='23' height='23' alt=''/> */}
                                    <img src={search1} width='23' height='23' alt=''/>  
                                                               
                                </div>
                                <Link style={{textDecoration:'none', color:'black'}} to = {`/product/${item._id}`} > <h5  >{item.name}</h5></Link>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs.{item.price}</h5>
                            </div>)})
                        )}
                        {/* <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p2' >
                            <img src={jack} width='270' height='270' alt=''/> 
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' alt=''/>
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>
                            <h5 >JackFruits</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$40</h5>

                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p3' > */}
                            {/* <div className='topInner'>
                                <p>-27%</p>
                            </div> */}
                            {/* <img src={kiwi3} width='270' height='270' alt=''/>
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' alt=''/>
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>

                            <h5 >Kiwi</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$80</h5>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p4' >
                            <img src={papa4} width='270' height='270' alt=''/>
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' alt='' />
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>
                            <h5 >Papaya </h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$220</h5>
                        </div> */}
                    </div>
                </div>

                {/* product lower 2nd */}
                {/* <div className='container' style={{marginTop: '30px'}} >
                    <div className='row '>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1' >
                            <img src={apple} width='270' height='270' alt=''/>
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='25' height='25' alt=''/>
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>
                            <h5  >Banana</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$20</h5>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p2' >
                            <img src={low2} width='270' height='270' alt=''/> 
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' alt=''/>
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>
                            <h5 >JackFruits</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$40</h5>

                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p3' >
                            <img src={low3} width='270' height='270' alt=''/>
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' alt=''/>
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>

                            <h5 >Kiwi</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$80</h5>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p4' >
                            <img src={low4} width='270' height='270' alt=''/>
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' alt=''/>
                                <img src={heart1} width='23' height='23' alt=''/>
                                <img src={search1} width='23' height='23' alt=''/>                                
                            </div>
                            <h5 >Papaya </h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$220</h5>
                        </div>
                    </div>
                </div> */}
                    {/* 4th section */}
                {/* <div className='container scndLower' >
                <div className='row' >
                    <div className='col-lg-4'>
                        <p style={{marginBottom: '0px'}}>NATURE DEAL OF THE DAY</p>
                        <h2 style={{fontWeight: '300'}}>Organic Goods <span style={{fontWeight: '600'}}> 50%  </span> Off</h2>
                    </div>
                    <div className='col-lg-4'>
                       <img src={spice} />
                       <hr style={{border: '1px solid #5ba616',width: '180'}} />
                       <br/>
                       <p>Expired</p>
                    </div>
                    <div className='col-lg-4'>
                       <p>Who are Ipsum is simply dummy text of the printing and indus try. Lorem Ipsum has been the stry's standard dummy text ever since the</p>
                    </div>
                </div>
                </div> */}

                <div className='homeMiddle'>
                  <img src={leaf} width='190' height='40' alt=''/>
                   <h2 style={{color: '#5ba616'}}>Our Supplier</h2>
                   <h6  style={{color: '#949494',fontSize: '0.8em', opacity: '0.8'}} > <i>We present our achievement and and awards</i></h6>
               </div>

               <div className='container' style={{marginTop: '40px', marginBottom: '130px'}}  >
                <div className='row' >
                    <div className='col-lg-2' >
                        <img src={l1} alt=''/>
                    </div>
                    <div className='col-lg-2' >
                     <img src={l2} alt=''/>
                    </div>
                    <div className='col-lg-2' >
                     <img src={l3} alt=''/>
                    </div>
                    <div className='col-lg-2' >
                     <img src={l4} alt=''/>
                    </div>
                    <div className='col-lg-2' >
                     <img src={l5} alt=''/>
                    </div>
                    <div className='col-lg-2' >
                     <img src={l6} alt=''/>
                    </div>
                </div>
               </div>
                    {/* News Feed */}

              <div className='container newsFeed' >
                   <div className='row'>
                       <div className='col-lg-6'>    
                          <h1 style={{color: '#616161', fontWeight: '300'}}>Subscribe <span style={{color: '#616161', fontWeight: '600'}}  > Newsletter  </span> </h1>
                       </div>
                       <div className='col-lg-6'>    
                            <form>
                               <input placeholder='Type to search' className='navInput' />
                               {/* <button className='navBtn'>Search</button> */}
                           </form>
                       </div>
                   </div>
               </div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    // while(state.product.apiProducts)
    console.log('Home ki Top product',state.products.products)
  
    return{
      products: state.products.products,
      loading: state.products.loading,
      cart:state.cart,

      auth: state.auth,
      errors: state.errors
      
  }
}

export default connect(
    mapStateToProps,
    {   wishList,gmailLogin,userCart }

  )(Home);