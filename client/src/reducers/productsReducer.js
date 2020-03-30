import {
    GET_PRODUCTS,
    USER_LOADING,
    CART_PRODUCTS,
    GET_ERRORS,
    WISHLIST,
    DEL_WISHLIST,PATH_CHECKER,
    SELECTED_PRODUCT,
    STATUS_UPDATE,
  } from "../actions/types";
  import axios from 'axios'
import { getProducts } from "../actions/productsAction";
  const isEmpty = require("is-empty");
  const initialState = {
    products: undefined,
    cart:[],
    cartProducts: undefined ||JSON.parse(localStorage.getItem('UserCart')) ,
    loading: true,
    apiProducts:undefined,
    productErrors:undefined,
    error:false,
    wishList:undefined,
    delProduct: false,
    pathChecker: false,
    isProduct:false,
    editProduct: undefined,
    status:undefined

  };

  
  export default  function(state = initialState, action) {
 
  // let newproducts = [...products]
  // newproducts.push
  console.log('get product ne bulaya h=======',action)
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
          loading: false,
          products: action.payload
        };
        case GET_ERRORS:
            return {
                ...state,
                productErrors: action.payload,
                error:true
            };
        case USER_LOADING:
            return {
              ...state,
              loading: true
            };
        case WISHLIST:
          return {
            ...state,
            loading: true,
            wishList:action.payload
          };
        case DEL_WISHLIST:
          return {
            ...state,
            delProduct: true,
            // wishList:action.payload
          };
        case PATH_CHECKER:
          return {
            ...state,
            pathChecker: true ,
            // wishList:action.payload
          };
        case SELECTED_PRODUCT:
          return {
            ...state,
            isProduct: true ,
            editProduct:action.payload
            // wishList:action.payload
          };
        case STATUS_UPDATE:
          return {
            ...state,
            status: action.payload,
            // editProduct:action.payload
            // wishList:action.payload
          };
      default:
        return state;
    }
  }