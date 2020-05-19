import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateProduct, deleteProductImage} from '../../../actions/adminAction'
import axios from 'axios'
import './style/edit.css'
import VendorProducts from '../vendorProducts';

let cartsArr = [];
let images = []
let log = console.log



class Edit extends Component {
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
            cartStock: undefined,
            cartViseStockArr: [],
            stock: 0,
            carts: undefined,
            selectedCart: '',
            // images: undefined,
            file: '',
            imagePreviewUrl: [],
            category: '',
            product:undefined,
            id: '',
            successAlert:false,
            error:false,
            back:false,
            
         }
    }

  onChange=e => { e.preventDefault(); this.setState({[e.target.name]: e.target.value}); }

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
        this.props.deleteProductImage();
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

        if(cartViseStockArr.length==0 && stock!==''){
            cartsArr = cartViseStockArr;
            cartsArr.push({stock:parseInt(stock),cart:selectedCart})
            this.setState({
                cartStock: cartsArr  
            })
            log('phli bar jb khli hy')
        }
        else if(filtered.length===0 && stock!==''){
            cartsArr = cartViseStockArr;
            cartsArr.push({stock:parseInt(stock),cart:selectedCart})
            this.setState({
                cartStock: cartsArr  
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
                finalArr[stockUpdate].stock=parseInt(stock)
                this.setState({
                    cartStock: finalArr  
                })
                // this.state.cartViseStockArr.splice(stockUpdate,)
            }
        }
        log('dup sy bahir or badd ka saaala ==>',filtered)

        
    }

    allCartSelect(){
        const {cartViseStockArr,selectedCart,stock} = this.state;
        
        cartsArr=[]
        this.state.carts.forEach(element => {
            cartsArr.push({stock:parseInt(stock),cart:element.cart})
        });
        // cartsArr= cartViseStockArr
       if(cartsArr.length>=1 && (stock!=='') ){
        this.setState({
            cartStock: cartsArr
        })
       }
        log(cartsArr)
    }

    delStock(index){
        const {cartStock} = this.state;

        let filtered = cartStock
        filtered.splice(index,1)
log(index,filtered)
        this.setState({
            cartStock: filtered
        })
        
    }
    componentDidMount() {
        log(this.props.match)
        axios.get('/api/getCartOwners')
        .then(res => {
            log('carta ka data',res.data);
            this.setState({
                carts: res.data
            })
        })
        .catch(err => log('cart ka error',err));
        if(this.props.product){
            log(this.props.product)
            let product = this.props.product
            this.setState({
                // product:filtered[0],
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock,
                category: product.category,
                imagePreviewUrl: product.image,
                cartStock: product.cartStock,
                id:product.id
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.successAlert) {
          // when the state is updated (turned red), 
          // a timeout is triggered to switch it back off
          this.turnOffRedTimeout = setTimeout(() => { 
            this.setState(() => ({successAlert: false,errors:false}))
          }, 3000);
        }
        console.log(prevProps,prevState)
      }
      componentWillUnmount() {
        // we set the timeout to this.turnOffRedTimeout so that we can
        // clean it up when the component is unmounted.
        // otherwise you could get your app trying to modify the state on an
        // unmounted component, which will throw an error
        clearTimeout(this.turnOffRedTimeout);
      }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    UNSAFE_componentWillReceiveProps(nextProps) {
        log(nextProps)
        if(nextProps.product){
            let product = nextProps.product
            this.setState({
                // product:filtered[0],
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock,
                category: product.category,
                imagePreviewUrl: product.image,
                cartStock: product.cartStock,
                id: product.id
            })
        }

        
    }
    redirectFunction(){
        this.setState({back:true})
    }

    onSubmit(e){
        e.preventDefault();

        const {name,price,description,imagePreviewUrl,cartStock,stock,category,id} = this.state

        let updateProduct = {
            name,
            price,
            description,
            image: imagePreviewUrl,
            cartStock,
            // stock,
            category,
            id,
        }
       
        this.props.updateProduct(updateProduct)
        log(updateProduct)
        if(!this.props.status){
            this.setState({
                successAlert:true
            })
        }
        else{
            this.setState({
                error:true
            })
        }
    
    }

    addNewImage(newImage,newImageId) {
        let prevImages = this.state.imagePreviewUrl
        let prevImageId = this.state.imageId
        prevImages.push(newImage)
        prevImageId.push(newImageId)
        this.setState({
            imagePreviewUrl: prevImages,
            imageId: prevImageId,
        })
    }



    render() { 
        // Cloudinary Working...
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dbevearco', 
            uploadPreset: 'veggieWalaPreset'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info.thumbnail_url); 
                this.addNewImage(result.info.url,result.info.public_id);
                console.log('Done! Here is the image URL: ', result.info.url); 
                console.log('Done! Here is the image URL: ', result.info); 
              }
            }
          )
         //====================================//
        // let s
        if(this.state.back) {return <VendorProducts/>}
        let products = [];
        if(this.props.products){
            products=this.props.products
        }
        log(this.props.match)
        const {product,name,price,description,imagePreviewUrl,cartStock,stock,selectedCart,category} = this.state
        return ( 
            <div style={{}} >
                <div style={{background:'red'}}><button onClick={this.redirectFunction.bind(this)}>Back</button></div>
                { this.state.successAlert!==false? 
                (<div  style={{position: 'fixed', top: '0px',zIndex: '10000',padding:'10px 20px'}}>
                    <div class="alert alert-primary" role="alert"  >
                     Succesfully your Product Updated ("_")
                    </div>
                </div>): void 0}
                { this.state.error==true? 
                (<div  style={{position: 'fixed', top: '0px',zIndex: '10000',padding:'10px 20px'}}>
                    <div class="alert alert-primary" role="alert"  >
                     Error ("_")
                    </div>
                </div>): void 0}

                <div className='row' >
                    <div className='col' >

                        {/* Cloudinary testing...Need to be removed */}
                        <button id="upload_widget" class="cloudinary-button" onClick={myWidget.open}>Upload files</button>
                                        {/* <Image cloudName="dbevearco" publicId="veggieAssets/ktolodlzxpaj5oan2cen">
                                                <Transformation angle="-45"/>
                                                <Transformation effect="trim" angle="45" crop="scale" width="600">
                                                <Transformation overlay="text:Arial_100:Hello" />
                                                </Transformation>
                                            </Image> */}

                        {/* <div className='editProdImage'  onClick={this.imagePicker.bind(this)} >
                            <div className='imgCenter' style={{background: 'url({product.image[0]})'}} >
                                   <img  src={imagePreviewUrl[0]}  className='mainImg' />
                                    <input type='file' style={{display: 'none'}} ref="fileUploader" onChange={this.imageOnChange} />
                            </div>  
                            </div> */}
                         {/* {pr} */}
                        </div>
                    <div className='col' >
                          <div  >
                                <button onClick={this.onSubmit.bind(this)} className='btn btn-block' style={{padding: '4px 30px', backgroundColor: '#FF4747', fontWeight: '600',fontSize: '19px',color: '#ffffff'}} >Update Product </button>
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

                <div className='row' style={{marginTop: '10px'}}>
                    <div className='col' >
                    <form>
                                <input className='editName' defaultValue={name}  type='text' value={name} placeholder='Product Name' name='name' onChange={this.onChange} style={{display: 'block'}}    />
                                
                                <input defaultValue={name} className='price' type='number' value={price} placeholder='Price' name='price' onChange={this.onChange}   style={{display: 'block'}}  />
                               <input   onClick={this.checked.bind(this)}  type='checkbox' style={{marginLeft: '30px',width: '20px', height: '20px', }} /> <span style={{fontSize: '16px',marginBottom: '0'}} >Discounted Price</span>
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
                                
                                <textarea defaultValue={description} id="w3mission" rows="4" cols="50" style={{marginTop: '20px',display: 'block'}} value={description} name='description' onChange={this.onChange} placeholder='Description'>
                                    
                                </textarea>

                                <div class="input-group mb-3">
                                    <select style={{height:'5vh',marginTop: '10px'}} class="custom-select" id="inputGroupSelect01" defaultValue={category} value={category} name='category' onChange={this.onChange} >
                                        <option selected>Category...</option>
                                        <option value="Fruit">Fruit</option>
                                        <option value="Spices">Vegetable</option>
                                        {/* <option value="Others">Others</option> */}
                                    </select>
                                </div>

                                <div className='row' >
                                  <div className='col' >
                                    <input type='number' onChange={this.onChange} name='stock' defaultValue={stock}value={stock} placeholder='Stock' style={{marginTop: '10px'}} />
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
                                        <button type='button' className='btn  btn-danger btn-block' onClick={this.allCartSelect.bind(this)} style={{backgroundColor: '#3B8DBC'}} >Add To all Cart</button>
                                    </div>
                                </div>
                                
                            </form>
                    </div>
                </div>
                
                {/* <div className='container' > */}
                    {/* <div className='row' >  */}
                    {/* <div className='col' >
                      
                    </div> */}

                  
                    {/* <div className='col' > */}
                        {/* <div className='' > */}
                           
                         
                        {/* </div>
                    </div>
                </div>
                </div> */}

                {/* <div className='col editRight ' >
                        <div>
                
                        </div>
                   
                    </div> */}

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
                        {cartStock?
                          cartStock.map((i,index) => {
                            
                                  return(
                                    <tr key={index} >
                                    <th scope="row"> {index+1} </th>
                                    <td>{i.cart}</td>
                                    <td>{i.stock}</td>
                                    <td style={{color: 'red',cursor: 'pointer'}} onClick={this.delStock.bind(this,index)} >X</td>
                                    </tr>
                                  )                                                                                          
                          })
                          :
                          (<p>Please add stock in any cart</p>)
                        }
                       
                     
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
// redux

const mapStateToprops = state => {
    log('redux nechy sy Edit product ka', state)
    return {
        product: state.products.editProduct,
        isProduct: state.products.isProduct,
        status: state.products.error
    }
}
 
export default connect(mapStateToprops,{updateProduct,deleteProductImage})(Edit);