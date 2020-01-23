import {
    GET_PRODUCTS,
    USER_LOADING,
    CART_PRODUCTS
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    products: undefined,
    cart:[],
    cartProducts: undefined ||JSON.parse(localStorage.getItem('UserCart')) ,
    loading: false
  };
  export default function(state = initialState, action) {

// var lclcrt = cart.push

    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
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