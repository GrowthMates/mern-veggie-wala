import React,{Component} from 'react';
import './product.css'
import ImageAppla from '../centralized/images/apple.jpg' 
import FacebookIcon from '../centralized/images/facebook-icon.png'
import TwitterIcon from '../centralized/images/twitter-icon.png'
import PinterestIcon from '../centralized/images/pinterest-icon.png'





export default class Product extends Component{
    constructor(Props){
        super(Props);
        this.state={
        }
    }
   


    render(){
        return(
            <div>
                 <section className='contact-upper col-lg-12' >
                    <div className='contact-img-text'>
                        <h1>Product </h1>
                        {/* <p>A Real Estate Organization You Can Trust</p> */}
                    </div>
               </section>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                    <div className='product-img'>
                       <img className="cursor-pointer" src={ImageAppla} width='540' height='540' />
                     </div> 

                   </div>


                    <div className="col-md-6 col-lg-6 col-sm-6">
                                   
                        <div className="container">
                        
                            <div className="product-data">
                               <h3>Apple</h3>
                               <h5>$60.00 USD</h5>
                               <h5 className="product-data-desc">Mangosteen fruit is a
                                    rich source of polyphenolic compounds called xanthones. 
                                    These xanthones are good at combating cardiovascular diseases, thrombosis...</h5>
                              <div className="container">
                                <div className="row">  
                                 
                                 <form action=''>
                                    <div className="container">   
                                        <div className="row">  
                                        <div className="col-md-12 col-lg-12 col-sm-12 size-qty" >
                                            
                                            <div className="col-md-5 col-lg-5 col-sm-5 details-style">
                                                    <label for="dropdownMenuButton">
                                                        SIZE
                                                    </label>  
                                                    
                                                    <div class=" drop-style">
                                                        <select class=" product-size-btn" aria-labelledby="dropdownMenuButton" defaultValue='1 KG' style={{width:'220px'}}>
                                                            <option class="dropdown-item drop-item" >1 KG</option>
                                                            <option class="dropdown-item drop-item" >2 KG</option>
                                                            <option class="dropdown-item drop-item" >3 KG</option>
                                                            <option class="dropdown-item drop-item" >4 KG</option>
                                                            <option class="dropdown-item drop-item" >5 KG</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-5 col-lg-5 col-sm-5" style={{float:'right'}}>
                                                <label for="quantity" >QUANTITY</label>
                                                <input type="number" name="quantity" min="1" defaultValue='1' className="form-control qty-inp" id="quantity"/>

                                                </div>          
                                        </div>

                                        <button type="submit" class="btn btn-success btn-lg cart-btn" style={{marginTop:''}}>Add to cart</button>
                                        </div>
                                     </div>   
                                   </form>

                                  <div className="col-md-12 col-lg-12 col-sm-12 size-qty" >
                                        <div className="col-md-8 col-lg-8 col-sm-8 raw-data">
                                               <table>
                                                   <tr>
                                                       <th>SKU:  </th>
                                                       <td> 99 </td>
                                                   </tr>
                                                   <tr>
                                                       <th> CATEGORIES:</th>
                                                       <td>  Fruits2 Top Sale  </td>
                                                   </tr>
                                                   <tr>
                                                       <th>     TAGS:  </th>
                                                       <td> $200-$300 </td>
                                                   </tr>
                                                   <tr>
                                                       <th className='share-icons'> SHARE: </th>
                                                       <td>
                                                            <img className="cursor-pointer icon-img" src={FacebookIcon} width='' height='' />
                                                            <img className="cursor-pointer icon-img" src={TwitterIcon} width='' height='' />
                                                            <img className="cursor-pointer icon-img" src={PinterestIcon} width='' height='' />
                                                       </td>
                                                   </tr>


                                               </table>
                                        </div>
                                       
                                  </div>

                                 </div>
                             </div>           

                            </div>
                            
                        </div>

                   

                   
                                      
                    </div>

                </div>
            </div>

            </div>  
        )
    }

}