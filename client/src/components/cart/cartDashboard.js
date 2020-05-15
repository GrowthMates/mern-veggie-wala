import React from 'react';
import {connect} from 'react-redux'
import CountUp from 'react-countup';
import {carts} from '../../actions/adminAction'
import axios from 'axios'
import './style/dashboard.css'

let log = console.log
class VendorDashboard extends React.Component{ 
    state={
        counter: 0
    }
    componentDidMount() {
        this.props.carts()
     
        axios.get('/api/getCartOwners')
        .then(res => {
            log('carta ka data',res.data);
        })
        .catch(err => log('cart ka error',err))        
    }
     onComplete = () => {
        console.log('Completed!');
      };
      
       onStart = () => {
        console.log('Started!');
      };
  render(props) {
      let counter=0
      counter++
    //   for(let i=0; i<=100;i++){
    //       counter=i
    //       console.log(i)
    //     }
        console.log(counter)

  return (
    <div className="vendorDashboarTop">
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
                    end={1800}
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
                    end={1200}
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
                            <li style={{color: '#FF4747'}} > <span  style={{color: '#FF4747', textAlign: 'left'}}> Total</span>  <span style={{color: 'black', float: 'right'}} >23</span> </li>
                            <li style={{color: 'purple'}}><span  style={{color: 'green', textAlign: 'left'}}> Completed</span>   <span style={{color: 'black', float: 'right'}} >12</span> </li>
                            <li style={{color: 'green'}}><span  style={{color: 'blue', textAlign: 'left'}}>Pending </span>   <span style={{color: 'black', float: 'right'}} >8</span> </li>
                            <li style={{color: 'red'}}><span  style={{color: 'red', textAlign: 'left'}}> Processing</span>   <span style={{color: 'black', float: 'right'}} >34</span> </li>
                            <li style={{color: 'brown'}}><span  style={{color: 'black', textAlign: 'left'}}>Cancelled </span>  <span style={{color: 'black', float: 'right'}} >7</span> </li>
                            <li style={{color: 'blue'}}><span  style={{color: 'blue', textAlign: 'left'}}> On hold</span>   <span style={{color: 'black', float: 'right'}} >13</span> </li>
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
    </div>
  );
}
}

const mapStateToprops =state => {
    console.log(state);
    
    return {
        IsApproved: state.auth.user
    }
}
export default connect(
    mapStateToprops,
    {carts}
)(VendorDashboard)
