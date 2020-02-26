import React from 'react';
import {connect} from 'react-redux'
import './style/dashboard.css'

class VendorDashboard extends React.Component{ 
  render() {
  return (
    <div className="vendorDashboarTop">
      <div className='row' >
        <div className='col-lg-6' >
            <div className='dashboardReports' >
                <ul >
                    <li>Page Views <hr style={{border: '1px solid #999999'}} /> <span style={{fontSize: '1.6em'}} >230</span> </li>   
                    <li>Orders <hr style={{border: '1px solid #999999'}}/> <span style={{fontSize: '1.6em'}}>175</span> </li>
                    <li> Sales <hr style={{border: '1px solid #999999'}}/> <span style={{fontSize: '1.6em'}}>80</span></li>
                </ul>
            </div>  

            <div className='dashboardOrder' >
                <h4>Orders</h4>
                <hr style={{border: '1px solid #999999'}}/> 

                <div className='row' >
                    <div className='col-lg-6' >
                        <ul style={{textAlign: 'left'}}>
                            <li style={{color: '#FF4747'}} > <span  style={{color: '#FF4747', textAlign: 'left'}}> Total</span>  <span style={{float: 'right',color: 'black', float: 'right'}} >23</span> </li>
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
    null
)(VendorDashboard)
