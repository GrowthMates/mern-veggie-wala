import {
    CART_PRODUCTS,
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    products: undefined,
    cartProducts: undefined ,
    loading: false,
    cart: undefined
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case CART_PRODUCTS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
         cart: action.payload,
                // cartProducts: 
        };
      default:
        return state;
    }
  }