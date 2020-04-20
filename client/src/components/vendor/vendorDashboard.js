import React from 'react';
import {connect} from 'react-redux'
import CountUp from 'react-countup';
import {carts} from '../../actions/adminAction'
import axios from 'axios'
import './style/dashboard.css'

let log = console.log
class VendorDashboard extends React.Component{ 
    state={
        counter: 0,
        orders:undefined,
    }
    componentDidMount() {
        this.props.carts()
        if(this.props.getcarts){
            console.log(this.props)
            let {getcarts} = this.props
            let allOrders = []
            console.log(getcarts)
             for(let i = 0 ; i<getcarts.length ; i++){
                for(let value in getcarts[i].orders){
                    allOrders.push(getcarts[i].orders[value]) 
                }
                }
            
            console.log(allOrders)
            this.setState({orders:allOrders})
        }
     
        // axios.get('/api/getCartOwners')
        // .then(res => {
        //     log('carta ka data',res.data);
        // })
        // .catch(err => log('cart ka error',err))        
    }
    
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.getcarts){
            let {getcarts} = nextProps
            let allOrders = []
            // console.log(getcarts)
             for(let i = 0 ; i<getcarts.length ; i++){
                 for(let value in getcarts[i].orders){
                     allOrders.push(getcarts[i].orders[value]) 
                 }
                }
           
            console.log(allOrders)
            this.setState({orders:allOrders})
        }
    }

     onComplete = () => {
        console.log('Completed!');
      };
      
       onStart = () => {
        console.log('Started!');
      };
  render(props) {
      let counter=0
      counter++;
      let {orders} = this.state
          let completedOrders = []
          let dispatchedOrders = []
          let pendingOrders = []
      if(orders){
          completedOrders = orders.filter(e=>{return e.status=='complete'})
          dispatchedOrders = orders.filter(e=>{return e.status=='dispatch'})
          pendingOrders = orders.filter(e=>{return e.status=='pending'})
      }
    
        console.log(counter)

  return (
    <div className="vendorDashboarTop">
        {!orders?<h2>Loading...</h2>:
        
      <div className='row' >
        <div className='col-lg-6' >
            <div className='dashboardReports' >
                <ul >
                    <li>Page Views <hr style={{border: '1px solid #999999'}} /> <span style={{fontSize: '1.6em'}} >
                    <CountUp
                    className="account-balance"
                    start={0}
                    end={2500}
                    duration={3.75}
                    useEasing={true}
                    useGrouping={true}
                    separator=""
                    // decimals={4}
                    decimal=","
                    // prefix="EUR "
                    // suffix=" left"
                    onComplete={this.onComplete}
                    onStart={this.onStart}
                    />
                        </span> </li>   
                    <li>Orders <hr style={{border: '1px solid #999999'}}/> <span style={{fontSize: '1.6em'}}>  <CountUp
                    className="account-balance"
                    start={0}
                    end={orders.length}
                    duration={3.75}
                    useEasing={true}
                    useGrouping={true}
                    separator=""
                    // decimals={4}
                    decimal=","
                    // prefix="EUR "
                    // suffix=" left"
                    onComplete={this.onComplete}
                    onStart={this.onStart}
                    />  </span> </li>
                    <li> Sales <hr style={{border: '1px solid #999999'}}/> <span style={{fontSize: '1.6em'}}>
                    <CountUp
                    className="account-balance"
                    start={0}
                    end={completedOrders.length}
                    duration={3.75}
                    useEasing={true}
                    useGrouping={true}
                    separator=""
                    // decimals={4}
                    decimal=","
                    // prefix="EUR "
                    // suffix=" left"
                    onComplete={this.onComplete}
                    onStart={this.onStart}
                    />
                        </span></li>
                </ul>
            </div>  

            <div className='dashboardOrder' >
                <h4>Orders</h4>
                <hr style={{border: '1px solid #999999'}}/> 

                <div className='row' >
                    <div className='col-lg-6' >
                        <ul style={{textAlign: 'left'}}>
                            <li style={{color: '#FF4747'}} > <span  style={{color: '#FF4747', textAlign: 'left'}}> Total</span>  <span style={{float: 'right',color: 'black', float: 'right'}} >{orders.length}</span> </li>
                            <li style={{color: 'purple'}}><span  style={{color: 'green', textAlign: 'left'}}> Completed</span>   <span style={{color: 'black', float: 'right'}} >{completedOrders.length}</span> </li>
                            <li style={{color: 'green'}}><span  style={{color: 'blue', textAlign: 'left'}}>Pending </span>   <span style={{color: 'black', float: 'right'}} >{pendingOrders.length}</span> </li>
                            <li style={{color: 'red'}}><span  style={{color: 'red', textAlign: 'left'}}> Dispatched</span>   <span style={{color: 'black', float: 'right'}} >{dispatchedOrders.length}</span> </li>
                            <li style={{color: 'brown'}}><span  style={{color: 'black', textAlign: 'left'}}>Cancelled </span>  <span style={{color: 'black', float: 'right'}} >NaN</span> </li>
                            <li style={{color: 'blue'}}><span  style={{color: 'blue', textAlign: 'left'}}> On hold</span>   <span style={{color: 'black', float: 'right'}} >NaN</span> </li>
                        </ul>
                    </div>
                    <div className='col-lg-6' >
                        <p>Graph yahan par ayga</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='col-lg-6' >
            <div className='dashboardSales' >
                <h4> <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i>Sales</h4> <hr/> <br/>
                <h4>Numbers Of items Sold </h4>
                <h4>Numbers Of Orders </h4><br/><br/>
                <h2>Neechy graph ayga phir kabhi</h2>
            </div>
        </div>
      </div>
      }
    </div>
  );
}
}

const mapStateToProps = state => {
    console.log(state);
    return {
        IsApproved: state.auth.user,
        getcarts:state.cartReducer.getCarts
    }
}
export default connect(
    mapStateToProps,
    {carts}
)(VendorDashboard)
