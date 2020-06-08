import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { logoutUser } from "../../actions/authActions";
import { getWishList,delWishList } from "../../actions/productsAction";
import DeleteBtnIcon from '../centralized/images/delete-button.png'

import './wishlist.css'


class WishList extends Component {
    constructor(props){
      super(props);
    this.state={
      user:{},
      wishlist:{},
      products: [],
      userId:'',
      delId:'',
      loading:true,
    }
  }
  

  componentDidMount(){
    //   console.log(this.props.auth.user.id)
    if(this.props.auth.user.id){
        let key = {
             key: this.props.auth.user.id
        }
         this.props.getWishList(key)
    }
    else{
        this.props.history.push("/user/login")
    }

     if(this.props.wishList){
        console.log('saari products----->',this.props.products)
        const products= this.props.wishList.products;
        
               this.setState({
                   products,
                   loading:false
               })
    }
    else {
        this.setState({loading:false})
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps){
    // this.props.getWishList(key)

    console.log('wislist ki willrcve----->', nextProps)
     if(nextProps.wishList){
        const products= nextProps.wishList.products;
        this.setState({products,loading:false})
    }
    else{
        this.setState({loading:false})
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
     
      console.log(this.state.products)
  return (
        <div >
                        <section className='wishlist-upper col-lg-12'>
                            <div className='cart-img-text'>
                                
                            </div>
                        </section>
        <table class="table" style={{overflowX:'auto',minHeight:"500px"}}>
            <thead className='cart-head'>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            
            <tbody className='cart-body' >
                {
                   !this.state.products || this.state.products?.length<1?
                   <tr >
                    <th scope="row"> </th>
                    <td>  </td>
                    <td colSpan='5 ' style={{display:'flex',justifyContent:'center',alignItems:'center', height:'18rem'}}>
                        {this.state.loading?
                        <div class="spinner-border text-success " style={{width: '3rem', height: '3rem'}} role="status">
                        <span class="sr-only">Loading...</span>
                        </div>
                        :<div style={{fontWeight:'bold', fontSize:'larger',position:'absolute'}}>No Items are added in WishList yet! <br/><Link to='/collections' style={{color:'#5ba616'}}>Add Now -></Link></div>
                        }
                        </td>
                    {/* <td>  </td>
                    <td></td> */}
                   </tr>
                   :this.state.products.map((item,index) => {
                       return (
                        <tr key={index}>
                        <th className='cart-body' style={{color:'#5ba616'}}>{index}</th>    
                        <th scope="row">
                            <Link to={`/product/${item._id}`}>
                            <img 
                            className="cursor-pointer img-for-cart" 
                            style={{marginRight:'25px'}} 
                            src={item.images[0].image}/>
                            </Link>
                        </th>
                        <td className='cart-body'>{item.name}</td>
                        <td className='cart-body'  style={{color:'#5ba616'}}>Rs.{item.price}</td>
                        <td className='cart-body ' style={{color:"#5BA616"}}><img onClick={this.delete.bind(this,item._id)}

                        className='cursor-pointer' src={DeleteBtnIcon} width='16px' height='16px' alt='delete-button'/></td>


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