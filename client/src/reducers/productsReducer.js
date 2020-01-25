import {
    GET_PRODUCTS,
    USER_LOADING,
    CART_PRODUCTS
  } from "../actions/types";
  import axios from 'axios'
import { getProducts } from "../actions/productsAction";
  const isEmpty = require("is-empty");
  const initialState = {
    products: undefined,
    cart:[],
    cartProducts: undefined ||JSON.parse(localStorage.getItem('UserCart')) ,
    loading: true,
    apiProducts:undefined
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
        // case CART_PRODUCTS:
        //     return {
        //         ...state,
        //         cart: action.payload,
        //         // cartProducts: action.payload
        //     };
        case USER_LOADING:
            return {
              ...state,
              loading: true
            };
      default:
        return state;
    }
  }