import {
    GET_PRODUCTS,
    USER_LOADING,
    CART_PRODUCTS,
    GET_ERRORS,
    WISHLIST,
    DEL_WISHLIST,PATH_CHECKER
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
    pathChecker: false
  };

  
  export default  function(state = initialState, action) {
 
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
      default:
        return state;
    }
  }