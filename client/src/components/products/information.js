import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './stylesheet/information.css'
import bana3 from '.././centralized/images/bana3.webp'
import {proceed} from '../../actions/productsAction'



class Information extends Component{

    constructor(){
      super()
      this.state = {
        number: '',
        fname: '',
        lname: '',
        address: '',
        appartment: '',
        city: '',

      }
    }

    onChange (e) {
      // e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log('e hy', e.target,this)
      };

    onSubmit(e){
      e.preventDefault()
      let {number,address,fname,lname,appartment,city} = this.state;

      // getting date
      var cartProducts;
      var prod = this.props.cartProducts.forEach(i => {
          return (
            // console.log('for each' , i)
            cartProducts=i
          )
      })
      var timeStamp = new Date()
      var date = timeStamp.getDate() + '-' + (timeStamp.getMonth()+1) + '-' + timeStamp.getFullYear() 
      var time = timeStamp.getHours() + '-' + timeStamp.getMinutes() + '-' + timeStamp.getSeconds() 
      let newProceed = {
        number,
        fname,
        lname,
        address,
        appartment,
        city ,
        // productName,
        // quantity: this.props.cartProducts.quantity,
        timeStamp: 'Date: ' +date +  '\n' + ' Time: '  + time,
        cartProducts: this.props.cartProducts
      }

      this.props.proceed(newProceed)
      console.log(date,time, newProceed)
    }
  
   click(){
       console.log(this.props)
       this.props.history.push('/combined')
   }
    render(){
      const {number,address,fname,lname,appartment,city} = this.state
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

                  <form >
                    <div class="form-group">
                        <label for="exampleInputEmail1">number</label>
                        <input type="text"
                           onChange={this.onChange.bind(this)}
                           value={this.state.number}
                           name='number'
                           class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Number" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group form-inline">
                        {/* <label for="exampleInputPassword1">Password</label> <br/> */}
                        <input style={{textAlign: 'left'}} type="text" 
                         onChange={this.onChange.bind(this)}
                         value={this.state.fname}
                         name='fname'
                         class="form-control col-lg-5" id="exampleInputPassword1" placeholder="First Name" />
                        <input style={{marginRight: '-60'}}  type="text"
                         onChange={this.onChange.bind(this)}
                         name='lname'
                         value={lname}
                         class="form-control col-lg-5" id="exampleInputPassword1" placeholder="Last Name" />
                    </div>

                    <input  type="text" 
                     onChange={this.onChange.bind(this)}
                     value={address}
                     name='address'
                     class="form-control " id="exampleInputPassword1" placeholder="Address" />< br/>
                    <input  type="text" 
                     onChange={this.onChange.bind(this)}
                     value={appartment}
                     name='appartment'
                     class="form-control " id="exampleInputPassword1" placeholder="Appartments suits etc" /> <br/>
                    <input  type="text" 
                     onChange={this.onChange.bind(this)}
                     value={city}
                     name='city'
                     class="form-control " id="exampleInputPassword1" placeholder="City" /> <br/>
                    {/* <input  type="text" class="form-control " id="exampleInputPassword1" placeholder="City" /> <br/> */}
                  <div className='container'>
                   <div className='col-lg-6' style={{float: 'left', textAlign: 'left' , paddingLeft: '0px' }}>
                     <Link to='cart'> <span> <i class="fa fa-angle-left" style={{margin: '0px'}}></i> </span> Return to Cart</Link>
                    </div>
                    <div className='col-lg-6 ' style={{float: 'right', textAlign: 'right' , paddingRight: '0px' }}> 
                     <button onClick={this.onSubmit.bind(this)}  type="submit" class="btn btn-primary btn-block" style={{lineHeight: '50px'}}>Continue to shopping</button>
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

                   <div className='col-lg-6' style={{backgroundColor: '#F7F6F2'}}>
                    <table style={{width:'100%'}} className='infoTable'>
                      <div className='container'>
                        <div className='row'>
  
                            <tr>
                              <td><img src={bana3} width='64.39' height='64.39'  />
                              <span className='imgSup'>3</span>
                              </td>
                              <td className='infoItem'><p>Banana</p></td>
                             
                              <td className='priceCol'>$6.0</td>
                            </tr>
                        </div>
                      </div>                  

                    </table>
                   <hr style={{border: ''}} />    

                              {/* 2nd table */}

                     <table style={{width:'100%'}} >
                      <div className='container'>
                        <div className='row'>
                            <tr>
                              <td width='122.22'>Subtotal </td>                                                          
                              <td className='subTotal'>$60.0</td>
                            </tr>

                            <tr>
                              <td width='122.22'>Shipping </td>                                                          
                              <td className='subTotal'>$6.0</td>
                            </tr>  <br/> <br/>

                            <tr>
                              <td width='122.22'>Total </td>                                                          
                              <td className='total'>$600.0</td>
                            </tr>
                       
                        </div>
                      </div>                  

                    </table>
                  </div>

              </div>
            </div>

         </div>
        )
    }
}

//redux

const mapStateToProps =  (state) => {
console.log('infor cart', state.cartReducer.cart)

return{ 
  cartProducts: state.cartReducer.cart,
}
}
export default connect(
  mapStateToProps,
  { proceed }
)(withRouter(Information));