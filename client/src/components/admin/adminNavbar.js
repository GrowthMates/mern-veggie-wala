import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../centralized/images/adminLogo.png'
import dashboard from '../centralized/images/dashboard.png'
import order from '../centralized/images/order.png'



class AdminNavbar extends React.Component {
  
  render()
  {
    return (
    
    
    <div className="row ">
        
            <ul className='adminNav'>
                <li className='brandLogo'> <i class="fa fa-user" aria-hidden="true"></i>   </li>
                <li><Link to='/' ><img className='adminIcons' src={dashboard} width='25' height='20'  />Dashboard</Link></li>
                <li><Link to='/approvalProducts' ><img className='adminIcons' src={order} width='25' height='20'  />Orders</Link></li>
                <li><Link to='/admin/allProducts'>Products</Link></li>
                <li><Link to='/'>Reports</Link></li>
                <li><Link to='/'>Add-ons</Link></li>
                
            </ul>
        
    </div>
  );}
}




export default AdminNavbar