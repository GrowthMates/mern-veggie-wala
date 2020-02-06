import React, {Component,Lazy,Suspense} from 'react';
import 
 {getProducts}
  from "../actions/productsAction";
  
import {BrowserRouter ,Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";
import TestComp from './TestComp'
import Home from '../components/centralized/home';
import WishList from '../components/centralized/wishList';
import Contact from '../components/centralized/contact';
import About from '../components/centralized/about';
import Navbar from '../components/centralized/navbar';
import BookedOrder from '../components/admin/bookedOrder';
import Admin from '../components/admin/dashboard';
import AllProducts from '../components/admin/allProducts';
import ApprovalProducts from '../components/admin/approvalProduct';
import AdminNavbar from '../components/admin/adminNavbar';
import CartOwner from '../components/cartOwner/index.js';
import AddProducts from '../components/admin/addProducts';
import DelProducts from '../components/admin/delProducts';
import Footer from '../components/centralized/footer'
import Product from '../components/products/product'
import Combined from '../components/authentication/combine'    
import Collections from '../components/products/collections';
import Information from '../components/products/information' ;
import PrivateRoute from "../components/private-route/PrivateRoute";
import Dashboard from "../components/dashboard/Dashboard"; 
import Cart from '../components/users/userCart/cart'  
import NoMatch from './not-found.js'  
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
  if(window.location.pathname=='/information'){
    var info = true
    // console.log(info, 'info')
  }
  else if(window.location.pathname=='/admin' ){
    console.log('admin aya hy ry baba')
    var adminAndCartOwner = true
  }
  return (
    
        <div>
           
            {/* <Suspense fallback={<div>Loading...</div>}>  */}
                <div>
                                          
              

                  {  adminAndCartOwner==true ? 
                  <BrowserRouter>
                  <AdminNavbar/>
                      <Switch>
                          <Route exact path='/admin' component={Admin}/>
                          <Route path='/approvalProducts' component={ApprovalProducts}/>
                          <Route path='/admin/allProducts' component={AllProducts}/>
                          {/* <Route path='/delProducts' component={DelProducts}/> */}
                          {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
                          {/* <Route component={NoMatch}  /> */}
                          {/* <Route path='/Allimages' component={AllImages}/> */}
                    </Switch>
                </BrowserRouter>
                  
                  :
                   info==true ? null :
                   
                   <BrowserRouter> 
                    <Navbar/> 
                
            {/* <TestComp/> */}
               <Switch>
                   <Route exact path='/' component={Home} />
                   <Route path='/about' component={About} />                 
                   <Route path='/contact' component={Contact} />
                   <Route path='/information' component={Information} />
                   <Route path='/combined' component={Combined} />
                   <Route path='/product/:id' component={Product} />
                   <Route exact path="/collections" component={Collections} />
                   <Route path='/cart' component={Cart}/>
              
                   {/* <Route path='/image' component={TestComp}/> */}
              
                   <Route path='/information' component={Information}/>
                 
           
                   <PrivateRoute exact path="/wishList" component={WishList} />
                   {/* <Route component={NoMatch}  /> */}
                   {/* <Route path='/Allimages' component={AllImages}/> */}
               </Switch>
               <Footer/>
               </BrowserRouter> 
                  }
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
     
  }
}

export default connect(
  mapStateToProps,
  { getProducts }
)(Routes); ;