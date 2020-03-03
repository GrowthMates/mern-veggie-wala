import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom'
import {carts} from '../../actions/adminAction'
import './style/dashboard.css'
import CartDashboard from './cartDashboard';
import CartProducts from './cartProducts';
import CartOrders from './cartOrders'
import RecieveProduct from './recieveProduct'
import axios from 'axios';
import CartSetting from './cartSetting';
import admin from '../../components/centralized/images/admin1.png'
import notification from '../../components/centralized/images/notification.png'
import message from '../../components/centralized/images/message.png'
import flag from '../../components/centralized/images/flag.png'

let log = console.log
class CartLandingPage extends Component{
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
    }
    //     axios.get('http://localhost:5000/api/getCartOwners')
    //     .then(res => {
    //         log('carta ka data',res.data);
    //     })
    //     .catch(err => log('cart ka error',err))        
    // }

    componentWillReceiveProps(nextProps){
        
    }

closeNav(){
    this.setState({
        close:true
    })
    console.log('close ka')
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
                        <li  style={{color:'#fff'}} > <img src={message}  width='16' height='16' /> <span id='topNavInnerf' > 5 </span> </li>
                        <li> <img src={flag}  width='16' height='16'/> <span id='topNavInners' > 5 </span> </li>
                        <li> <img src={notification}  width='16' height='16' /> <span id='topNavInnert' > 5 </span> </li>
                        <li  > <img src={admin}  width='25' height='25' /> <span style={{fontSize: '16px',color:'#fff',marginBottom:'10px'}}> Cart 1 </span>  </li>
                    </ul>
                </div>

             </div>
                <div className='row'  >
                    <div className='col-lg-12' style={{display: 'flex',flexGrow: '8'}} >
                        <BrowserRouter>                        
                            <div className={this.state.open===true ?'col-lg-0' :'col-lg-2 '} style={{padding: '0px'}}  >
                                <ul id='sideNavbar'>
                                    <li><Link to='/cart/landingPage'>
                                        <i style={{marginRight: '10px'}} class="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
                                    </li>
                                    <li><Link to='/cart/product' >
                                        <i style={{marginRight: '10px'}} class="fa fa-product-hunt" aria-hidden="true"></i> Products</Link>
                                    </li>
                                    <li><Link to='/cart/recieve' >
                                        <i style={{marginRight: '10px'}} class="fa fa-product-hunt" aria-hidden="true"></i> Recieve Products </Link>
                                    </li>
                                    <li><Link to='/cart/orders' >
                                        <i style={{marginRight: '10px'}} class="fa fa-first-order" aria-hidden="true"></i> Orders</Link>
                                    </li>
                                  
                                    <li><Link to='/cart/sales'>
                                        <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> Sales</Link>
                                    </li>
                                    <li><Link to='/cart/setting'>
                                        <i style={{marginRight: '10px'}} class="fa fa-wrench" aria-hidden="true"></i> Settings</Link>
                                    </li>

                                </ul>
                            </div>

                
                           <div className={this.state.open===true ?'col-lg-10' :'col-lg-10 '} style={{flexGrow: '8'}} >
                            <Switch style={{marginTop: '20px'}} >
                                <Route exact path='/cart/landingPage' component={CartDashboard} />
                                <Route  path='/cart/product' component={CartProducts} />                              
                                <Route exact path='/cart/orders' component={CartOrders} />                                
                                <Route exact path='/cart/setting' component={CartSetting} />
                                <Route exact path='/cart/recieve' component={RecieveProduct} />
                                                         
                                {/* <Route exact path='/cart/sales' component={Sales} /> */}
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

// const mapStateToprops =state => {
//     console.log(state);
    
//     return {
//         IsApproved: state.auth.user
//     }
// }
export default connect(
    null,
    {carts}
)(CartLandingPage)