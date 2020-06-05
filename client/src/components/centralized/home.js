import React,{Component} from 'react';
import {connect} from 'react-redux';

import HomeLoader from './home-loader'
import {Link} from 'react-router-dom'
import GreenButton from "./buttons/greenButton"
import fresh from './images/fresh.webp'
import hearts from './images/hearts.webp'
// import heart1 from './images/heart.png'
// import shoppingcart1 from './images/shopping-cart.png'
// import search1 from './images/search.png'
import { CloudinaryContext } from 'cloudinary-react';
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
import {wishList,userCart,getSingleProduct} from '../../actions/productsAction'
import Homeimages from "./home-assets/images"
import {gmailLogin} from '../../actions/authActions'
import {getFeaturedProducts, countProducts} from '../../actions/productsAction'
import queryString from "query-string";
import ProductCards from "./cards"
import ThankYouNote from "../products/thankYouNote"
import MakeReviwes from "./Reviews/makeReview"

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

  
    // }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.products){
            // console.log('Home Products Next Props',nextProps)

        if(nextProps){
            console.log('Home Products Next Props',nextProps)
            if(nextProps.products){
                let featuredProducts = nextProps.products.filter(e => e.productType==='Featured product')
               if(featuredProducts.length>=8){ 
                    var newProducts=[];
                    for(let i=0;i<=11;i++){
                        console.log('ForLoopNextProps====',featuredProducts[i])
                        newProducts.push(featuredProducts[i])
                    }
                    this.setState({
                        products:newProducts,
                        loading:false           
                    })
                 }
                else{
                    this.setState({
                        products:featuredProducts,
                        loading:false           
                    })
                }
        }

        }
    }}
    componentDidMount(){
      
        //call featured products api
            this.props.getFeaturedProducts()
            this.props.countProducts()


        //Calling UserCart API...
        if(this.props.auth.user){
            this.props.auth.user.id?
            this.props.userCart(this.props.auth.user.id): void 0
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
           let featuredProducts = this.props.products.filter(e => e.productType==='Featured product')
           console.log(featuredProducts)
            if(featuredProducts.length>=8){ 
                var newProducts=[];
                for(let i=0;i<=11;i++){
                    console.log('ForLoopNextProps====',featuredProducts[i])
                    newProducts.push(featuredProducts[i])
                }
                this.setState({
                    products:newProducts,
                    loading:false           
                })
            }
            else{
                this.setState({
                    products:featuredProducts,
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
        
        return(

            <div id="home-container">
                <ThankYouNote/>
             
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
                         <div className="shop-now-btn-1 carousel-caption d-md-block">
                        <Link to='/collections'>
                        <button className="shop-button">
                            Shop Now
                        </button>
                        </Link>
                        </div> 
                        </div>
                        <div className="carousel-item">
                         <img className="d-block w-100" src={Slide2} alt="Second slide"/>
                         <div className="shop-now-btn-2 carousel-caption d-md-block">
                         <Link to='/collections'>
                        <button className="shop-button">
                            Shop Now
                        </button>
                        </Link>
                        </div> 
                        </div>
                        <div className="carousel-item">
                         <img className="d-block w-100" src={Slide3} alt="Third slide"/>
                         <div className="shop-now-btn-3 carousel-caption d-md-block">
                         <Link to='/collections'>
                        <button className="shop-button">
                            Shop Now
                        </button>
                        </Link>
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

                  
                <div>

                {/* //////// Create Reviews Modal ///////*/}

                    {/* <MakeReviwes/> */}
                    
                </div>
               <div id="mid-section-home">

               <div className='homeMiddle'>
           
                  <div className="grow-best-food">
                   <h2>We Grow Best Food</h2>
                   <h6  style={{color: '#949494',fontSize: '0.8em', opacity: '0.8', width:'30%', margin:'auto'}} >
                        <i>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</i></h6>
                  </div>
               </div>
                {/* our qualities  */}
                
               <div className='container-fluid threeMiddlw'>
                   {/* <div className="green-bg"> */}
                        <img src={Homeimages.upperLeafs} alt='Leafs' id="upper-leafs-img"/>
                   <div className='container'>
                       
                    <div className='row' style={{ alignItems: 'center'}} >
                        <div className='col-12 col-sm-12 col-md-4 col-lg-4 middleLeft' >
                            
                            <h4><img src={fresh} alt=''/> Fresh</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>

                            
                            <h4><img src={hearts} alt=''/> Healthy</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>

                           
                            <h4><img src={Homeimages.ecoIcon} alt=''/> Eco</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                        </div>

                        {/* center image... */}
                        {/* <div className='col-lg-1 col-md-1 col-sm-12 col-xs-12'></div> */}
                        <div className='col-12 col-sm-12 col-md-4 col-lg-4 '  >
                            <img src={Homeimages.greenMango} height='auto' width="100%" alt=''/>
                        </div>
                         {/* <div className='col-lg-1 col-md-1 col-sm-12 col-xs-12' ></div> */}

                        <div className='col-12 col-sm-12 col-md-4 col-lg-4 middleRight' >
                            <h4>Tasty <img src={Homeimages.tasteTongue} alt=''/></h4>
                            
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                            <h4>Nutritious <img src={Homeimages.nutritiousIcon} alt=''/></h4>
                            
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                            <h4>Pemium <img src={Homeimages.premiumIcon} alt=''/></h4>
                            
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
                        </div>
                    </div>
                    </div>     
                   {/* </div> */}
               </div>
               </div>

                {/* our services */}
                <div className='container-fluid' style={{paddingLeft:'0',paddingRight:'0'}}>
                    <div style={{position:'relative'}}>

                        <img src={Homeimages.avocado} alt='Avocado' id="avocado-side-img"/>
                    <div className='container'>

                    <div className='row' style={{position:'relative', padding:'5%'}}>
                        <div className='col-12 col-sm-12 col-md-6  col-lg-3 midLow ' >

                            <p className="round-p"><img  src={Homeimages.truckIcon} style={{width:"6rem"}} alt=''/></p>
                            <h4>Fast Delivery</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}}>Delivery wIthin 12 hour</p>
                        </div>
                        <div className='col-12 col-sm-12 col-md-6  col-lg-3 midLow ' >
                        <p className="round-p"><img  src={Homeimages.approvedIcon} style={{width:"3rem"}} alt=''/></p>
                            <h4>Best Services</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Support online 24/7</p>
                        </div>
                        <div className='col-12 col-sm-12 col-md-6  col-lg-3 midLow ' >
                        <p className="round-p"><img src={Homeimages.listIcon} style={{width:"3rem"}} alt=''/></p>
                            <h4>All-in-one</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Fruits & Vegetable</p>
                        </div>

                        <div className='col-12 col-sm-12 col-md-6  col-lg-3 midLow ' >                          
                 

                        <p className="round-p"><img src={Homeimages.peopleLove} style={{width:"4rem"}} alt=''/></p>
                            <h4>Made with Love</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Best Services</p>
                        
                    </div>
                </div>
                    </div>
                    </div>

                {/* topsale */}

                <div className='' style={{marginTop: '25px'}} >
                    <div id="featuredProducts">
                        <h2>Featured Products</h2>
                        <div style={{    width: '20rem',margin: 'auto'}}>
                            <img className="select-option-icon cursor-pointer" src={Homeimages.optionVeg} alt='option-vegetables'/>

                            {/* Fix this color issue immidiately... */}
                            <img className="select-option-icon cursor-pointer" src={Homeimages.optionFruits} alt='option-fruits' />
                            <span>Vegetables</span><span>Fruits</span>  
                        </div>
                        <img src={Homeimages.lowerLeafs} alt='side-Leafs' id="lowerLeaf"/>
                    </div>
                    <div className='container'>

                    <CloudinaryContext cloudName="dbevearco">  
                    <div className='row top-items-list' style={{justifyContent:'center'}}>
                        {
                        (this.state.loading===true)?(<HomeLoader/>):(
                         this.state.products.map((item,index) => {  
                         return(
                            <div key={item._id} className=' col-12 col-sm-6 col-md-6 col-lg-3 ' onClick={this.p1} style={{display:'flex', justifyContent:'center'}} >
                                <ProductCards item={item} />
                            </div>)}
                             )
                        )
                        }
                        {this.state.loading!==true?
                        <div style={{width:'100%',display:'flex',justifyContent:'center', margin:'2rem'}}>
                           <GreenButton buttonText='View More' redirectPath='/collections'/>
                        </div>
                        :void 0    
                    }
                        
                       
                    </div>
                    </CloudinaryContext>

                    </div>
                </div>

               

           {/* Our Suppliers */}
            <div id='our-suppliers'> 
                <div className='sec-1'>
                  {/* <img src={leaf} width='190' height='40' alt=''/> */}
                   <h2>Our Suppliers</h2>
                   <h6  style={{color: '#949494',fontSize: '0.8em', opacity: '0.8'}} >We present our achievement and and awards</h6>
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
            </div>
                    {/* News Feed */}

              <div className=' newsFeed' >
                   
                           <img src={Homeimages.lemons} alt='side-lemons'/>
                          <h1 style={{color: '#616161', fontWeight: 'bolder'}}>Join Our Newsletter</h1>
                          <p>Lorem Ipsum is simply dummy text of the printing.</p>
                      
                          <div style={{position:'relative'}}>  
                            <form>
                               <input type='text' name='newsfeed' placeholder='Enter your Email' />
                               <button>Subscribe</button>
                           </form>
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
      products: state.products.featuredProducts,
      loading: state.products.loading,
      cart:state.cart,
      auth: state.auth,
      errors: state.errors
      
  }
}

export default connect(
    mapStateToProps,
    {   wishList,gmailLogin,userCart, getFeaturedProducts, countProducts}

  )(Home);