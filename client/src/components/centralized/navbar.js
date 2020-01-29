import React,{Component} from 'react';
import './style/navbar.css';
// import { Link, BrowserRouter } from "react-router-dom";
import {BrowserRouter as Router,Link,Redirect,withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import heart from './images/heart.png'
import shoppingcart from './images/shopping-cart.png'
import axios from 'axios'




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
        filter: undefined,
        // cartItem: JSON.parse(localStorage.getItem('CartProduct')) || [],
        qty: undefined,
        searchActive: false

    }
}
    handleResize() {
        this.setState({windowWidth: window.innerWidth, mobileNavVisible: !this.state.mobileNavVisible, evein: !this.state.evein});
        console.log('resize')
      }
    componentDidMount(){

        if(this.props.products){
            this.setState({
                filter: this.props.products
            })
            console.log(this.state.filter,'ksihiu')
        }
        axios
            .get("http://localhost:5000/api/products")
            .then((res) => {
                            console.log("Products success navbar .........", res.data)
                           
                            console.log(this.state.products, 'state products did mnt sy')
                            localStorage.setItem('Products', JSON.stringify(res.data));
                            // console.log('Products from Storage: ',localStorage.getItem('Products'));
    
                              }) // re-direct to login on successful register
            .catch(err =>
            console.log('Product err: ',err.message)
            );


        window.addEventListener('scroll', ()=> {
            const isTop = window.scrollY < 100;
            if (isTop !== true){
                this.setState({  scrolled: true   })
                console.log('if')
            }
            else{
                this.setState({ scrolled: false   })
                console.log('false')
            }
        })

        // console.log(this.state.cartItem.length, 'navbar will mnt')

        // window.addEventListener('resize', this.handleResize.bind(this));
    }
   
             
    componentWillReceiveProps(nextProps,props) {
        if (nextProps) {
        // var item = nextProps.cartProducts.cart.length
         console.log('nextprops navbar sy---------',nextProps,props)
        this.setState({
            qty: nextProps.cartProducts,
            filter: nextProps.products
            
        })

        }
      }


    componentWillMount(){
        window.removeEventListener('scroll ', ()=>{
            window.removeEventListener('resize', this.handleResize.bind(this));

        })

       
        axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
                    this.setState({
                        products: res.data
                        })
                        var filterProduct = this.state.products.filter((product) => {
                            return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                          })
                          this.setState({
                              filteredProduct: filterProduct
                            })
                            console.log("Products filteres",this.state.filteredProduct )
                        localStorage.setItem('Products', JSON.stringify(res.data));
                        // console.log('Products from Storage: ',localStorage.getItem('Products'));

                          }) // re-direct to login on successful register
        .catch(err =>
        console.log('Product err: ',err.message)
        );
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
        // console.log(this.state.filter, 'navbar will recve props')

        if(this.state.filter){
            
            var filterProduct = this.state.filter.filter(product => {
                
                return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            })
            // this.setState({
            //     filteredProduct: filterProduct
            // })
        }

        // console.log(filterProduct, 'prdcts fltr k lye')

      
      
        return(
            <div className="div1"> 
              <div >

                <div className='container navUpper' >
                    <div className='row'>                
                         <div className='col-lg-3 col-sm-12 col-xs-12'>
                           <div className="logo-header navLogo" > 
                            <Link to="/"><img style={{width: "95px"}} src="//cdn.shopify.com/s/files/1/0027/9642/1229/files/gf.png?v=1559959830" className="img-fluid"/></Link>
                           </div>
                         </div>
                         <div className='col-lg-5'>
                           <form>
                               <input value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder='Type to search' className='navInput' />
                               <button className='navBtn'>Search</button>
                           </form>
                           <div>
                           
                               {
                                this.state.search===''? void 0 :
                                this.state.searchActive===false ? void 0 :
                                filterProduct ? filterProduct.map(item => {
                                   return (
                                       <div>{item.name}</div>
                                   )
                               }) : void 0
                               }
                               
                                
                           </div>
                         </div>
                         <div className='col-lg-4'>                        
                             <div className='container'>
                                 <div className='row'>
                                     <div  className='col-lg-6 heart' >
                                         <img className='cursor-pointer' src={heart}  width='20' height='20.52' />
                                         <span> | </span>

                                        
                                          <Link to='/cart'>
                                         <img className='cursor-pointer' src={shoppingcart} width='20' height='20.52'/> <sup>{this.state.qty || this.props.cartProducts }</sup>
                                         </Link>
                                     </div>
                                    
                                      <div  className='col-lg-6 cart' >
                                        <p>Shopping cart
                                            <span className='cartPrice' >Rs.140.00</span>
                                        </p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                    </div>

                <div className='container'>
                    
                    <hr style={{color: ' #cecdcd'}} />

                </div>
              

                    <div className={this.state.scrolled ? ' nav scrolled' : 'nav'}>
                    <div className='container'>
                      <div className='row'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light nav1 col-lg-12" >
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01  " >
                        
                            {/* <a className="navbar-brand" href="#">Hidden brand</a> */}
                            <div className=" navlinks navs col-lg-12">
                             <ul className="navbar-nav mr-auto mt-2 mt-lg-0 innerNav">
                              <li className="nav-item active col-lg-2">
                            <Link to='/' className="nav-link">Home<span className="sr-only">(current)</span></Link>
                                <hr className='hra' />
                            </li>
                            <li className="nav-item col-lg-2">
                              <Link to='/contact' style={{color: 'red'}}  className="nav-link" style={{padding: '0px 0px !important'}}>Contact Us</Link>
                              <hr className='hra' />

                            {/* <Link to='/contact'>contaccted</Link> */}
                            </li>
                            <li className="nav-item col-lg-2">
                             <Link to='/about' className="nav-link">About Us</Link>
                             <hr className='hra' />
                             
                            </li>
                            <li className="nav-item col-lg-2">
                             <Link to='/combined' className="nav-link">Sign In</Link>
                             <hr className='hra' />

                            </li>
                            <li className="nav-item col-lg-2">
                              <Link to='/information' className="nav-link">Information</Link>
                              <hr className='hra' />

                            </li>
                            <li className="nav-item col-lg-2">
                              <Link to='/cart' className="nav-link">Blog</Link>
                              <hr className='hra' />

                            </li>
                            <li className="nav-item col-lg-2">
                              <Link to='/collections' className="nav-link">Collections</Link>
                              <hr className='hra' />

                            </li>
                            </ul>
                            </div>
                        </div>
                        </nav>
                     </div>
                    </div>
                    </div>
                    </div>


                </div>
        )
    }
}

// redux

const mapStateToProps = state => {
    // console.log('Navbar nunnuu-------',state.cartReducer.cart.length)
    
    if(state.cartReducer.cart)
        {return {
            cartProducts: state.cartReducer.cart.length,
            products: state.products.products

        }}
        else{
            return {
                cartProducts:0,
                products: state.products.products
    
            }
        }
  };
  export default connect(
    mapStateToProps,
    null
  )(withRouter(Navbar));