import React from 'react';
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import tree from '../centralized/images/edit.png'
import heart from '../centralized/images/del.png'
import tick from '../centralized/images/tick.png'
import x from '../centralized/images/x.png'
import {addProduct,getProducts,sendToCartOwner,delAfterApproved} from'../../actions/productsAction'
import './adminDashboard.css'
import './allProduct.css'



class AllProducts extends React.Component {
    constructor(){
        super()
        this.state = {
            filteredProduct:undefined,
            filter: undefined,
            search: '',
            searchActive: false,
            loading:true,
            bookedOrderData: [],
            products:[],
            image:undefined,
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
            successAlert: false,
            errors: false,
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
        this.onChangeImage = this.onChangeImage.bind(this);
    }
    componentWillMount(){

console.log('WillMount Admin -------')

    }

    componentWillReceiveProps(nextProps){

        console.log('props admin will rcve props sy',nextProps);
        this.setState({
            products:nextProps.products,
            filter: nextProps.products,
            loading:false
        })
        console.log('loading',this.props.loading)
        if(this.props.loading===false){
            this.setState({
                successAlert: true
            })
            console.log('loading mily gi----')
        }
        if(this.props.errors!==undefined && this.state.errors===true){
            this.setState({
                errors: true
            })
            console.log('error Add prdcts sy----', this.props.errors)

        }
    }
   

    componentDidMount(){
        if(this.props.products){
            this.setState({
                filter: this.props.products
            })
            console.log(this.state.filter,'ksihiu')
        }
        if(this.props.products){
            this.setState({
                products: this.props.products,
                loading: this.props.loading
            })
        }


        axios
        .get("/api/products")
        .then((res) => {
                       
            this.setState({
                // products: res.data
            })
            
            console.log("Products success", this.state.bookedOrderData._id)
                          }) // re-direct to login on successful register
        .catch(err =>
        console.log('Product err: ',err.message)
        );

        axios
        .get('/api/bookedProducts')
        .then(res => {
            this.setState({
                bookedOrderData: res.data
            })

            // var mydata = this.state.bookedOrderData.map(i => {

            // })
            console.log('booked order ka',res.data)
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
        axios.post("/api/delProducts", id)
            .then(res => {
              this.props.getProducts('Admin Delete');
                // cartProducts.splice(index,1);
                console.log(this.props.products, 'reducers sy products')
                var delFromLocalStorage=this.props.products.findIndex(i=> i._id===key);
                if(delFromLocalStorage!==-1){
                    this.props.products.splice(delFromLocalStorage,1);
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

        let filterId = this.state.products.filter(i => {return i._id === id})

        console.log('edit k liye ', this.state.products, 'index' , index)
        
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
    componentDidUpdate(prevProps, prevState) {
        if (this.state.successAlert) {
          // when the state is updated (turned red), 
          // a timeout is triggered to switch it back off
          this.turnOffRedTimeout = setTimeout(() => { 
            this.setState(() => ({successAlert: false,errors:false}))
          }, 2000);
        }
      }
      componentWillUnmount() {
        // we set the timeout to this.turnOffRedTimeout so that we can
        // clean it up when the component is unmounted.
        // otherwise you could get your app trying to modify the state on an
        // unmounted component, which will throw an error
        clearTimeout(this.turnOffRedTimeout);
      }
    onChangeImage = e => {
        console.log('Image Files=======',e.target.files)
        const files=[]
        for (let i=0;i<e.target.files.length;i++){
            console.log('for k andar',files);
            files.push(e.target.files[i]);}
        // e.target.files.forEach((file,i)=>{files.push(file)})
        // console.log(files)
        this.setState({ image: files });
        };

    onSubmit = e => {
        e.preventDefault();
  console.log('oNsubmit State-------',this.state)
    // const newProduct = {
    //       name: addName,          
    //       description: addDescription,
    //       price: addPrice,
    //       stock: addStock,
    //     //   title: title,
    //       image: image,
       
    //     };
    let formData = new FormData();
    //    formData.append("product","Apple Aya h")
    //    formData.append("title", this.state.title);
    const files = this.state.image;     
        console.log('state image=====',this.state.image)
        formData.append("name", this.state.addName);
        formData.append("description", this.state.addDescription);
        formData.append("price", this.state.addPrice);
        formData.append("stock", this.state.addStock);
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file)
            console.log(files.length)
            formData.append('image', file);
        }
    

        // formData.append("image", this.state.image);
        console.log('New product-------',formData)
    this.props.addProduct(formData, this.props.history);

    this.setState({
      addName: "",
      addDescription: '',
      addPrice: '',
      addStock:'',
      errors:true,
      image:'',
      
       });

    // console.log(newProduct)
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
       
    

   
  
    updateSearch(e){
        this.setState({
            search: e.target.value.substr(0,20),
            searchActive: true,
        })
     
      
    }
  render()
  {
      console.log('render sy')
    if(this.state.filter){
            
        var filterProduct = this.state.filter.filter(product => {
            
            return product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        console.log('filterProduct search ki====>', filterProduct)
        // this.setState({
        //     filteredProduct: filterProduct
        // })
    }
    return (
       <div> 
        <div className='row'>
            <div className='container' >
               <div style={{display: 'grid', gridTemplateColumns:'auto auto'}} classname='allProduct'>
                   <h4>All Product</h4>
                   <div>
                   {/* <i class="fa fa-search searchAllProd" aria-hidden="true"></i> */}
                   <TextField  className='inputAllProd'
                    value={this.state.search} onChange={this.updateSearch.bind(this)} 
                     label="Type to Search" /> <br/>
                   <i class="btn btn-primary fa fa-plus-circle" data-toggle="modal" data-target='#exampleModalCenter' aria-hidden="true"></i>
                   
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
                                       <input label="Image"
                                      type="file" 
                                      className="form-input"
                                      multiple
                                      onChange={this.onChangeImage} 
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
                                        <button type="submit" data-dismiss="modal" onClick={this.onSubmit} class="btn btn-primary">Add Product </button>
                                    </div>
                            </form>
                                  
                                </div>
                            </div>                        
                         </div>
                   </div>
               </div>
            </div>
        </div>
                    {/* upper section Ends here */}
        

            {/* Product Displayng here */}

            <form > 
                          <div style={{overflowY: 'scroll', height: '26em'}}>
                            <table class="table table-striped scroll" >
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
                                   { this.state.loading=== true ? <p>loading</p> :
                                  this.state.edit === false ? this.state.searchActive===true ? 
                                  this.state.search===''? void 0 :
                                  this.state.searchActive===false ? void 0 :
                                  filterProduct ? filterProduct.map((item,index) => {
                                     return (
                                        <tr className='dataTd ' key={index}>
                                            <td className='cart-body' style={{textAlign: 'left'}}>{index+1} </td>
                                            <td className='cart-body' style={{textAlign: 'left'}}>{item.name} </td>
                                            <td className='cart-body' style={{textAlign: 'left'}}>{item.name} </td>
                                            <td className='cart-body' style={{textAlign: 'left'}}>{item.price} </td>
                                            <td className='cart-body' style={{textAlign: 'left'}}>{item.stock} </td>
                                            <td className='cart-body' style={{textAlign: 'left'}}> </td>
                                            {/* <td className='cart-body' style={{textAlign: 'left'}}>{index+1} </td> */}
                                        </tr>
                                     )
                                 }) : (
                                     <div >
                                         <p >Loading.........</p>
                                     </div>
                                 ) :
                                    this.props.products !== [] ? this.props.products.map((i,index) => {
                                     return (         
                               
                                          <tr className='dataTd ' key={index}>
                                          
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
                                                        <img onClick={this.edit.bind(this,i._id,index)} width='22' height='22' src={tree} alt='Tree'  />
                                                         <img  width='22' height='22'   src={heart} data-toggle="modal" data-target={`#exampleModalCenter${index}`}  alt='Heart'/>
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
                                                      <img  onClick={this.updateProduct.bind(this,this.state.updateProductId)} width='22' height='22' src={tick} alt='Tick'  /> 
                                                      <img  onClick={this.cancel.bind(this)} width='29' height='18' src={x} alt='X'  /> 
                                                      </div> : void(0)}
                                                </td>
                                        </tr>
                                }
                                {/* // yhn lrny  */}
                                </tbody>
                             </table>
                           </div>
                           </form>

      </div>
        // <div className="row">
        //      <div class="jumbotron adminProd">
                         
        //                  <div className='col-lg-12'>
        //                         {
        //                             this.state.successAlert===false ? void 0 :
        //                             <div class="alert alert-success" role="alert">
        //                                 Succesfully Product Added
        //                             </div>
        //                         }
        //                         {
        //                             this.state.errors===false ? void 0 :
        //                             <div class="alert alert-danger" role="alert">
        //                                 product failed due to {this.props.errors}
        //                             </div>
        //                         }
        //                 </div>

        //                 <div className='col-lg-12'>
        //                     <div className='col-lg-6' style={{marginRight: '0px !important'}}>
        //                            <input value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder='Type to search' />
                                 
        //                     </div>
        //                     <div className='col-lg-3'>
        //                         <button type="button" class="btn btn-primary" data-toggle="modal" data-target='#exampleModalCenter'>
        //                             Add product
        //                         </button>
        //                     </div>
        //                 </div>

        //                   <div className='col-lg-12'>
                       

        //                     <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        //                         <div class="modal-dialog modal-dialog-centered" role="document">
        //                             <div class="modal-content">
        //                             <div class="modal-header">
        //                                 <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
        //                                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                                 <span aria-hidden="true">&times;</span>
        //                                 </button>
        //                             </div>
        //                               <form >
        //                             <div class="modal-body">
        //                               <input label="Image"
        //                               type="file" 
        //                               className="form-input"
        //                               onChange={this.onChangeImage} 
        //                                /> <br/>
        //                               <TextField value={this.state.addName} 
        //                                  onChange={eve => this.setState({addName: eve.target.value} )} label="Name" /> <br/>
        //                               <TextField value={this.state.addPrice} 
        //                                  onChange={eve => this.setState({addPrice: eve.target.value} )} label="Price" /> <br/>
        //                               <TextField value={this.state.addStock} 
        //                                  onChange={eve => this.setState({addStock: eve.target.value} )} label="Stock" /> <br/>
        //                                <TextField value={this.state.addDescription} 
        //                                  onChange={eve => this.setState({addDescription: eve.target.value} )} label="Description" /> <br/>
                                     
        //                             </div>
        //                             <div class="modal-footer">
        //                                 {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
        //                                 <button type="submit" data-dismiss="modal" onClick={this.onSubmit} class="btn btn-primary">Add Product </button>
        //                             </div>
        //                     </form>
        //                           </div>
        //                         </div>
        //                     </div>                        
        //                  </div>

        //                 <form > 
        //                  <div style={{overflowY: 'scroll', height: '26em'}}>
        //                    <table class="table table-striped scroll" >
        //                             <thead className=''>
        //                                 <tr className='upperTr'>
        //                                     <th scope='col'>Sr No</th>
        //                                     {/* <th scope='col'>item</th> */}
        //                                     <th scope='col'>item</th>
        //                                     <th scope='col'>Name</th>
        //                                     <th scope='col'>Price</th>
        //                                     <th scope='col'>Stock</th>
        //                                     <th scope='col'>Actions</th>
        //                                 </tr>
        //                             </thead>
        //                             <tbody className='cart-body'>
        //                           { this.state.loading=== true ? <p>loading</p> :
        //                           this.state.edit === false ? this.state.searchActive==true ? 
        //                           this.state.search===''? void 0 :
        //                           this.state.searchActive===false ? void 0 :
        //                           filterProduct ? filterProduct.map((item,index) => {
        //                              return (
        //                                 <tr className='dataTd ' key={index}>
        //                                     <td className='cart-body' style={{textAlign: 'left'}}>{index+1} </td>
        //                                     <td className='cart-body' style={{textAlign: 'left'}}>{item.name} </td>
        //                                     <td className='cart-body' style={{textAlign: 'left'}}>{item.price} </td>
        //                                     <td className='cart-body' style={{textAlign: 'left'}}>{item.stock} </td>
        //                                     {/* <td className='cart-body' style={{textAlign: 'left'}}>{index+1} </td> */}
        //                                 </tr>
        //                              )
        //                          }) : (
        //                              <div >
        //                                  <p >Loading.........</p>
        //                              </div>
        //                          ) :
        //                             this.props.products !== [] ? this.props.products.map((i,index) => {
        //                              return (         
                               
        //                                   <tr className='dataTd ' key={index}>
                                          
        //                                         <td className='cart-body' style={{textAlign: 'center'}}>{index+1} </td>
        //                                         <td className='cart-body'> <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} onChange={this} value={i.name} />  </td>
        //                                         <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={ i.name  } 
        //                                                                  /> </td>
        //                                         <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={ i.price } 
        //                                                                   /></td>
        //                                         <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={ i.stock } 
        //                                                                   /> </td>                                            
        //                                         <td className='cart-body'> 
        //                                         { this.state.edit === false ?
        //                                              <div>
        //                                                 <img onClick={this.edit.bind(this,i._id,index)} width='22' height='22' src={tree}  />
        //                                                  <img  width='22' height='22'   src={heart} data-toggle="modal" data-target={`#exampleModalCenter${index}`} />
        //                                                  {/* modal */}
                   
        //                                                     <div class="modal fade" id={`exampleModalCenter${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        //                                                     <div class="modal-dialog modal-dialog-centered" role="document">
        //                                                         <div class="modal-content">
        //                                                         <div class="modal-header">
        //                                                             <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        //                                                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                                                             <span aria-hidden="true">&times;</span>
        //                                                             </button>
        //                                                         </div>
        //                                                         <div class="modal-body">
        //                                                             ...
        //                                                         </div>
        //                                                         <div class="modal-footer">
        //                                                             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                                                             <button onClick={this.delete.bind(this,i._id,index)} class="btn btn-primary">Delete Product</button>
        //                                                         </div>
        //                                                         </div>
        //                                                     </div>
        //                                             </div>

        //                                              </div> 
        //                                                : void(0)
                                                     
        //                                                }
        //                                         </td>
        //                                 </tr>
                           
        //                                   )
        //                                 })
        //                               :
        //                          <tr><td>no data</td></tr>
        //                                 :
                                        
        //                                 <tr className='dataTd'>
        //                                       <td className='cart-body' style={{textAlign: 'center'}}> </td>
        //                                         <td className='cart-body'> <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} onChange={this}  />  </td>
        //                                         <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'} value={this.state.name} 
        //                                                  onChange={eve => this.setState({name: eve.target.value} )} /> </td>
        //                                         <td className='cart-body'>
        //                                             <input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'}  value={this.state.price}
        //                                                 onChange={eve => this.setState({price: eve.target.value} )}  /></td> 
        //                                         <td className='cart-body'><input type='text' className={this.state.edit === false ? 'inputStatic': 'inputActive'}  value={this.state.stock}
        //                                                  onChange={eve => this.setState({stock: eve.target.value} )}                  /> </td> 
        //                                         <td className='cart-body'>
        //                                             {this.state.edit === true ?
        //                                               <div>
        //                                               <img  onClick={this.updateProduct.bind(this,this.state.updateProductId)} width='22' height='22' src={tick}  /> 
        //                                               <img  onClick={this.cancel.bind(this)} width='29' height='18' src={x}  /> 
        //                                               </div> : void(0)}
        //                                         </td>
        //                                 </tr>
        //                         }
        //                         {/* // yhn lrny  */}
        //                         </tbody>
        //                      </table>
        //                    </div>
        //                    </form>
        //                </div>


        // </div>
  );}
}




const mapStateToProps=(state)=>{
    console.log('admin stateto props', state.products.productErrors)
  
    return{
        products: state.products.products,
        loading: state.products.loading,
        errors: state.products.productErrors
    }
  }
  
  export default connect(
      mapStateToProps,
      { addProduct,getProducts,sendToCartOwner,delAfterApproved }
    )(withRouter(AllProducts));