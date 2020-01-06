import React from 'react';
import {BrowserRouter ,Redirect,Link,Route, Switch} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";
import Home from '../components/centralized/home';
import Contact from '../components/centralized/contact';
import About from '../components/centralized/about';
import Navbar from '../components/centralized/navbar';
import AdminDashboard from '../components/admin/dashboard';
import BookedOrder from '../components/admin/bookedOrder';
import UserDashboard from '../components/users/dashboard';
import Footer from '../components/centralized/footer'
import Product from '../components/products/product'
import Combined from '../components/authentication/combine'    
import Collections from '../components/products/collections';
import Information from '../components/products/information' ;
import PrivateRoute from "../components/private-route/PrivateRoute";
import Dashboard from "../components/dashboard/Dashboard"; 
import Cart from '../components/users/userCart/cart'  

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
      window.location.href = "./login";
    }
  }

 class Routes extends React.Component{

render(){
    return (
        <Provider store={store}>
        <div>
            <BrowserRouter>
            <div>

            <div>
            <Navbar/>     
               <Switch>
                   <Route exact path='/' component={Home} />
                   <Route path='/about' component={About} />
                   <Route exact path="/information" component={Information} />
                   <Route path='/contact' component={Contact} />
                   <Route path='/combined' component={Combined} />
                   <Route path='/product' component={Product} />
                   <Route exact path="/collections" component={Collections} />
                   <Route path='/cart' component={Cart}/>
                   <Route path='/bookedOrder' component={BookedOrder}/>
                   <PrivateRoute exact path="/dashboard" component={Dashboard} />
               </Switch>
             <Footer/>
            </div>
            
            </div>

            </BrowserRouter>

        </div>
        </Provider>
    )
 }
}

export default Routes