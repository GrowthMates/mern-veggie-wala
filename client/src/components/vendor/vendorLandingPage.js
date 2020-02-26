import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom'
import AddProduct from './vendorAddProduct'
import './style/dashboard.css'
import VendorDashboard from './vendorDashboard';
import VendorProducts from './vendorProducts';
import EditProduct from './productActions/editProfuct';
import VendoOrders from './orders';
import Coupons from './Coupons';
import Reports from './reports';
import VendorSetting from './setting';
import axios from 'axios';
import Inventory from './inventory';
import Edit from './productActions/edit';


class AdminLandingPage extends Component{
    constructor(){
        super();
        this.state={
            isApproved: false,
            isStore:false,
        }

    }
    
    componentDidMount() {
  
        
    }
    componentWillReceiveProps(nextProps){
        
    }


    render(){
        console.log('yahi chahye')
        return(
            <div className=''>   
                <div className='row' >
                    <div className='col-lg-12' style={{display: 'flex',flexGrow: '8'}} >
                        <BrowserRouter>                        
                            <div className='col-lg-2 ' >
                                <ul className='sideNavbar'>
                                    <li><Link to='/admin/landingPage'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
                                    </li>
                                    <li><Link to='/admin/product' >
                                        <i style={{marginRight: '10px'}} class="fa fa-product-hunt" aria-hidden="true"></i> products</Link>
                                    </li>
                                    <li><Link to='/admin/orders' >
                                        <i style={{marginRight: '10px'}} class="fa fa-first-order" aria-hidden="true"></i> Orders</Link>
                                    </li>
                                    <li><Link to='/admin/coupons' >
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Coupons</Link>
                                    </li>
                                    <li><Link to='/admin/reports'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Reports</Link>
                                    </li>
                                    <li><Link to='/admin/inventory'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Inventory</Link>
                                    </li>
                                    {/* <li><Link to='/amdin/withdraw'>
                                        <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> Dekhengy kal ko</Link>
                                    </li> */}
                                    <li><Link to='/admin/setting'>
                                        <i style={{marginRight: '10px'}} class="fa fa-wrench" aria-hidden="true"></i> Settings</Link>
                                    </li>

                                </ul>
                            </div>

                
                           <div className='col-lg-10 ' style={{flexGrow: '8'}} >
                            <Switch>
                                <Route exact path='/admin/landingPage' component={VendorDashboard} />
                                <Route  path='/admin/product' component={VendorProducts} />
                                <Route  path='/admin/productAction' component={EditProduct} />
                                <Route exact path='/admin/orders' component={VendoOrders} />
                                <Route exact path='/admin/coupons' component={Coupons} />
                                <Route exact path='/admin/reports' component={Reports} />
                                <Route exact path='/admin/setting' component={VendorSetting} />
                                <Route exact path='/admin/addProduct' component={AddProduct} />
                                <Route exact path='/admin/inventory' component={Inventory} />
                                <Route exact path='/admin/edit/:id' component={Edit} />
                                {/* <Route  path='/vendor/product' component={AddProduct} /> */}
                            </Switch>
                            </div>
                        </BrowserRouter>

                        {/* <div className='col-lg-9' >
                            <AddProduct />
                        </div> */}

                    </div>
                </div>
            </div>
        );
    }


}

// redux

// const mapStateToprops =state => {
//     console.log(state);
    
//     return {
//         IsApproved: state.auth.user
//     }
// }
export default connect(
    null,
    null
)(AdminLandingPage)