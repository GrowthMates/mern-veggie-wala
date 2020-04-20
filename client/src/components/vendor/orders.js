import React,{Component} from 'react';
import {connect} from 'react-redux'
import './style/orders.css'
import axios from 'axios';
import OrdersAction from './ordersAction'

let log = console.log
class VendoOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders:undefined,
            carts:undefined,
            selectedCart:'cart 1',
            selectedStatus:'all',
            actionCall:false,
            actionIndex:0
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
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
        
        // axios.get("http://localhost:5000/api/getOrders")
        // .then(res => {
        //     log(res.data);
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    }
   //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
   UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.carts){
        this.setState({
            carts:nextProps.carts

        }) 
    }
       }
    //    static getDerivedStateFromProps(nextProps, prevState) {
    //     if(nextProps.carts){
    //         this.setState({
    //             carts:nextProps.carts

    //         }) 
    //     }
        
    //    }

    statusViseView(status,e){
        e.preventDefault();
        log('selected==>>',status)
        this.setState({selectedStatus:status})
    }

    render() { 
        log(this.state.carts)
        let filtered = [];
        let filteredOrders=[];
        let {selectedStatus}=this.state
        console.log(selectedStatus)
        if(this.state.carts!==undefined){
            filtered= this.state.carts.filter(e => {return e.cart==this.state.selectedCart})//this.state.selectedCart
            filtered.forEach(element=>{
                element.orderTotal=0
                let orders = element.orders.filter(e=>{return e.status==selectedStatus})
                console.log('orders filtered=>>',orders)
                if(selectedStatus != 'all'){filteredOrders=orders}
                else filteredOrders=element.orders
            })
        log( 'cFiltered => ' ,filtered,filteredOrders)
            filteredOrders.forEach((element,i)=>{
            log( 'cart vi36346se => ' ,element,i)
            element.orderTotal=0
            element.cartProducts.forEach(e=>{
                element.orderTotal+=e.price*e.quantity})
            })
            // filteredOrders[0].orderTotal=0
            // filteredOrders[0].cartProducts.forEach(e=>{
            //     filteredOrders[0].orderTotal+=e.price*e.quantity})
        }
        log( 'cart vise => ' ,filtered,filteredOrders)
        if(this.state.actionCall==true){

            return (
            <>
            <div style={{float:'left'}} className='cursor-pointer' onClick={()=>this.setState({actionCall:false})}><h4 className='back-btn' style={{color:'##5BA616'}}>Back</h4></div><br/>
            <OrdersAction order={filteredOrders[this.state.actionIndex]}/>
            </>)
        }

        return ( 
            <div style={{padding: '10px 30px'}} >
                <div className='row' >
        {/* <h4>{filtered.length}</h4> */}
                {filtered.length>=1?
                    <ul className='ordersUl' >
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'all')}>All ({filtered[0].orders.length}) </li>
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'pending')}>Pending ({filtered[0].orders.filter(e=>{return e.status=='pending'}).length}) </li>
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'dispatch')}>Dispatch ({filtered[0].orders.filter(e=>{return e.status=='dispatch'}).length}) </li>
                        <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'complete')}>Completed ({filtered[0].orders.filter(e=>{return e.status=='complete'}).length}) </li>
                        {/* <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'canceled')}> Canceled ({element.orders.filter(e=>{return e.status=='canceled'}).length}) </li> */}
                        {/* <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'onHold')}>On-hold (0) </li> */}
                        {/* <li className='cursor-pointer' onClick={this.statusViseView.bind(this,'refund')}> Refund (0) </li> */}
                    </ul>:void 0
                    }
                </div>

                <div className='row' >
                <select value={this.state.selectedCart} onChange={this.onChange} style={{width: '100%'}} class="custom-select" id="exampleFormControlSelect1" name='selectedCart'  >
                      <option value='cart 1'>Select Cart Wise Orders</option>
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
                            <th scope="col">S.No.</th>
                            <th scope="col">Order#</th>
                            <th scope="col">Order Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Customer No </th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filtered.length>=1 ? 
                            (filtered.map((item,index) => {
                                return filteredOrders.map((i,ind) => {
                                    console.log(i)
                                    return (
                                        <tr key={ind} >
                                 <td>{ind+1}</td>           
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR {i.orderTotal}</td>
                                <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> {i.status} </span> </td>
                                <td>{i.fname}</td>
                                <td>{i.number}</td>
                                <td>{item.address}</td>
                                <td>{i.timeStamp!==undefined?  i.timeStamp.split(' ')[1] :void 0}</td>
                                <td  ><i style={{width:'35px', border: '1px solid black', padding: '10px',textAlign: 'center'}}
                                    class="fa fa-eye cursor-pointer" title='View' onClick={e=>{ return this.setState({actionCall:true,actionIndex:ind})}}>
                                        </i></td>
                                </tr>
                                    )
                                })
                           })
                            ) :
                                !this.state.carts ? <p>Loading......</p> : 
                           (this.state.carts.map((item,index) => {
                                return item.orders.map((i,ind) => {
                                    return (
                                        <tr key={ind} >
                                {/* <th> {index+1} </th> */}
                                <th> {ind+1} </th>
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR 2300</td>
                                <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> {i.status} </span> </td>
                                <td>{i.fname}</td>
                                <td>{i.number}</td>
                                <td>{item.address}</td>
                                <td>{i.timeStamp!==undefined?  i.timeStamp.split(' ')[1] :void 0}</td>
                                <td  ><i style={{border: '1px solid black', padding: '10px',textAlign: 'center'}} class="fa fa-eye" onClick={e=>{ return this.setState({actionCall:true,actionIndex:ind})}}></i></td>
                                </tr>
                                    )
                                })
                           })
                            )
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
    log(state.cartReducer.getCarts)
    return{
        carts: state.cartReducer.getCarts
    }
}
export default connect(mapStateToprops,null)(VendoOrders);