import React,{Component} from 'react';
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import axios from 'axios'
import {addProduct,getProducts,sendToCartOwner,delAfterApproved} from'../../actions/productsAction'
import './adminDashboard.css'
import AdminNavbar from './adminNavbar';


 class Admin extends Component{

    constructor(){
        super()
        this.state = {
            bookedOrderData: [],
            products:[],
            image:'',
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
            eka:'',
            cartOwners:[],
            counter :0
        }
        this.onChangeImage = this.onChangeImage.bind(this);
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
        .get("/api/products")
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
        .get('/api/bookedProducts')
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

        for(let i=0; i<=100;i++){
              this.setState({
                counter: i
            })
            console.log(i)
        }
        // this.setState({

        // })
    }

    delete(key,index,e){
        e.preventDefault()
        console.log(key, 'id')
        let id = {
            imageId:key.imageId,
            key:key._id,
        }
        axios.post("/api/delProducts", id)
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

        let filterId = this.state.products.filter(i => {return i._id === id})

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
    onChangeImage = e => {
        this.setState({ image: e.target.files[0] });
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
        formData.append("name", this.state.addName);
        formData.append("description", this.state.addDescription);
        formData.append("price", this.state.addPrice);
        formData.append("stock", this.state.addStock);
        formData.append("image", this.state.image);
        console.log('New product-------',formData)
    this.props.addProduct(formData, this.props.history);

    this.setState({
      addName: "",
      addDescription: '',
      addPrice: '',
      addStock:'',
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
       
    approve(id){
        // e.preventDefault()
        
        let filteredProduct = this.state.bookedOrderData.filter(i => {
            return i._id === id
        })
        
        this.setState({selectedProduct:filteredProduct})
        console.log('working aproval',this.state.selectedProduct)
        console.log('working aproval',filteredProduct)



    }

    onChangePrice(eve){
        // var abc = e.target.value[e.target.value.length-1]!=='0'
     
    //   if(eve.target.value[eve.target.value.length-1]!=='e'){
        // console.log('Price onshange=======',eve.target.value)
        this.setState({
            addPrice: eve.target.value
        })

        
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
       
        return(
            <div className='adminDashboard'>
                <AdminNavbar/>

            </div>
        )
    }
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
  )(withRouter(Admin));