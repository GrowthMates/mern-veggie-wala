import React,{Component} from 'react';
import {Link,withRouter,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './stylesheet/information.css'
import bana3 from '.././centralized/images/bana3.webp'
import {proceed,delCartProducts} from '../../actions/productsAction'
import classnames from "classnames";
import PropTypes from "prop-types";
// import {proceed} from '../../actions/productsAction'



class Information extends Component{

    constructor(){
      super()
      this.state = {
        number: '',
        fname: '',
        lname: '',
        address: '',
        appartment: '',
        selectArea:['Gulistan e Johar'],
        selectBlock:20,
        city: '',
        area:'',
        block:'',
        errors:{},
        cartProducts:undefined,
        redirect:false,
        subTotal:0,
        shipping:120,
        total:0

      }
    }
   
componentDidMount(){
  if(this.props.cartProducts){
    let prod = this.props.cartProducts;
    let subTotal=0
    // let finalObj = {
    //   subTotal:0,shipping:120,total=
    // }
    for(let i=0;i<prod.length;i++){
      subTotal+=prod[i].quantity*prod[i].filterProduct.price
    }
    let total = subTotal+this.state.shipping
    console.log(subTotal,prod)

    this.setState({subTotal,total})
  }
}
    componentWillReceiveProps(nextProps) {
      if(nextProps.cart==='empty'){
        this.setState({
          cartProducts:[]
        })
      }
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }

    onChange (e) {
      // e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        // console.log('e hy', e.target,this)
      };

   async onSubmit(e){
      e.preventDefault()
      let {number,address,fname,lname,appartment,city,area,block} = this.state;

      // getting date
      var prcd=[]
      var prodName= [];
      var prodPrice= [];
      var prodQuantity= [];
      var prodStock= [];
      var prodId= [];

      this.props.cartProducts.forEach(i => {

        // prodName.push(i.filterProduct.name)
        // prodPrice.push(i.filterProduct.name)
        // prodQuantity.push(i.filterProduct.name)
        // prodId.push(i.filterProduct.name)
        prcd.push(i)
        return true
      })
      let counter = 0
      let orderNo = counter++
     let esi = prodId.join("-")
      console.log('bahar', prcd)
      console.log(prodPrice)
      var timeStamp = new Date()
      var date = timeStamp.getDate() + '-' + (timeStamp.getMonth()+1) + '-' + timeStamp.getFullYear() 
      var time = timeStamp.getHours() + '-' + timeStamp.getMinutes() + '-' + timeStamp.getSeconds() 
      let newProceed = {
        number,
        fname,
        lname,
        address,
        appartment,
        city:'Karachi' ,
        area,
        block,
        // productName,
        // quantity: this.props.cartProducts.quantity,
        timeStamp: 'Date: ' +date +  '\n' + ' Time: '  + time,
        cartProducts: prcd,
        orderNo
      }

      this.props.proceed(newProceed, this.props.history)

      // this.props.delCartProducts(newProceed)
      console.log(newProceed)
      console.log(date,time, newProceed)
      this.setState({
        number:'',
        fname:'',
        lname:'',
        address:'',
        appartment:'',
        city:'', 
        area:'',
        block:'',
      })
    }
  
   click(){
       console.log(this.props)
       this.props.history.push('/combined')
   }

   onChangeBlock(e){
    this.setState({ [e.target.name]: parseInt(e.target.value) });
   }

    render(){
      if(!this.props.cartProducts){
       return <Redirect to ='cart'/>
      }
      console.log('Select value handler===',this.state.area,this.state.block)
      const {number,address,fname,lname,appartment,city, errors, subTotal, shipping, total} = this.state
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

                  <form onSubmit={this.onSubmit.bind(this)} >
                    <div class="form-group number">
                        <label for="exampleInputEmail1">number</label>
                        <input type="number"
                           onChange={this.onChange.bind(this)}
                           value={this.state.number}
                           error={errors.number}
                           name='number'
                           required
                           id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="Number (ex.03331234567)"
                           className={classnames("form-control", {
                            invalid: errors.number
                          })}
                            />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        <span className="red-text" style={{color:'red'}}>{errors.number}</span>
                    </div>
                    <div class="form-group form-inline">
                        {/* <label for="exampleInputPassword1">Password</label> <br/> */}
                        <input style={{textAlign: 'left'}} type="text" 
                         onChange={this.onChange.bind(this)}
                         style={{marginRight:'15px'}}
                         value={this.state.fname}
                         error={errors.fname}
                         name='fname'
                         id="exampleInputPassword1" placeholder="First Name"
                         required
                         className={classnames("form-control col-lg-5", {
                          invalid: errors.fname
                        })}
                         />
                          {/* <span className="red-text" style={{color:'red'}}>{errors.fname}</span> */}
                        <input style={{marginRight: '-60'}}  type="text"
                         onChange={this.onChange.bind(this)}
                         name='lname'
                         value={lname}
                         error={errors.lname}
                         required
                          id="exampleInputPassword1" placeholder="Last Name"
                         className={classnames("form-control col-lg-5", {
                          invalid: errors.lname
                        })}
                         />
                          <span className="red-text" style={{color:'red'}}>{errors.fname}{errors.lname}</span>
                    </div>

                    <input  type="text" 
                     onChange={this.onChange.bind(this)}
                     value={address}
                     error={errors.address}
                     name='address'
                     required
                     id="exampleInputPassword1" placeholder="Address"
                     className={classnames("form-control", {
                      invalid: errors.address
                    })} /> <span className="red-text" style={{color:'red'}}>{errors.address}</span>< br/>
                    <input  type="text" 
                     onChange={this.onChange.bind(this)}
                     value={appartment}
                     name='appartment'
                     required
                     
                     class="form-control " id="exampleInputPassword1" placeholder="Appartments suits etc"
                     /><span></span> <br/>

                    <div className='row'>
                      <div className='col'>
                        <label for="selectArea" style={{paddingRight:'5px', color:'grey'}}>Area: </label>
                        <select className="form-control-sm"
                              style={{color:'grey'}}
                                id='area'
                                name='area'
                                required
                                value={this.state.area} 
                                onChange={this.onChange.bind(this)} 
                              >
                               <option value=''>Select Area</option>  
                              {this.state.selectArea.map(place=>{
                                return <option value={place}>{place}</option>

                              })} 
                              
                          </select>
                      </div>    
                      <div className='col '>
                          <label for="selectArea" style={{paddingRight:'5px', color:'grey'}}>Block: </label>
                       
                           <input type="number"
                           onChange={this.onChangeBlock.bind(this)}
                           value={this.state.block}
                           error={errors.block}
                           name='block'
                           required
                           id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="1"
                           min= '1'
                           max={this.state.selectBlock}
                           className={classnames("form-control-sm", {
                            invalid: errors.block
                          })}
                            />
                          </div>    
                      </div>
                      <br/><br/>
                     
                    <input  type="text" 
                     onChange={this.onChange.bind(this)}
                     value='Karachi'
                     name='city'
                     required
                     disabled
                     class="form-control " id="exampleInputPassword1" placeholder="City"
                    
                     /> <br/>
                    {/* <input  type="text" class="form-control " id="exampleInputPassword1" placeholder="City" /> <br/> */}
                  <div className='container'>
                   <div className='col-lg-6' style={{float: 'left', textAlign: 'left' , paddingLeft: '0px' }}>
                     <Link to='cart'> <span> <i class="fa fa-angle-left" style={{margin: '0px'}}></i> </span> Return to Cart</Link>
                    </div>
                    <div className='col-lg-6 ' style={{float: 'right', textAlign: 'right' , paddingRight: '0px' }}> 
                     <button  type="submit" class="btn btn-primary btn-block" style={{lineHeight: '50px'}}>Continue to shopping</button>
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
                         
                        <div style={{overflowY:'scroll', height:'16em'}}> 
                        <table>
                          {!this.props.cartProducts?void 0:
                          this.props.cartProducts.map((item,index)=>{
                           return( <tr>
                              <td><img src={item.filterProduct.image[0]} width='64.39' height='64.39'  />
                          <span className='imgSup'>{item.quantity}</span>
                              </td>
                              <td className='infoItem'><p>{item.filterProduct.name}</p></td>
                             
                              <td className='priceCol'>{item.filterProduct.price*item.quantity}</td>
                            </tr>
                          )})}
                          
                          </table>
                          </div>
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
                              <td className='subTotal'>Rs. {subTotal}</td>
                            </tr>

                            <tr>
                              <td width='122.22'>Shipping </td>                                                          
                              <td className='subTotal'>Rs. {shipping}</td>
                            </tr>  <br/> <br/>

                            <tr>
                              <td width='122.22'>Total </td>                                                          
                           <td className='total'>Rs. {total}</td>
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

Information.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//redux

const mapStateToProps =  (state) => {
console.log('infor cart', state.cartReducer.cart)

return{ 
  cartProducts: state.cartReducer.cart,
  errors: state.errors

}
}
export default connect(
  mapStateToProps,
  { proceed, delCartProducts }
)(withRouter(Information));