import React,{ Component } from "react";
import { connect } from "react-redux";
import './ordersAction.css';
import prod1 from '../centralized/images/truck-icon.png'
import truck from '../centralized/images/truck-icon.png'


class OrdersAction extends Component{

   state={
    provider:undefined,
    trackingNo:undefined,
    dateShip:undefined,
    clicked:false,
    trackingDetails:undefined
   }
   componentDidMount() {
    window.scrollTo(0,0)
   }

   onChange(e){
    e.preventDefault();
    this.setState({
        [e.target.name]:e.target.value
    })
   }

   onClickTracking(e){
       let {provider,trackingNo,dateShip}=this.state
    this.setState({
        trackingDetails:{provider,trackingNo,dateShip}
    })
   }

    render(){
        
        const {order}=this.props;
        console.log('Orders action oredsr====',order)
       if (!order) {
           return console.log('---No ORDERS---')
       }
        const {address,name,cartProducts,number,timeStamp}=order
        const products=cartProducts
        return(
            <div className=''>
                <div className='row'>
                    <div className='row' style={{}}>
                        <div className='col-lg-7'>
                          <div className='col order-data' style={{backgroundColor:'white'}}>

                           {/* Order Heading */}
                            <div className='row order-no' >
                                <h5><strong style={{color:'white'}}>Order#223190</strong></h5>
                            </div>

                            {/* Order Items */}
                            <div className='row order-items'>
                                <table>
                                    <tr style={{borderBottom:'2px solid #F5F5F5'}}>
                                        <th style={{width:'292px'}} colSpan='2'>Items</th>
                                        <th style={{width:'68px'}}>Cost</th>
                                        <th style={{width:'42px'}}>Qty</th>
                                        <th style={{width:'68px'}}>Total</th>
                                    </tr>

                                {/* Map Items Place Here */}

                                {products.map((product,index)=>{
                                    return(

                                    <tr style={{borderBottom:'2px solid #F5F5F5'}}>
                                        <td style={{width:'108px'}}>
                                            <img src={prod1} style={{width:'46px',height:'46px', padding:'2px'}} />
                                        </td>
                                        <td style={{width:'184px'}}>
                                        <span style={{color:'#F58C6F'}}>{product.name}</span>
                                        </td>
                                        <td style={{width:'68px'}}>
                                        <span>PKR {product.price}</span>
                                        </td>
                                        <td style={{width:'42px'}}>
                                        <span>{product.quantity}</span>
                                        </td>
                                        <td style={{width:'68px'}}>
                                         <span>PKR {product.quantity*product.price}</span>
                                        </td>
                                    </tr>
                                    )
                                })}

                                    {/* Shipping */}

                                    <tr>
                                        <td style={{width:'108px'}}>
                                            <img src={truck} width='40' height='40'/>
                                        </td>
                                        <td style={{width:'184px'}}>
                                            <span>Free Shipping</span>
                                        </td>
                                        <td style={{width:'68px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'42px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'68px'}}>
                                            <span>0.00$</span>
                                        </td>
                                    </tr>

                                    {/* Order Total */}

                                    <tr >
                                        <td style={{width:'108px'}}>
                                            
                                        </td>
                                        <td style={{width:'184px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'130px !important'}} colSpan='2'>
                                            <span>Discount[?]:</span>
                                        </td>
                                        <td style={{width:'68px',textAlign:'right'}}>
                                            <span>0.00$</span>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td style={{width:'108px'}}>
                                            
                                        </td>
                                        <td style={{width:'184px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'68px'}} colSpan='2'>
                                            <span>Shipping[?]:</span>
                                        </td>
                                        <td style={{width:'68px',textAlign:'right'}}>
                                            <span>0.00$</span>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td style={{width:'108px'}}>
                                            
                                        </td>
                                        <td style={{width:'184px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'68px'}} colSpan='2'>
                                            <span>Order Discount[?]:</span>
                                        </td>
                                        <td style={{width:'68px',textAlign:'right'}}>
                                            <span>0.00$</span>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td style={{width:'108px'}}>
                                            
                                        </td>
                                        <td style={{width:'184px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'68px'}} colSpan='2'>
                                            <span>Order Total[?]:</span>
                                        </td>
                                        <td style={{width:'68px',textAlign:'right'}}>
                                            <span>PKR </span>
                                        </td>
                                    </tr>
                                    <tr >
                                        <td style={{width:'108px'}}>
                                            
                                        </td>
                                        <td style={{width:'184px'}}>
                                            <span></span>
                                        </td>
                                        <td style={{width:'68px',color:'#F58C6F'}} colSpan='2'>
                                            <span>Refunded[?]:</span>
                                        </td>
                                        <td style={{width:'68px',textAlign:'right',color:'#F58C6F'}}>
                                            <span>-0.00$</span>
                                        </td>
                                    </tr>

                                    <tr >
                                       
                                        <td colSpan='5' style={{textAlign:'right'}}>
                                            <button className='refund-req-btn order-button'>Request Refund</button>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                          </div>

                            {/* Shipping Address */}
                            <div className='col order-data' style={{backgroundColor:'white'}}>

                            <div className=' row order-no'>
                                <h5><strong style={{color:'white'}}>Shipping Address</strong></h5>
                            </div>
                            <div className=' order-items'>
                            <p>{order.apartment} {order.area}</p>
                            <p>{order.city} Sindh</p>
                                <p>Pakistan</p>
                                <p>ZipCode: ---</p>
                            </div>
                            </div>

                        </div>

                        <div className='col-lg-4 '>

                            {/* General Details */}
                            <div className='row general-details'>
                                <div className='col general-head '>
                                <h5><strong style={{color:'white'}}>General Details</strong></h5>
                                </div>

                                <div className=' general-data'>
                                    <p><strong>Order Status:</strong> <span>{order.status}</span></p>
                                    <p><strong>Order Date:</strong> <span>{timeStamp}</span></p>
                                    <p style={{borderBottom:'2px solid #F5F5F5', paddingBottom:'8px'}}><strong>Earning From Order:</strong> <span><strong>PKR {order.orderTotal}</strong></span></p>
                                    {/* <hr/> */}
                                    <p><strong>Customer:</strong> <span style={{color:'#F58C6F'}}> {`${order.fname} ${order.lname}`}</span></p>
                                    <p><strong>Email:</strong> <span>pt@arikzara.com</span></p>
                                    <p><strong>Phone:</strong> <span>{number}</span></p>
                                </div>
                           </div>

                            {/* Tracking Number */}
                           <div className='row general-details'>
                                <div className='col general-head '>
                                <h5><strong style={{color:'white'}}>Tracking Number</strong></h5>
                                </div>
                                {this.state.trackingDetails?
                                
                                <div className=' general-data'>
                                    <p style={{fontSize:'13px'}}><strong>Shipping Provider:</strong><span>{this.state.trackingDetails.provider}</span></p>
                                    <p style={{fontSize:'13px'}}><strong>Tracking Number:</strong> <span>{this.state.trackingDetails.trackingNo}</span></p>
                                    <p style={{fontSize:'13px'}}><strong>Date Shipped:</strong> <span>{this.state.trackingDetails.dateShip}</span></p>
                                  
                                </div>: void 0
                            }

                                <div className=' general-data'>
                                    <p><strong>Shipping Provider Name/URL:</strong><span><input className='form-control' type='text' name='provider' onChange={this.onChange.bind(this)}/></span></p>
                                    <p><strong>Tracking Number:</strong> <span><input className='form-control' type='text' name='trackingNo' onChange={this.onChange.bind(this)}/></span></p>
                                    <p><strong>Date Shipped:</strong> <span><input type='date' className='form-control'name='dateShip' onChange={this.onChange.bind(this)}/></span></p>
                                    <button className='btn btn-success' onClick={this.onClickTracking.bind(this)}>Add Tracking Number</button>
                                </div>
                           </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default OrdersAction