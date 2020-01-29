import {
    GET_PRODUCTS,
    USER_LOADING,
    CART_PRODUCTS,
    GET_ERRORS
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
    error:false
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
      default:
        return state;
    }
  }