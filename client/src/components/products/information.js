import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './stylesheet/information.css'



export default class Information extends Component{

   click(){
       console.log(this.props)
       this.props.history.push('/combined')
   }
    render(){
        return(
            <div>
            <div className='container'>
              <div className='row'>
                 <div className='col-lg-6 infoLeft' > 
                  <h3>  VeggieWala - Organic Food/Fruit/Vegetables
                   eCommerce Shoppify Theme
                   </h3>                   
                   <Link>Cart</Link>             
                   <Link> <span> > </span> Information</Link>             
                   <Link>   <span> > </span> Shipping</Link>             
                   <Link> <span> > </span> Payment</Link>       

                
                   <div className=' leftLower'>
                          <h6>Contact Information
                              <span>Already have an account ?  <span onClick={this.click.bind(this)} className='innerLogin'>  Login</span> </span>
                          </h6>
                   </div>
                  
                  <div>

                  <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group form-inline">
                        {/* <label for="exampleInputPassword1">Password</label> <br/> */}
                        <input style={{textAlign: 'left'}} type="text" class="form-control col-lg-5" id="exampleInputPassword1" placeholder="First Name" />
                        <input style={{marginRight: '-60'}}  type="text" class="form-control col-lg-5" id="exampleInputPassword1" placeholder="Last Name" />
                    </div>

                    <input  type="text" class="form-control " id="exampleInputPassword1" placeholder="Address" />< br/>
                    <input  type="text" class="form-control " id="exampleInputPassword1" placeholder="Appartments suits etc" /> <br/>
                    <input  type="text" class="form-control " id="exampleInputPassword1" placeholder="City" /> <br/>
                    {/* <input  type="text" class="form-control " id="exampleInputPassword1" placeholder="City" /> <br/> */}
                  <div className='container'>
                   <div className='col-lg-6' style={{float: 'left', textAlign: 'left' , paddingLeft: '0px' }}>
                     <Link> <span> <i class="fa fa-angle-left" style={{margin: '0px'}}></i> </span> Return to Cart</Link>
                    </div>
                    <div className='col-lg-6 ' style={{float: 'right', textAlign: 'right' , paddingRight: '0px' }}> 
                     <button type="submit" class="btn btn-primary btn-block" style={{lineHeight: '50px'}}>Continue to shopping</button>
                    </div>
                  </div>
                  </form>
                 
                  </div>
                   {/* <div className='container'>
                     <div className='row'>
                      <div className='col-lg-6 leftLower'>
                          <h6>Contact Information</h6>
                      </div>
                      <div className='col-lg-6'>
                       <div className='col-lg-6 leftLowerR'>
                          <h6>Already have an account? Login</h6>
                       </div>
                      </div>
                     </div>
                    </div> */}
                    </div>      

                   <div className='col-lg-6'>
                     <h1>djfiudfidiufd</h1>
                  </div>
              </div>
            </div>

         </div>
        )
    }
}