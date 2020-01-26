import React,{Component} from 'react';
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import tree from '../centralized/images/edit.png'
import heart from '../centralized/images/del.png'
import tick from '../centralized/images/tick.png'
import x from '../centralized/images/x.png'
import eco from '../centralized/images/eco.webp'
import {updateProduct,addProduct,getProducts} from'../../actions/productsAction'
import './adminDashboard.css'


 class Admin extends Component{
    constructor(){
        super()
        this.state = {
            bookedOrderData: [],
            products:[],
            delProduct: [],
            edit: false,
            price: undefined,
            name: undefined,
            stocke: undefined,
            currentRow: [],
            updateProductId: undefined,
            adddPrice: undefined,
            adddStock: undefined,
            addName: undefined,
            adddDescription: undefined,
            dataState:false,
            selectOwnerId:'',
            selectedProductId:'',
            selectedProduct:undefined,
            cartOwners: [
                {
                    name: 'Arslan',
                    location: 'malir',
                    id: 'q1w2e3'

                },
                {
                    name: 'Rehan Saeed',
                    location: 'Gulistane Johar',
                    id:'aqswde123'
                    
                },
                {
                    name: 'Akmal Lashari',
                    location: 'Model',
                    id:'r4t5y6u7123'
                    
                }
            ]
        }
    }
    componentWillMount(){

console.log('WillMount Admin -------')

    }

    componentWillReceiveProps(nextProps){

        console.log('props admin will rcve props sy', nextProps);
        // this.setState({
        //     bookedOrderData: nextProps.products
        // })
    }
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('should Update admin=======',nextProps,nextState)
    //     if(nextState.dataState==true){
    //         console.log('NExtstate.datastate======',nextState.dataState)
    //         // this.props.getProducts();
    //         return true
    //     }
    //     else{
    //         return true
    //     }
    // }

    componentDidMount(){
        axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
                       
            this.setState({
                products: res.data
            })
            
            console.log("Products success", this.state.bookedOrderData._id)
                          }) // re-direct to login on successful register
        .catch(err =>
        console.log('Product err: ',err.message)
        );

        axios
        .get('http://localhost:5000/api/bookedProducts')
        .then(res => {
            this.setState({
                bookedOrderData: res.data.data
            })

            // var mydata = this.state.bookedOrderData.map(i => {

            // })
            console.log('booked order ka',this.state.bookedOrderData)
        })
        .catch(err => {
            console.log('admin sy',err.message)
        })

    }

    delete(key,index,e){
        e.preventDefault()
        console.log(key, 'id')
        let id = {
            key,
        }
        axios.post("http://localhost:5000/api/delProducts", id)
            .then(res => {
              this.props.getProducts('Admin Delete');
                // cartProducts.splice(index,1);
                var delFromLocalStorage=this.state.bookedOrderData.findIndex(i=> i._id===key);
                if(delFromLocalStorage!==-1){
                    this.state.bookedOrderData.splice(delFromLocalStorage,1);
                //   localStorage.setItem('CartProduct', JSON.stringify(cartProducts));
                  this.setState({
                                evein: false
                            })
                  console.log('del k ho gai lcl strge sy... ', delFromLocalStorage)
                }
                else{
                    console.log('del nh hui lcl strge sy... ', delFromLocalStorage)

                }
                console.log('evien', this.state.evein)
                console.log('respnse del admin ka', res.data,)

                
            })

            .catch(err => {
                console.log('cart del ka error.. >',err.message)
            })


    }

    cancel(){
        this.setState({
            edit:false
        })
    }
    edit(id,index,e){

        let filterId = this.state.bookedOrderData.filter(i => {return i._id === id})

        console.log('edit k liye ', filterId, 'index' , index)
        
        if(filterId){

            this.setState({
                edit:true, 
                currentRow: filterId[0],
                price: filterId[0].price,
                stock: filterId[0].stock,
                name: filterId[0].name,
                updateProductId: filterId[0]._id
               })

               console.log(this.state.edit,filterId[0], 'name')
        }
        else{

        }

    }
    onSubmit = e => {
        e.preventDefault();
        const {addName,addPrice,addStock,addDescription} = this.state
  console.log('oNsubmit State-------',this.state)
    const newProduct = {
          name: addName,          
          description: addDescription,
          price: addPrice,
          stock: addStock,
       
        };
    this.props.addProduct(newProduct, this.props.history);

    this.setState({
      addName: "",
      addDescription: '',
      addPrice: '',
      addStock:'',
      
       });

    console.log(newProduct)
      };

    updateProduct(key){
       const {price,name,stock,updateProductId} = this.state
      
       let updateProduct = {
            name,
            price,
            stock,
            id: updateProductId
       }

       this.props.updateProduct(updateProduct)
       this.setState({
               edit:false
          })
        console.log(updateProduct, 'update new')
    }
       
    approve(id){
        // e.preventDefault()
        
        let filteredProduct = this.state.bookedOrderData.filter(i => {
            return i._id === id
        })
        
        this.setState({selectedProduct:filteredProduct})
        console.log('working aproval',this.state.selectedProduct)
        console.log('working aproval',filteredProduct)



    }

    selectOwners(id){
        console.log(id,'crt ownrs id');

        this.setState({selectOwnerId: id})
    }
    sendToOwner(){
        
        const filteredCartOwner = this.state.cartOwners.filter(i => {
            return i.id === this.state.selectOwnerId
        })
        
        console.log(filteredCartOwner, 'select ho gya owner')

    }

    render(){
        if(this.state.dataState==true){
            console.log('Render Admin======')


        }
        return(
            <div className='adminDashboard'>
                <div className='row'>
                    <div className='col-lg-2'>
                        <div>
                           <h2>left Navbar</h2>
                        </div>
                    </div>
                    <div className='col-lg-10'>
                       <div className='container'>

                    {/* Products for approval */}
                         <div class="jumbotron adminProd">
                         <form > 
                           <table class="table table-striped scroll">
                                    <thead className=''>
                                        <tr className='upperTr'>
                                            <th scope='col'>Sr No</th>
                                            {/* <th scope='col'>item</th> */}
                                            <th scope='col'>F.name</th>
                                            <th scope='col'>Time Stamp</th>
                                            <th scope='col'>Number</th>
                                            <th scope='col'>City</th>
                                            <th scope='col'>Aprroved</th>
                                            <th scope='col'>View</th>
                                        </tr>
                                    </thead>
                                    <tbody className='cart-body'>
                                  { this.state.edit === false ?
                                    this.state.bookedOrderData !== [] ? this.state.bookedOrderData.map((i,index) => {
                                     return (         
                               
                                          <tr className='dataTd '>
                                          
                                                <td className='cart-body' style={{textAlign: 'center'}}>{index+1} </td>
                                                <td className='cart-body'>{i.fname} </td>
                                                <td className='cart-body'>{i.timeStamp} </td>
                                                <td className='cart-body'>{i.number}</td>
                                                <td className='cart-body'>{i.city} </td>   
                                                <td className='cart-body'>
                                                    <button type='button' style={{backgroundColor: 'red !important',}} 
                                                     onClick={this.approve.bind(this,i._id)}
                                                     className="btn btn-info"   data-toggle="modal" data-target={`#cartOwner${index}`} >Approved</button>
                                                     </td>     

                                                 <div class="modal fade" id={`cartOwner${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                          <table>
                                                              <tr>
                                                                  <th>Sr No</th>
                                                                  <th>Cart Owner Name</th>
                                                                  <th>Location</th>
                                                                  <th>Action</th>
                                                              </tr>

                                                                  {this.state.cartOwners.map((i,index) =>{
                                                                      return(
                                                                     <tr className='dataTd '>
                                                                        <td className='cart-body'>1 </td>   
                                                                        <td className='cart-body'>{i.name} </td>   
                                                                        <td className='cart-body'>{i.location} </td>   
                                                                        <td className='cart-body'> 
                                                                            <button type='button' onClick={this.selectOwners.bind(this,i.id)}>Select</button>
                                                                        </td>   
                                                                     </tr>
                                                                      )
                                                                  })}
                                                             

                                                          </table>
                                                        </div>
                                                        <div class="modal-footer">
                                                          
                                                            <button type="button" class="btn btn-primary" onClick={this.sendToOwner.bind(this)}>Send To Cart Owner</button>
                                                            <button type="button" class="btn btn-primary">Cancel Order</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>                                   
                                                <td className='cart-body'> 
                                                { this.state.edit === false ?
                                                     <div>
                                                         
                                                 <button type='button' className="btn btn-warning"  data-toggle="modal" data-target={`#cartProducts${index}`}>View</button>
                                                        {/* <img onClick={this.edit.bind(this,i._id,index)} width='22' height='22' src={tree}  /> */}
                                                         {/* <img  width='22' height='22'   src={heart} data-toggle="modal" data-target={`#exampleModalCenter${index}`} /> */}
                                                         {/* modal */}
                   
                                                            <div class="modal fade" id={`cartProducts${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                <table>
                                                                    <tr>

                                                                    <th scope='col'>Sr No</th>                                                                
                                                                    <th scope='col'>Product name</th>
                                                                    <th scope='col'>Price</th>
                                                                    <th scope='col'>Stock</th>
                                                                    <th scope='col'>Quantity</th>
                                                                    </tr>
                                                                  {i.cartProducts.map((item,index) => {
                                                                      return(
                                                                          <tr>
                                                                             <td className='cart-body' style={{textAlign: 'center'}}>{index+1} </td>
                                                                    <td className='cart-body'>{item.name} </td>
                                                                    <td className='cart-body'> {item.price} </td>
                                                                  <td className='cart-body'>{item.stock}</td>
                                                                  <td className='cart-body'> {item.quantity}</td>   
                                                                        </tr>
                                                                    )
                                                                })}
                                                                   
                                                                </table>
                                                                
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    <button onClick={this.delete.bind(this,i._id,index)} class="btn btn-primary">Delete Product</button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                    </div>

                                                     </div> 
                                                       : void(0)
                                                     
                                                       }
                                                </td>
                                        </tr>
                           
                                          )
                                        })
                                      :
                                 <tr><td>no data</td></tr>
                                        :
                                        
                                        <tr className='dataTd'>
                                              <td className='cart-body' style={{textAlign: 'center'}}> </td>
                                                <td className='cart-body'> <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} onChange={this}  />  </td>
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={this.state.name} 
                                                         onChange={eve => this.setState({name: eve.target.value} )} /> </td>
                                                <td className='cart-body'>
                                                    <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'}  value={this.state.price}
                                                        onChange={eve => this.setState({price: eve.target.value} )}  /></td> 
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'}  value={this.state.stock}
                                                         onChange={eve => this.setState({stock: eve.target.value} )}                  /> </td> 
                                                <td className='cart-body'>
                                                    {this.state.edit === true ?
                                                      <div>
                                                      <img  onClick={this.updateProduct.bind(this,this.state.updateProductId)} width='22' height='22' src={tick}  /> 
                                                      <img  onClick={this.cancel.bind(this)} width='29' height='18' src={x}  /> 
                                                      </div> : void(0)}
                                                </td>
                                        </tr>
                                }
                                </tbody>
                           </table>
                           </form>
                         </div>

                    {/* All Products */}
                       <div class="jumbotron adminProd">
                         
                         <div className='col-md-6'>
                             <h>Product</h>
                        </div>
                          <div className='col-md-6'>
                          <button type="button" class="btn btn-primary" data-toggle="modal" data-target='#exampleModalCenter'>
                               Add product
                          </button>

                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                      <form >
                                    <div class="modal-body">
                                      <TextField label="Image"
                                       /> <br/>
                                      <TextField value={this.state.addName} 
                                         onChange={eve => this.setState({addName: eve.target.value} )} label="Name" /> <br/>
                                      <TextField value={this.state.addPrice} 
                                         onChange={eve => this.setState({addPrice: eve.target.value} )} label="Price" /> <br/>
                                      <TextField value={this.state.addStock} 
                                         onChange={eve => this.setState({addStock: eve.target.value} )} label="Stock" /> <br/>
                                       <TextField value={this.state.addDescription} 
                                         onChange={eve => this.setState({addDescription: eve.target.value} )} label="Description" /> <br/>
                                     
                                    </div>
                                    <div class="modal-footer">
                                        {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                        <button type="submit" onClick={this.onSubmit} class="btn btn-primary">Add Product </button>
                                    </div>
                            </form>
                                  </div>
                                </div>
                            </div>                        
                         </div>

                        <form > 
                           <table class="table table-striped scroll">
                                    <thead className=''>
                                        <tr className='upperTr'>
                                            <th scope='col'>Sr No</th>
                                            {/* <th scope='col'>item</th> */}
                                            <th scope='col'>item</th>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Price</th>
                                            <th scope='col'>Stock</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='cart-body'>
                                  { this.state.edit === false ?
                                    this.state.products !== [] ? this.state.products.map((i,index) => {
                                     return (         
                               
                                          <tr className='dataTd '>
                                          
                                                <td className='cart-body' style={{textAlign: 'center'}}>{index+1} </td>
                                                <td className='cart-body'> <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} onChange={this} value={i.name} />  </td>
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={ i.name  } 
                                                                         /> </td>
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={ i.price } 
                                                                          /></td>
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={ i.stock } 
                                                                          /> </td>                                            
                                                <td className='cart-body'> 
                                                { this.state.edit === false ?
                                                     <div>
                                                        <img onClick={this.edit.bind(this,i._id,index)} width='22' height='22' src={tree}  />
                                                         <img  width='22' height='22'   src={heart} data-toggle="modal" data-target={`#exampleModalCenter${index}`} />
                                                         {/* modal */}
                   
                                                            <div class="modal fade" id={`exampleModalCenter${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                                <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    ...
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    <button onClick={this.delete.bind(this,i._id,index)} class="btn btn-primary">Delete Product</button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                    </div>

                                                     </div> 
                                                       : void(0)
                                                     
                                                       }
                                                </td>
                                        </tr>
                           
                                          )
                                        })
                                      :
                                 <tr><td>no data</td></tr>
                                        :
                                        
                                        <tr className='dataTd'>
                                              <td className='cart-body' style={{textAlign: 'center'}}> </td>
                                                <td className='cart-body'> <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} onChange={this}  />  </td>
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={this.state.name} 
                                                         onChange={eve => this.setState({name: eve.target.value} )} /> </td>
                                                <td className='cart-body'>
                                                    <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'}  value={this.state.price}
                                                        onChange={eve => this.setState({price: eve.target.value} )}  /></td> 
                                                <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'}  value={this.state.stock}
                                                         onChange={eve => this.setState({stock: eve.target.value} )}                  /> </td> 
                                                <td className='cart-body'>
                                                    {this.state.edit === true ?
                                                      <div>
                                                      <img  onClick={this.updateProduct.bind(this,this.state.updateProductId)} width='22' height='22' src={tick}  /> 
                                                      <img  onClick={this.cancel.bind(this)} width='29' height='18' src={x}  /> 
                                                      </div> : void(0)}
                                                </td>
                                        </tr>
                                }
                                </tbody>
                           </table>
                           </form>
                       </div>

                      
                       </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
  console.log('admin stateto props', state.products)

  return{
      products: state.products.products
  }
}

export default connect(
    mapStateToProps,
    { addProduct,updateProduct,getProducts }
  )(withRouter(Admin));