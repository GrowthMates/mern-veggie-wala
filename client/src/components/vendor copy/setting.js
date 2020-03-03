import React,{Component} from 'react';
import './style/setting.css'

class VendorSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    imagePicker(){

    }
    render() { 
        return ( 
            <div className='settingTop' >
               <div  >
                    <h1>Settings   <span style={{color: '#FF4747', fontWeight: '500',fontSize: '16px',cursor: 'pointer'}} > --> Visit Store </span> </h1>

                 <div className='container' >
                     <div className='row' >
                        <div className='col-12' >
                            <div className='settingProdImage'  onClick={this.imagePicker.bind(this)} >
                                <div className='settingimgCenter' >
                                        <i class="fa fa-cloud" style={{color: '#c7c3c3', fontSize: '60px'}} ></i>
                                        <p>Upload Product Cover Image</p>
                                </div> 
                            </div> 
                        </div>

                        <div className='col-12' >
                           <table className='settingTable' >
                               <tr>
                                   <td>Store Name</td>
                                   <td><input type='text' placeholder='Store Name' /> </td>
                               </tr>
                               <tr>
                                   <td>Store Category</td>
                                   <td>
                                       <select>
                                           <option>services</option>
                                           <option>services</option>
                                           <option>services</option>
                                           <option>services</option>
                                       </select>
                                   </td>
                               </tr>
                               <tr>
                                   <td>Address</td>
                                   <td><input type='text' placeholder='address' /></td>
                               </tr>
                               <tr>
                                   <td></td>
                                   <td><input type='text' placeholder='City'/></td>
                               </tr><tr>
                                   <td></td>
                                   <td><input type='text' placeholder='Street'/></td>
                               </tr><tr>
                                   <td></td>
                                   <td><input type='text' placeholder='etc'/></td>
                               </tr>
                               <tr>
                                   <td>Phone No</td>
                                   <td><input type='text' placeholder='0307123456789' /> </td>
                               </tr>
                               <tr>
                                   <td>Email</td>
                                   <td><input type='checkbox' width='10px'  /> Show email address in store </td>
                               </tr>
                               <tr>
                                   <td>More Products</td>
                                   <td><input type='checkbox'  />  Enable tab on product single page view</td>
                               </tr>
                              
                           </table>
                        </div>
                     </div>
                 </div>   
               </div>
            </div>
         );
    }
}
 
export default VendorSetting;