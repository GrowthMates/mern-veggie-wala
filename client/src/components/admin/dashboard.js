import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import tree from '../centralized/images/tree.webp'
import heart from '../centralized/images/heart.png'
import './adminDashboard.css'




export default class Admin extends Component{
    constructor(){
        super()
        this.state = {
            bookedOrderData: [],
            delProduct: [],
        }
    }

    componentDidMount(){
        axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
                       
            this.setState({
                bookedOrderData: res.data
            })
            
            console.log("Products success", this.state.bookedOrderData._id)
                          }) // re-direct to login on successful register
        .catch(err =>
        console.log('Product err: ',err.message)
        );
    }

    delete(key,index){
        console.log(key, 'id')

        axios.post("http://localhost:5000/api/delProducts", key)
            .then(res => {

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

    updateProduct(key){
        console.log(key, 'id')

        console.log(key, '  skjaashduasih')

        console.log(this.state.bookedOrderData)
        // axios.put("http://localhost:5000/api/products/:id", key)
        //     .then(res => {

        //         // cartProducts.splice(index,1);
        //         var delFromLocalStorage=this.state.bookedOrderData.findIndex(i=> i._id===key);
        //         if(delFromLocalStorage!==-1){
        //             this.state.bookedOrderData.splice(delFromLocalStorage,1);
        //         //   localStorage.setItem('CartProduct', JSON.stringify(cartProducts));
        //           this.setState({
        //                         evein: false
        //                     })
        //           console.log('del k ho gai lcl strge sy... ', delFromLocalStorage)
        //         }
        //         else{
        //             console.log('del nh hui lcl strge sy... ', delFromLocalStorage)

        //         }
        //         console.log('evien', this.state.evein)
        //         console.log('respnse del admin ka', res.data,)

                
        //     })

        //     .catch(err => {
        //         console.log('cart del ka error.. >',err.message)
        //     })


    }


    render(){
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
                       <div class="jumbotron adminProd">
                         
                         <div className='col-md-6'>
                             <h>Product</h>
                        </div>
                          <div className='col-md-6'>
                             <form>
                                 <input type='text'/>
                             </form>
                              <p>Add Product</p>
                         </div>

                           <table class="table table-striped">
                                    <thead className=''>
                                        <tr>
                                            <th scope='col'>Sr No</th>
                                            <th scope='col'>item</th>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Price</th>
                                            <th scope='col'>Stock</th>
                                            <th scope='col'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='cart-body'>
                                  {
                                    this.state.bookedOrderData !== null ? this.state.bookedOrderData.map((i,index) => {
                                     return (         
                                         <form> 
                                          <tr className='dataTd'>
                                          
                                                <td className='cart-body'>{index+1} </td>
                                                <td className='cart-body'> <TextField type='text' value={i.name} />  </td>
                                                <td className='cart-body'>{i.name}</td>
                                                <td className='cart-body'>{i.price}</td>
                                                <td className='cart-body'>{i.stock}</td>
                                         
                                                <td className='cart-body'>{index+1} </td>
                                                <td className='cart-body'></td>
                                                <td className='cart-body'>{i.name}</td>
                                                <td className='cart-body'>{i.price}</td>
                                                <td className='cart-body'>{i.stock}</td>
                                                <td className='cart-body'> <img onClick={this.updateProduct.bind(this,i._id)} src={tree} data-toggle="modal" data-target={`#exampleModalCenter${index}`} />
                                                   <div class="modal fade" id={`exampleModalCenter${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">Update Product</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                                </div>

                                                            <div class="modal-body">
                                                                <form>
                                                                {/* <TextField 
                                                                onChange={this.onChange}
                                                                value={i._id}
                                                                error={errors.address}
                                                                autoComplete='address'
                                                                className='textfields' 
                                                                id="address" 
                                                                label="Address" 
                                                                required
                                                                /> */}
                                                                </form>
                                                            </div>

                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary">Save changes</button>
                                                            </div>
                                                            </div>
                                                        </div>
                                                     </div> 

                                                              <img onClick={this.delete.bind(this,i._id,index)}   src={heart} />
                                                    </td>
                                        </tr>
                                        </form>
                                          )
                                        })
                                      :
                                 <p>No data</p>
                                     }
                                </tbody>
                           </table>
                       </div>

                       <div class="jumbotron adminProd">
                           
                        </div>
                       </div>
                    </div>
                </div> 
            </div>
        )
    }
}