import React,{Component} from 'react';
import './style/orders.css'

class VendoOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className='row' >
                    <ul className='ordersUl' >
                        <li>ALl (3) </li>
                        <li>Completed (2) </li>
                        <li>Processing (7) </li>
                        <li>On-hold (0) </li>
                        <li>Pending (8) </li>
                        <li> Canceled (0) </li>
                        <li> Refund (0) </li>
                    </ul>
                </div>

                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Order Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                            <td>PKR 2300</td>
                            <td  > <span style={{textAlign: 'center', backgroundColor: '#ffc107',padding: '10px', color: '#ffffff', fontWeight: '600'}}> On-Hold </span> </td>
                            <td>Arslan</td>
                            <td>15-feb-2020</td>
                            <td  ><i style={{border: '1px solid black', padding: '10px',textAlign: 'center'}} class="fa fa-eye"></i></td>
                            </tr>
                            <tr>
                            <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                            <td>PKR 2300</td>
                            <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> Completed </span> </td>
                            <td>Arslan</td>
                            <td>15-feb-2020</td>
                            <td  ><i style={{border: '1px solid black', padding: '10px',textAlign: 'center'}} class="fa fa-eye"></i></td>
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}
 
export default VendoOrders;