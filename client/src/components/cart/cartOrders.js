import React,{Component} from 'react';
import {connect} from 'react-redux'
import {updateStatus} from '../../actions/productsAction'
import './style/orders.css'
import axios from 'axios';
import Timer from './timer'

let log = console.log
class CartOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders:undefined,
            carts:undefined,
            status:'',
            index:'',
            loading:false,
            selectedStatus:'all'
        }
        console.log(props)
    }

    onChange = (index,e) => {
        this.setState({ status: e.target.value,index })
    }
    componentDidMount() {
        if(this.props.carts){
            this.setState({
                carts:this.props.carts

            }) 
        }
        else{
            this.setState({
                carts:this.props.carts
            })
        }

        
// console.log('date time', countDownDate);
               
    }

onSubmit(id,index,e){
    e.preventDefault()
    const {status} = this.state;

    let updateOrderStatus = {
        orderStatus:status,
        id,
        index,
        
    }

    this.props.updateStatus(updateOrderStatus)

    this.setState({
        loading:true
    })
}

//WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.status!==undefined){
        this.setState({
            loading:false
        })
    }
}

statusViseView(status,e){
    e.preventDefault();
    log('selected==>>',status)
    this.setState({selectedStatus:status})
}

    render(props) { 
        let time = undefined;
        log(this.props)
        let filtered = [];
        let filteredOrders=[];
        let {selectedStatus}=this.state
        if(this.state.carts!==undefined){
           
            filtered = this.state.carts.filter(e => {return e.cart==='cart 1'})
            filtered.forEach(element=>{
                let orders = element.orders.filter(e=>{return e.status==selectedStatus})
                console.log('orders filtered=>>',orders)
                if(selectedStatus != 'all'){filteredOrders=orders}
                else filteredOrders=element.orders
            })
        }
        log( 'cart vise => ' ,filtered)

 

        return ( 
            <div style={{padding: '10px 30px'}} >
                {/* <Timer/> */}
                <div className='row' >
                    {filtered.length<1?void 0:
                    <ul className='ordersUl' >
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'all')}>All ({filtered[0].orders.length}) </li>
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'pending')}>Pending ({filtered[0].orders.filter(e=>{return e.status=='pending'}).length}) </li>
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'dispatch')}>Dispatch ({filtered[0].orders.filter(e=>{return e.status=='dispatch'}).length}) </li>
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'complete')}>Completed ({filtered[0].orders.filter(e=>{return e.status=='complete'}).length}) </li>
                        {/* <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'canceled')}> Canceled ({element.orders.filter(e=>{return e.status=='canceled'}).length}) </li> */}
                        {/* <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'onHold')}>On-hold (0) </li> */}
                        {/* <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'refund')}> Refund (0) </li> */}
                    </ul>
                    }
                </div>

                <div className='row' >
                <select value={this.state.selectedCart} onChange={this.onChange} style={{width: '100%'}} class="custom-select" id="exampleFormControlSelect1" name='selectedCart'  >
                      <option>Select Cart Wise Orders</option>
                      { !this.state.carts? (<p>Loading ..........</p>) :
                      (this.state.carts.map((item,index) => {
                          return (
                              <option key={index} value={item.cart} > {item.cart} </option>
                          )
                      }))
                          
                      }    
                    </select>
                </div>
                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Order Total</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>                        
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filtered.length>=1 ?                           
                                !this.state.carts ? <p>Loading......</p> : 
                           (filtered.map((item,index) => {
                                return filteredOrders.map((i,ind) => {
                                    return (
                                        <tr key={ind} >
                                {/* <th> {index+1} </th> */}
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR 2300</td>
                               
                               
                                <td>{time}</td>
                                        
                                <td>{i.block}</td>
                                <td>{i.timeStamp!==undefined?  i.timeStamp.split(' ')[1] :void 0}</td>
                                {this.state.loading === true && this.state.index===ind ? <p>Loading .....</p>
                                :( 
                                <td className='dropdown' >
                                     <select onChange={this.onChange.bind(this,ind)} name='status' value={this.state.index===ind? this.state.status: void 0} style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> 
                                        
                                        <option  value={i.status} style={{cursor:'pointer',background:'white',color:'black'}}> { (this.props.status!==undefined) && (this.state.index===ind)? this.props.status.status : i.status} </option>
                                        <option  value='pending' style={{cursor:'pointer',background:'white',color:'black'}}> pending </option>
                                        <option  value='dispatch' style={{cursor:'pointer',background:'white',color:'black'}}> Dispatch </option>
                                        <option  value='complete' style={{cursor:'pointer',background:'white',color:'black'}}> Completed </option>                                      
                                      </select> 
                                    {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" onChange={(e) => {this.setState({status:e.target.value}) }}>    */}
                                    {/* </div> */}
                                </td>)}
                                <td > <button type='button' className='btn btn-danger' onClick={this.onSubmit.bind(this,item._id,ind)} > Change Status </button> </td>
                                </tr>
                                    )
                                })
                           })
                            ) : (<p>Loading ...</p>)
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}
 
// redux

const mapStateToprops = state => {
    log(state.products)
    return{
        carts: state.cartReducer.getCarts,
        status: state.products.status
    }
}
export default connect(mapStateToprops,{updateStatus})(CartOrders);