import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {addProduct} from '../../actions/productsAction'
// import './style/edit.css'

let log = console.log;
let cartsArr = []
let images = []
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            price: '',
            description: '',
            discountPrice: '',
            checked: false,
            schedule: false,
            imgToggle: false,
            // cartStock: '',
            cartViseStockArr: [],
            stock: '',
            carts: undefined,
            selectedCart: '',
            // images: undefined,
            file: '',
            imagePreviewUrl: [],
            category: '',
            alarmingStock:''
         }
    }

    onChange= e => this.setState({[e.target.name]: e.target.value })
    checked(){
        this.setState({
            checked: !this.state.checked
        })
    }
    schedule(){
        this.setState({
            schedule: !this.state.schedule,            
        })

    if(this.state.schedule===true){
        this.setState({
            checked: true
        })
    }
    }
    imagePicker(){
        this.refs.fileUploader.click();
        this.setState({
            imagePicker: true
        })
    }

    imageOnChange=(e)=>{
        let {imagePreviewUrl} = this.state;

        // this.setState({image: e.target.value});
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        // images.push(reader.result)
        reader.onloadend = () => {
            images.push(reader.result)
            log(images)
          this.setState({
            file: file,
            imagePreviewUrl: images
          });
        }
    
        reader.readAsDataURL(file)
    }

    delImg(index){

        images.splice(index,1)
        this.setState({
            imagePreviewUrl: images
        })
     
    }

    singleCartSelect(){
        // cartsArr=[]
        const {cartViseStockArr,selectedCart,stock} = this.state;
       

        let filtered= cartViseStockArr.filter(e => {
            return e.cart === selectedCart 
        })
        log('upper ka fltr', filtered)

        if(cartViseStockArr.length==0 && stock!=='' && (this.state.carts!==undefined)){
            cartsArr = cartViseStockArr;
            cartsArr.push({stock,cart:selectedCart})
            this.setState({
                cartViseStockArr: cartsArr  
            })
            log('phli bar jb khli hy')
        }
        else if(filtered.length===0 && stock!=='' && (this.state.carts!==undefined)){
            cartsArr = cartViseStockArr;
            cartsArr.push({stock,cart:selectedCart})
            this.setState({
                cartViseStockArr: cartsArr  
            })
           
        }
        else{
            let filteredStock= filtered.filter(e => {
                return e.stock !== this.state.stock
            })
            // let final= cartViseStockArr.filter(e => {
            //     return e.stock !== filteredStock[0].stock
            // })
            
            if(filteredStock.length==0){

                log('fully dupl nklaa sala', filteredStock)
            }
            else{
                let finalArr =[]
                let stockUpdate = cartViseStockArr.findIndex(e=> {return e.cart === this.state.selectedCart })
                log(cartViseStockArr)
                finalArr = cartViseStockArr
                finalArr[stockUpdate].stock=this.state.stock
                this.setState({
                    cartViseStockArr: finalArr  
                })
                // this.state.cartViseStockArr.splice(stockUpdate,)
            }
        }
        log('dup sy bahir or badd ka saaala ==>',filtered)

        
    }

    allCartSelect(){
        const {cartViseStockArr,selectedCart,stock} = this.state;
        
      
        log(cartsArr)

        // duplicate chacking
        let filtered= cartViseStockArr.filter(e => {
            return e.cart === selectedCart
        })
        log('upper ka fltr', filtered)

        if( stock!=='' && (this.state.carts!==undefined)){
            cartsArr=[]
            this.state.carts.forEach(element => {
                cartsArr.push({stock,cart:element.cart})
            });
            // cartsArr= cartViseStockArr
           if(cartsArr.length>=1){
            this.setState({
                cartViseStockArr: cartsArr
            })
           }
            log('phli bar jb khli hy')
        }
        else if(filtered.length===0 && stock!=='' && (this.state.carts!==undefined)){
            cartsArr=[]
        this.state.carts.forEach(element => {
            cartsArr.push({stock,cart:element.cart})
        });
        // cartsArr= cartViseStockArr
       if(cartsArr.length>=1){
        this.setState({
            cartViseStockArr: cartsArr
        })
       }
           
        }
        else if(filtered>=1){
            log('dupl nklaa sala', filtered)
        }
    }

    delStock(index){
        const {cartViseStockArr} = this.state;

        let filtered = cartViseStockArr
        filtered.splice(index,1)
log(index,filtered)
        this.setState({
            cartViseStockArr: filtered,
            
        })
        
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/getCartOwners')
        .then(res => {
            log('carta ka data',res.data);
            this.setState({
                carts: res.data
            })
        })
        .catch(err => log('cart ka error',err))
    }

    onSubmit(e){
        e.preventDefault();

        const {name,price,description,imagePreviewUrl,cartViseStockArr,stock,category,alarmingStock} = this.state

        let newProduct = {
            name,
            price,
            description,
            image: imagePreviewUrl,
            cartsStock: cartViseStockArr,
            stock,
            category,
            alarmingStock
        }
        this.props.addProduct(newProduct)
        log(newProduct)
    }
    render() { 
        let totalStock = [0]

        log(this.state)
        return ( 
            <div style={{marginTop:'20px'}}>
                
                <div className='container' >
                    <div className='row' > 
                    <div className='col' >
                        <div className='addProdImage'  onClick={this.imagePicker.bind(this)} >
                           <div className='addimgCenter' >
                                <i class="fa fa-cloud" style={{color: '#c7c3c3', fontSize: '60px'}} ></i>
                                <p>Upload Product Cover Image</p>
                                <input type='file' style={{display: 'none'}} ref="fileUploader" onChange={this.imageOnChange} />
                           </div>  
                           {/* {this.state.imagePicker!==true? void 0: (<input type='file' />)}                          */}
                        </div>
                    </div>

                    <div className='col editRight ' >
                        <div>
                            <form>
                                <input className='editName' type='text' value={this.state.name} placeholder='Product Name' name='name' onChange={this.onChange}   />
                                
                                <input className='price' type='number' value={this.state.price} placeholder='Price' name='price' onChange={this.onChange}   />
                               <input   onClick={this.checked.bind(this)} type='checkbox' style={{marginLeft: '30px',width: '20px', height: '20px', }} /> <span style={{fontSize: '16px',marginBottom: '20px'}} >Discounted Price</span>
                               {this.state.checked!==true? void 0 :        
                                (
                                    <div style={{marginTop: '20px'}}>

                                        <input className='disprice'  type='text' value={this.state.discountPrice} name='discountPrice' onChange={this.onChange} placeholder='special price' /> <span onClick={this.schedule.bind(this)} style={{fontSize: '16px',paddingLeft: '80px',textAlign: 'right',color: 'red',cursor: 'pointer'}} >Schedule</span>
                                    </div>

                                )                       
                               }
                                 {this.state.schedule!==true? void 0 :        
                                (
                                   <div style={{marginTop: '20px'}} >
                                       <span style={{border: '1px solid #e4e3e3', backgroundColor: '#e4e3e3',fontWeight: '500'}} > From </span><input type='date' />
                                       <span style={{border: '1px solid #e4e3e3', backgroundColor: '#e4e3e3',fontWeight: '500',marginLeft: '10px'}} > To </span><input type='date' />
                                      
                                   </div>
                                )                       
                               }
                                
                                <textarea id="w3mission" rows="4" cols="50" style={{marginTop: '20px'}} value={this.state.description} name='description' onChange={this.onChange} placeholder='Description'>
                                    
                                </textarea>

                                <div class="input-group mb-3">
                                    <select style={{height:'5vh',marginTop: '10px'}} class="custom-select" id="inputGroupSelect01" value={this.state.category} name='category' onChange={this.onChange} >
                                        <option selected>Category...</option>
                                        <option value="Fruit">Fruit</option>
                                        <option value="Spices">Spices</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div className='row' >
                                <div className='col-12' >
                                    <input type='number' onChange={this.onChange} name='alarmingStock' value={this.state.alarmingStock} placeholder='alarming Stock' style={{marginTop: '10px'}} />
                                </div>
                                  <div className='col' >
                                    <input type='number' onChange={this.onChange} name='stock' value={this.state.stock} placeholder='Stock' style={{marginTop: '10px'}} />
                                  </div>
                                  <div className='col' >
                                    <div class="input-group mb-3">
                                        <select style={{height:'5vh',marginTop: '10px'}} class="custom-select" id="inputGroupSelect01" onChange={this.onChange} name='selectedCart' value={this.state.selectedCart} >
                                            <option>Select Cart</option>
                                           {this.state.carts!== undefined?(
                                             this.state.carts.map((item,index) => {
                                                 return (
                                                     <option value={item.cart} > {item.cart} </option>
                                                 )
                                             })
                                           ):(<p> No cart find</p> )}
                                        </select>
                                    </div>
                                  </div>
                                </div>

                                <div className='row' >
                                    <div className='col' >
                                        <button type='button' className='btn btn-danger btn-block' onClick={this.singleCartSelect.bind(this)} >Add Slected Cart</button>
                                        <button type='button' className='btn  btn-danger btn-block' onClick={this.allCartSelect.bind(this)} style={{backgroundColor: '#3C8DBC'}} >Add To all Cart</button>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                   
                    </div>

                    <div className='col' >
                        <div className='' >
                            <div  >
                                <button onClick={this.onSubmit.bind(this)} className='btn' style={{padding: '4px 30px', backgroundColor: '#3C8DBC', fontWeight: '600',fontSize: '19px',color: '#ffffff'}} >Add Product </button>
                                <hr/>
                                <p className='editStatus' >Product Status: <span style={{fontWeight: 'bolder'}} >Online </span> <span className='editKaUpdate' style={{backgroundColor: 'limegreen', color: '#ffffff', padding: '4px 8px', margin: '10px'}} > Edit </span> </p>
                                <p className='editStatus'>Product Type: <span style={{fontWeight: 'bolder'}} >Simple Product </span> <span className='editKaUpdate' style={{backgroundColor: 'limegreen', color: '#ffffff',padding: '4px 8px'}} > Edit </span> </p>
                                <hr/>
                                <p className='imageGallery' > Image Gallery </p>
                                {/* <p className='imageGalleryBtn btn btn-success' > + Add Product Images </p> */}
                                <ul style={{paddingLeft: '0px'}} >
                                {  
                                this.state.imagePreviewUrl!==[]?this.state.imagePreviewUrl.map((item,index)=>{
                                    return (
                                        <li style={{display: 'inline-block', padding: '10px',position: 'relative'}} >
                                            <span onClick={this.delImg.bind(this,index)} style={{position: 'absolute',top: '0px',right: '-3px',cursor: 'pointer',color:'red'}} >X</span>
                                            <img src={item} width='80' height='80' style={{borderRadius: '10px'}} />
                                        </li>
                                    )
                                }):void 0}
                                {/* <li> <img src={this.state.imagePreviewUrl} width='80' height='80' /> </li> */}
                                </ul>

                            </div>
                         
                        </div>
                    </div>
                </div>
                </div>

                <div className='row' >
              
                 <div className='col' >
                  <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cart Name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cartViseStockArr!==[]?
                          this.state.cartViseStockArr.map((item,index) => {                              
                              totalStock.push(parseInt(item.stock))
                              
                              return (
                                <tr key={index} >
                                <th scope="row"> {index+1} </th>
                                <td>{item.cart}</td>
                                <td>{item.stock}</td>
                                <td style={{color: 'red',cursor: 'pointer'}} onClick={this.delStock.bind(this,index)} >X</td>
                                </tr>
                              )
                          })
                          :
                          (<p>Please add stock in any cart</p>)
                        }
                       
                     <tr >
                         <td>Total Stock</td>
                        <td> {totalStock.reduce((a,b) => {return a+b}) } </td>
                     </tr>
                    </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className='prodDecrip container' >
                    <div classNam='row' >
                        <div className='col-8' >
                               <textarea id="w3mission" rows="4" cols="50" style={{width: '100%'}} >Price description</textarea>
                        </div>
                        <div className='col-3' >
                             
                        </div>
                       
                    </div>
                </div> */}
            </div>  
         );
    }
}
 
export default connect(null,{addProduct})(AddProduct);