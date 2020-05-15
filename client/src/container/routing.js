import React, {Component} from 'react';
import 
 {getProducts}
  from "../actions/productsAction";
  
import {BrowserRouter ,Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import store from "../store";
import Home from '../components/centralized/home';

import WishList from '../components/centralized/wishList';
import Contact from '../components/centralized/contact';
import About from '../components/centralized/about';
import Navbar from '../components/centralized/navbar';
// import BookedOrder from '../components/admin/bookedOrder';
// import Admin from '../components/admin/dashboard';
// import AllProducts from '../components/admin/allProducts';
// import ApprovalProducts from '../components/admin/approvalProduct';
// import AdminNavbar from '../components/admin/adminNavbar';
// import CartOwner from '../components/cartOwner/index.js';
// import AddProducts from '../components/admin/addProducts';
// import DelProducts from '../components/admin/delProducts';
import Footer from '../components/centralized/footer'
import Product from '../components/products/product'
import Combined from '../components/authentication/combine'    
import Collections from '../components/products/collections';
import Information from '../components/products/information' ;
import PrivateRoute from "../components/private-route/PrivateRoute";
import Cart from '../components/users/userCart/cart'  
import AdminLandingPage from '../components/vendor/vendorLandingPage'
import CartLandingPage from '../components/cart/cartLandingPage'
// import ProgressBar from '../components/centralized/progressBar'
// import NoMatch from './not-found.js'  
// import AllImages from './AllImages'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./combined";
    }
  }


  // 404 page not found

//  
// const Home = lazy(() => import('../components/centralized/home'))

 class Routes extends Component{


  state={
    loading:true
  }

  componentWillReceiveProps(nextProps){

    console.log('props Routing  will rcve props sy', nextProps);
    // this.setState({
    //     bookedOrderData: nextProps.products
    // })
}

// componentDidMount(){
//   this.setState({
//     loading:false
//   })
// }
render(){
//  console.log('routing ka render==---->',this.props)
this.props.getProducts('Routing')
  // const information = window.location.pathname='/information'
  console.log(window.location)
  if(window.location.pathname==='/information'){
    // var info = true  
    // console.log(info, 'info')
  }
  else if(window.location.pathname=='/admin' ){
    console.log('admin aya hy ry baba')
    // var adminAndCartOwner = true
  }
  return (
    
        <div>
          {/* {this.props.progressLoading?:void 0} */}
        
            {/* <Suspense fallback={<div>Loading...</div>}>  */}
                <div>
                                          
              

                  {/* {  adminAndCartOwner==true ? 
                  <BrowserRouter>
                  <AdminNavbar/>
                      <Switch>
                          {/* <Route path='/delProducts' component={DelProducts}/> */}
                          {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
                          {/* <Route component={NoMatch}  /> */}
                          {/* <Route path='/Allimages' component={AllImages}/> */}
                    {/* </Switch> */}
                {/* </BrowserRouter> */}
                  
                  {/* : */}
                  {/* info==true ? null : */} 
                  
                  <BrowserRouter>

                    <Navbar/> 
                
            {/* <TestComp/> */}
            {/* <Suspense fallback={<div><h2>Loading...</h2></div>}> */}
            <div style={{marginTop:'8rem'}}>

               <Switch>
                  {/* <Route path='/approvalProducts' component={ApprovalProducts}/> */}
                  {/* <Route path='/admin/allProducts' component={AllProducts}/> */}
                   <Route exact path='/' component={Home} />
                  {/* <Route exact path='/admin' component={Admin}/> */}
                   <Route exact path='/about' component={About} />                 
                   <Route exact path='/contact' component={Contact} /> 
                   
                   <Route exact path='/user/sign-up' component={Combined} />
                   <Route exact path='/user/login' component={Combined} />
                   <Route exact path='/product/:id' component={Product} />
                   <Route exact path="/collections" component={Collections} />
                   <Route exact path='/cart' component={Cart}/>
                   <Route exact path='/admin/landingPage' component={AdminLandingPage}/>
                   <Route exact path='/cart/landingPage' component={CartLandingPage}/>

              
                   {/* <Route path='/image' component={TestComp}/> */}
              
                   <PrivateRoute exact path='/information' component={Information}/>
                 
           
                   <PrivateRoute exact path="/wishList" component={WishList} />

                   {/* <Route component={NoMatch}  /> */}
                   {/* <Route path='/Allimages' component={AllImages}/> */}

               </Switch>
            </div>
               {/* </Suspense> */}
               <Footer/>
               </BrowserRouter> 
                  
               {/* {this.props.pathChecker==true || info==true? null : <Footer/> } */}


            
       
            
            </div>
            {/* </Suspense> */}

        </div>
    )
 }
}

const mapStateToProps = (state) =>{
  // var array= Array.from(state.products.cartProducts)
  console.log("Reducer check cart prod.............", state.cartReducer.totalPrice)
  return{ 
      pathChecker: state.products.pathChecker,
      progressLoading: state.progressBar.loading
  }
}

export default connect(
  mapStateToProps,
  { getProducts }
)(Routes); ;