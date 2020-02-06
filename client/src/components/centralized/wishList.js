import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { logoutUser } from "../../actions/authActions";
import { getWishList,delWishList } from "../../actions/productsAction";
import DeleteBtnIcon from '../centralized/images/delete-button.png'

import './style/home.css'


class WishList extends Component {
    constructor(props){
      super(props);
    this.state={
      user:{},
      wishlist:{},
      products: [],
      userId:'',
      delId:''
    }
  }
  

  componentDidMount(){
    //   console.log(this.props.auth.user.id)
    let key = {

    key: this.props.auth.user.id
    }
     this.props.getWishList(key)

     if(this.props.wishList!==undefined && this.props.products ){
         const allProducts = this.props.products
        console.log('saari products----->',this.props.products)
        const products= this.props.wishList.data.products;
        let forEachProducts=[]

        products.forEach((item,index) => {
           var finalProducts = allProducts.filter(i => {
                return i._id === item
            })
            forEachProducts.push(finalProducts[0])

            this.setState({
                products:forEachProducts
            })
        })  
        
        //  console.log('wishlist ki array',finalProducts)
    }
    console.log('final product------------>', this.state.products)
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    // this.props.getWishList(key)

    console.log('wislist ki willrcve----->', nextProps)
    if(nextProps.wishList!==undefined && nextProps.products ){
        const allProducts = nextProps.products
        this.setState({
            userId:nextProps.wishList.data._id
        })
       console.log('saari products----->',nextProps.wishList.data._id)
       const products= nextProps.wishList.data.products;
       let forEachProducts=[]

       products.forEach((item,index) => {
          var finalProducts = allProducts.filter(i => {
               return i._id === item
           })
           forEachProducts.push(finalProducts[0])

           this.setState({
               products:forEachProducts
           })
           console.log('final product------------>', forEachProducts)
       })  
        
       //  console.log('wishlist ki array',finalProducts)
    }

    if(nextProps.delProduct===true){

        console.log(this.state.delId)
        const delFinal = this.state.products.filter(i => {
            return i._id !== this.state.delId
        })
        this.setState({
            products: delFinal
        })
            console.log('del k lye andr sy ----->',this.state.delId)
    }
    // else if(delProduct===true){
    //     console.log(this.state.delId)
    //     const delFinal = this.state.products.filter(i => {
    //         return i._id !== this.state.delId
    //     })
    //     this.setState({
    //         products: delFinal
    //     })
    // }
}

delete(id){
    
    this.setState({
        delId:id
    })
    let key ={
        key:this.state.userId,
        productId:id
    }
    this.props.delWishList(key)
    
    
    if(this.props.delProduct===true){

        console.log(this.state.delId)
        const delFinal = this.state.products.filter(i => {
            return i._id !== this.state.delId
        })
        this.setState({
            products: delFinal
        })
            // console.log('del k lye andr sy ----->',this.state.delId)
    }
   
  }
  
  render() {
      const { user } = this.props.auth;
      const wishList = this.props.wishList
     
      
  return (
        <div >
        
        <table class="table">
            <thead style={{backgroundColor: '#5ba616'}}>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                   this.state.products===[]?
                   <tr >
                    <th scope="row"> </th>
                    <td>  </td>
                    <td><div className='loaders'></div></td>
                    <td>  </td>
                    <td></td>
                   </tr>
                   :this.state.products.map((item,index) => {
                       return (
                        <tr key={index}>
                        <th scope="row">{index+1} </th>
                        <td><img src={item.image} width='100' height='80' /></td>
                        <td> {item.name}  </td>
                        <td>{item.price}</td>
                        <td className='cart-body ' style={{color:"#5BA616"}}><img 
                         className='cursor-pointer' src={DeleteBtnIcon}
                         onClick={this.delete.bind(this,item._id)}
                          width='16px' height='16px' alt='delete-button'/></td>
                        </tr>
                       )
                   }) 
                }
               
               
            </tbody>
          
          
          </table>
        </div>
        
      );
    }
  }
 
  const mapStateToProps = state => {
   console.log('wishlist ki mapstate ====>',state.products.delProduct)
    return{
    auth: state.auth,
    products: state.products.products,
    wishList: state.products.wishList,
    delProduct: state.products.delProduct
   }
  }
  
  ;
  export default connect(
    mapStateToProps,
    { logoutUser,getWishList,delWishList }
  )(WishList);