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
import {updateProduct,addProduct,getProducts,sendToCartOwner,delAfterApproved} from'../../actions/productsAction'
import './adminDashboard.css'
import ApprovalProducts from './approvalProduct'
import AllProducts from './allProducts'


 class Admin extends Component{
    

    render(){
       
        return(
            <div className='adminDashboard'>
                <div>
                    
                </div>

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
    { addProduct,updateProduct,getProducts,sendToCartOwner,delAfterApproved }
  )(withRouter(Admin));