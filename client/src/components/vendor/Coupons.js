import React,{Component} from 'react';
import './style/coupons.css'

class Coupons extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className='row' >
                    <div className='col-lg-6' >
                        <h2>Coupons</h2>
                    </div>
                    <div className='col-lg-6' >
                        <button style={{float: 'right',marginTop: '15px',fontSize: '18px',fontWeight: '600'}} className='btn btn-danger' > <i style={{marginRight: '5px'}} class="fa fa-tags"></i> Add new Coupon </button>
                    </div>
                </div>

                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Coupon Type</th>
                            <th scope="col">Coupon ammount</th>
                            <th scope="col">Product IDs</th>
                            <th scope="col">Usage / Limit</th>
                            <th scope="col">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='couponsTr' >
                            <th scope="row" style={{paddingTop: '30px'}} > <span className='couponCode'> Bless Friday </span> 
                                <ul className='couponUl' > 
                                    <li> Edit </li>
                                    <li> | </li>
                                    <li> Delete </li>
                                </ul>
                             </th>
                            <td>Fixed ammount</td>
                            <td  > 4 </td>
                            <td>1259</td>
                            <td>2 / 3</td>
                            <td  >-</td>
                            </tr>

                            <tr className='couponsTr' >
                            <th scope="row" style={{paddingTop: '30px'}} > <span className='couponCode'> 11 / 11 </span> 
                                <ul className='couponUl' > 
                                    <li> Edit </li>
                                    <li> | </li>
                                    <li> Delete </li>
                                </ul>
                             </th>
                            <td>Fixed ammount</td>
                            <td  > 4 </td>
                            <td>1259</td>
                            <td>2 / 3</td>
                            <td  >-</td>
                            </tr>
                           
                        </tbody>
                    </table>

                    <div style={{backgroundColor: 'white'}} >
                        <hr style={{border: '10px solid ##FF4747'}} />
                        <div className='col-2' >
                            <p style={{backgroundColor: '#FF4747'}} >x</p>
                        </div>
                        <div className='col-10' >
                            <p>No coupon found</p>
                        </div>
                    </div>

                </div>
            </div>
         );
    }
}
 
export default Coupons;