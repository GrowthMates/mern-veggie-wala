import React,{Component} from 'react';
import './style/navbar.css';
// import { Link, BrowserRouter } from "react-router-dom";
import {BrowserRouter as Router,Link,Redirect,withRouter,NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import heart from './images/heart.png'
import shoppingcart from './images/shopping-cart.png'
import ResponsiveNavbar from './responsiveNavbar'
import ProgressBar from './progressBar'
// import axios from 'axios'
import VeggieLogo  from "../centralized/images/veggie-wala-logo.png";
import UserIcon  from "../centralized/images/icons8-user-32.png"; 
import PopOverComp from "./popover/popover";
// import socketIOClient from "socket.io-client";

// export const socket = socketIOClient("http://localhost:5000");


class Navbar extends Component{
 constructor(){
     super();
    this.state = {
        windowWidth: window.innerWidth,
        mobileNavVisible: false,
        scrollled: undefined,
        evein: true,
        search: '',
        products: undefined,
        filteredProduct:undefined,
        filter:  [],
        qty: undefined,
        searchActive: false,
        totalPrice: JSON.parse(localStorage.getItem('totalPrice')),
        loading:true,
        cartData:undefined,
        user:undefined,

    }
}
    handleResize() {
        this.setState({windowWidth: window.innerWidth, mobileNavVisible: !this.state.mobileNavVisible, evein: !this.state.evein});
        console.log('resize')
      }
    componentDidMount(){
            console.log('cmpnt did mt',this.props.totalPrice)
            this.setState({
                totalPrice: this.props.totalPrice,
                loading:false,
                cartData: this.props.cartData,
                user:this.props.user
            })
        
        if(this.props.products){
            this.setState({
                filter: this.props.products
            })
            console.log(this.state.filter,'ksihiu')
        }
        // axios
        //     .get("http://localhost:5000/api/products")
        //     .then((res) => {
        //                     console.log("Products success navbar .........", res.data)
                           
        //                     console.log(this.state.products, 'state products did mnt sy')
        //                     localStorage.setItem('Products', JSON.stringify(res.data));
        //                     // console.log('Products from Storage: ',localStorage.getItem('Products'));
    
        //                       }) // re-direct to login on successful register
        //     .catch(err =>
        //     console.log('Product err: ',err.message)
        //     );


        window.addEventListener('scroll', ()=> {
            const isTop = window.scrollY < 100;
            if (isTop !== true){
                this.setState({  scrolled: true   })
                // console.log('if')
            }
            else{
                this.setState({ scrolled: false   })
                // console.log('false')
            }
        })

        // console.log(this.state.cartItem.length, 'navbar will mnt')

        // window.addEventListener('resize', this.handleResize.bind(this));
    }
   
             
    componentWillReceiveProps(nextProps,props) {
        if (nextProps) {
        // var item = nextProps.cartProducts.cart.length
         console.log('nextprops navbar sy---------',nextProps.totalPrice,props)
        this.setState({
            qty: nextProps.cartProducts,
            filter: nextProps.products,
            totalPrice: nextProps.totalPrice,
            cartData:nextProps.cartData,
            user:nextProps.user
        })

        }
      }


    componentWillMount(){
        window.removeEventListener('scroll ', ()=>{
            window.removeEventListener('resize', this.handleResize.bind(this));

        })

       
        // axios{
           
        // .get("http://localhost:5000/api/products")
        // .then((res) => {
        //             this.setState({
        //                 products: res.data
        //                 })
        //                 var filterProduct = this.state.products.filter((product) => {
        //                     return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        //                   })
        //                   this.setState({
        //                       filteredProduct: filterProduct
        //                     })
        //                     console.log("Products filteres",this.state.filteredProduct )
        //                 localStorage.setItem('Products', JSON.stringify(res.data));
        //                 // console.log('Products from Storage: ',localStorage.getItem('Products'));

        //                   }) // re-direct to login on successful register
        // .catch(err =>
        // console.log('Product err: ',err.message)
        // );
    }

    updateSearch(e){
        this.setState({
            search: e.target.value.substr(0,20),
            searchActive: true,
        })
        // console.log(e.target.value=== )
        // if(this.state.search==''){
        //     this.setState({
        //         searchActive: false,
        //     })
        // }

    }

    render(){
        // console.log('nav progeress...',this.props.progressLoading)

        if(!this.state.filter){ console.log('nh i') }
        else{ 
            
            var filterProduct = this.state.filter.filter(product => {
                
                return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            })
            // this.setState({
            //     filteredProduct: filterProduct
            // })
        }

        // console.log(filterProduct, 'prdcts fltr k lye')
        console.log('ViewPort width====',this.state.windowWidth )

      
      
        return(
            <div className=""> 

            {window.innerWidth<1000 ? <ResponsiveNavbar />:void 0}
            
             {/* <div className={this.state.scrolled ? ' nav  desktop' : 'nav desktop'}>  */}
             <div className={this.state.scrolled ? ' nav scrolled  ' : 'nav'}>
                {/* Progress Bar */}
                {this.props.progressLoading?<ProgressBar/>:void 0}
              
                <div className='container-fluid navUpper' >
                    <div className='row' style={{justifyContent:'center'}}>                
                         <div className='col-lg-3 col-sm-12 col-xs-5'>
                           <div className="logo-header navLogo" > 
                            <Link to="/"><img  src={VeggieLogo} className="img-fluid" style={{position:'absolute'}}/></Link>
                           </div>
                         </div>
                         <div className='col-lg-5 col-md-5 col-sm-5'  style={{padding:'0 4rem'}}>
                           <form>
                               <input value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder='Type to search' className='navInputt' />
                               <button className='navBtnn'>Search</button>
                           </form>
                           <div className='searchFilterOut'>
                           
                               {
                                this.state.search===''? void 0 :
                                this.state.searchActive===false ? void 0 :
                                filterProduct ? filterProduct.map(item => {
                                   return (
                                  <Link  to = {`/product/${item._id}`}>
                                      <div className='searchFilterIn'>
                                           <img src={item.image} width='40' height='40' /> <span>{item.name}</span>
                                    </div></Link>
                                   
                                   )
                               }) : (
                                   <div >
                                       <p >Loading.........</p>
                                   </div>
                               )
                               }
                               
                                
                           </div>
                         </div>
                         <div className='col-lg-3 forHidden'>                        
                             <div className='container'>
                                 <div className='row' style={{justifyContent:'flex-end'}}>
                                     <div  className='col-lg-6 heart' >
                                      <Link to='/wishList'>   <img className='cursor-pointer' src={heart}  width='20' height='20.52' /></Link>
                                      {/* <Link to='/user/login'>    */}
                                      {/* <img className='cursor-pointer' src={UserIcon}  width='20' height='20.52' id='Popover1' type='button'/> */}
                                         <PopOverComp user={this.props.user} imgSrc={UserIcon}/>

                                      {/* </Link> */}
                                         <span> | </span>

                                        
                                         {/* <Link className="dropdown">
                                         <img className='cursor-pointer dropbtn' src={shoppingcart} width='20' height='20.52'/> <sup>{this.state.qty || this.props.cartProducts }</sup>
                                            <div className="dropdown-content">
                                                <div style={{overflowY: 'scroll', height: '30em'}} > 
                                                {!this.state.cartData?<p>loading</p> : (
                                                this.state.cartData.map((item,index) => {
                                                    return (
                                                        <div key={index} className='row hvr'>
                                                            <div className='col-lg-3'>
                                                                
                                                                <img src={item.filterProduct.image[0]} height='40' width='40' />
                                                            </div>
                                                            <div className='col-lg-8'>
                                                                <p>{item.filterProduct.name}</p>
                                                                <p>{item.filterProduct.price}</p>
                                                                <p>{item.quantity}</p>
                                                                    
                                                            
                                                                </div>
                                                        </div>
                                                    )
                                                })
                                               
                                                )
                                            }
                                            
                                            </div>
                                            </div>
                                         </Link> */}
                                     </div>
                                    
                                      <div  className='col-lg-5 cart' >
                                          <div className='row'>

                                      <div  id='cart-box-icon'>

                                          <Link to='/cart'>
                                             <img className='cursor-pointer' src={shoppingcart} width='20' height='20.52'/> <sup id='cart-sup'>{this.state.qty || this.props.cartProducts }</sup>
                                         </Link>
                                         </div>
                  {/*-----------------------Working Continue   ------------------------------  */}

                                      {/* <Link className="dropdown">
                                         <img className='cursor-pointer dropbtn' src={shoppingcart} width='20' height='20.52'/> <sup>{this.state.qty || this.props.cartProducts }</sup>
                                            <div className="dropdown-content">
                                                <div style={{overflowY: 'scroll', height: '30em'}} > 
                                                {!this.state.cartData?<p>loading</p> : (
                                                this.state.cartData.map((item,index) => {
                                                    return (
                                                        <div key={index} className='row hvr'>
                                                            <div className='col-lg-3'>
                                                                
                                                                <img src={item.filterProduct.image[0]} height='40' width='40' />
                                                            </div>
                                                            <div className='col-lg-8'>
                                                                <p>{item.filterProduct.name}</p>
                                                                <p>{item.filterProduct.price}</p>
                                                                <p>{item.quantity}</p>
                                                                    
                                                            
                                                                </div>
                                                        </div>
                                                    )
                                                })
                                               
                                                )
                                            }
                                            
                                            </div>
                                            </div>
                                         </Link> */}
                                         <div >

                                        <p>
                                            <span className='cartPrice' >Rs. 
                                            {
                                            this.state.loading===true? <span className="loader">Loading</span> :
                                            this.props.loading===true ? this.props.totalPrice:
                                             this.state.totalPrice 
                                            } </span>
                                            
                                        </p>
                                         </div>
                                          </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                

             
              
{/* yahan sy lya tha fixed ka */}
                    
              </div>

              <div className='container-fluid '>
                    
                    <hr style={{color: ' #cecdcd',marginBottom:'0.6rem'}} />

                </div>

                <div className='container' style={{textAlign: 'center'}}>
                    <ul className='bottomNav'>
                        <li><NavLink exact to='/' activeClassName='nav-active-link'>Home</NavLink></li>
                        <li><NavLink exact to='/contact' activeClassName='nav-active-link'>Contact Us</NavLink></li>
                        <li><NavLink exact to='/about' activeClassName='nav-active-link'>About Us</NavLink></li>
                        <li><NavLink exact to='/collections' activeClassName='nav-active-link'>Products</NavLink></li>
                        {/* <li><NavLink exact to='/user/login' activeClassName='nav-active-link'>Sign In</NavLink></li> */}
                        <li><NavLink exact to='/cart' activeClassName='nav-active-link'>Cart</NavLink></li>
                    </ul>
                </div>
            </div>
            </div>
        )
    }
}

// redux

const mapStateToProps = state => {
    console.log('Navbar nunnuu-------',state.cartReducer.cart)
    
    if(state.cartReducer.cart)
        {return {
            cartProducts: state.cartReducer.cart.length,
            products: state.products.products,
            totalPrice: state.cartReducer.totalPrice,
            loading: state.cartReducer.loading,
            cartData:state.cartReducer.cart,
            user:state.auth.user,
            progressLoading: state.progressBar.loading

        }}
        else{
            return {
                cartProducts:0,
                products: state.products.products,
                totalPrice: 0,
                loading: state.cartReducer.loading,
                cartData:null,
                user:state.auth.user,
                progressLoading: state.progressBar.loading
            }
        }
  };
  export default connect(
    mapStateToProps,
    null
  )(withRouter(Navbar));