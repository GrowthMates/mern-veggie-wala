import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom'
import {carts} from '../../actions/adminAction'
import AddProduct from './vendorAddProduct'
import './style/dashboard.css'
import VendorDashboard from './vendorDashboard';
import VendorProducts from './vendorProducts';
import EditProduct from './productActions/editProfuct';
import VendoOrders from './orders';
import Coupons from './Coupons';
import Reports from './reports';
import VendorSetting from './setting';
import Inventory from './inventory';
import Carts from './carts.js';
import Edit from './productActions/edit';
import Sales from './sales';
import NewCart from './newCart';
import admin from '../../components/centralized/images/admin1.png'
import notification from '../../components/centralized/images/notification.png'
import message from '../../components/centralized/images/message.png'
import flag from '../../components/centralized/images/flag.png'
// import cart from '../users/userCart/cart';

class AdminLandingPage extends Component{
    constructor(){
        super();
        this.state={
            isApproved: false,
            isStore:false,
            counter :0,
            close:false,
            open:false
        }

    }
    
    componentDidMount() {
        this.props.carts()
        if(this.props.carts){
            let {carts} = this.props
            let allOrders = []
            console.log(carts)
             for(let i = 0 ; i<carts.length ; i++){
                   allOrders.push(carts[i].orders) 
                }
            // cart.forEach(element=>{
            //     allOrders.push(element.orders)

               
            // })
            console.log(allOrders)
        }
        // axios.get('/api/getCartOwners')
        // .then(res => {
        //     log('carta ka data',res.data);
        // })
        // .catch(err => log('cart ka error',err))        
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.carts){
            let {carts} = nextProps
            let allOrders = []
            console.log(carts)
             for(let i = 0 ; i<carts.length ; i++){
                   allOrders.push(carts[i].orders) 
                }
            // cart.forEach(element=>{
            //     allOrders.push(element.orders)

               
            // })
            console.log(allOrders)
        }
    }

closeNav(){
    this.setState({
        close:true
    })
    console.log('close ka console')
}
openNav(){
    this.setState({
        open:!this.state.open
    })
    console.log('open ka')

}
    render(){
        console.log(this.state)
        return(
            <>   
             <div className='adminNav' >
                 <div className='navLeft' >
                 {/* <div className > */}
                  
                  {
                      this.state.open===true?
                      <span  style={this.state.open===true? {fontSize:"30px",cursor:"pointer",width: '100%', zIndex: '100000',color:'#fff'} : {fontSize:"30px",cursor:"pointer",width:'0px',color:'#fff'}} onClick={this.openNav.bind(this)}>&#9776; </span>:
                  <span  style={this.state.open===true? {fontSize:"30px",cursor:"pointer",width: '100%', zIndex: '100000',color:'#fff'} : {fontSize:"30px",cursor:"pointer",width:'0px',color:'#fff'}} onClick={this.openNav.bind(this)}>X </span>
                  }
              
               
                </div>
                <div className='navRight' >
                    <ul  id='adminNavRight'>
                        <li  style={{color:'#fff'}} > <img src={message}  width='16' height='16' alt='Message' /> <span id='topNavInnerf' > 5 </span> </li>
                        <li> <img src={flag}  width='16' height='16' alt='Flag'/> <span id='topNavInners' > 5 </span> </li>
                        <li> <img src={notification}  width='16' height='16' alt='Notification' /> <span id='topNavInnert' > 5 </span> </li>
                        <li  > <img src={admin}  width='25' height='25' alt='Admin' /> <span style={{fontSize: '16px',color:'#fff'}}> Admin </span>  </li>
                    </ul>
                </div>

             </div>
                <div className='row'  >
                    <div className='col-lg-12' style={{display: 'flex',flexGrow: '8'}} >
                        <BrowserRouter>                        
                            <div className={this.state.open===true ?'col-lg-0' :'col-lg-2 '} style={{padding: '0px'}}  >
                                <ul id='sideNavbar'>
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
                                    <li><Link to='/admin/carts'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Carts</Link>
                                    </li>
                                    <li><Link to='/admin/sales'>
                                        <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> Sales</Link>
                                    </li>
                                    <li><Link to='/admin/setting'>
                                        <i style={{marginRight: '10px'}} class="fa fa-wrench" aria-hidden="true"></i> Settings</Link>
                                    </li>

                                </ul>
                            </div>

                
                           <div className={this.state.open===true ?'col-lg-10' :'col-lg-10 '} style={{flexGrow: '8'}} >
                            <Switch style={{marginTop: '20px'}} >
                                <Route exact path='/admin/landingPage' component={VendorDashboard}  counter={this.state.counter} />
                                <Route  path='/admin/product' component={VendorProducts} />
                                <Route  path='/admin/productAction' component={EditProduct} />
                                <Route exact path='/admin/orders' component={VendoOrders} />
                                <Route exact path='/admin/coupons' component={Coupons} />
                                <Route exact path='/admin/reports' component={Reports} />
                                <Route exact path='/admin/setting' component={VendorSetting} />
                                <Route exact path='/admin/addProduct' component={AddProduct} />
                                <Route exact path='/admin/inventory' component={Inventory} />
                                <Route exact path='/admin/orders' component={VendoOrders} />
                                <Route exact path='/admin/inventory' component={Inventory} />
                                <Route exact path='/admin/carts' component={Carts} />
                                <Route exact path='/admin/edit/:id' component={Edit} />
                                <Route exact path='/admin/newCart' component={NewCart} />
                                <Route exact path='/admin/sales' component={Sales} />
                                {/* <Route  path='/vendor/product' component={AddProduct} /> */}
                            </Switch>
                            </div>
                        </BrowserRouter>

                        {/* <div className='col-lg-9' >
                            <AddProduct />
                        </div> */}

                    </div>
                </div>
            </>
        );
    }


}

// redux

// const mapStateToprops = state => {
//     console.log(state,state.cartReducer.getCarts);
//     return{
//        carts:state.cartReducer.getCarts
//     }
// }
export default connect(
    null,
    {carts}
)(AdminLandingPage)