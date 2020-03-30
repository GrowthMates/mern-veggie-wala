import {
    CART_PRODUCTS,
    TOTAL_PRICE,
    EMPTY_CART,
    GET_CARTS
  } from "../actions/types";
import axios from "axios";
  const isEmpty = require("is-empty");
  const initialState = {
    loading: false,
    cart: undefined,
    getCarts:undefined,
    totalPrice: '' || JSON.parse(localStorage.getItem('totalPrice'))
  };
  const newCart=  JSON.parse(localStorage.getItem('CartProduct'));
  console.log('newCart==========',newCart)
  export default function(state = initialState, action) {
    if(state.cart==undefined){
      state.cart=newCart
    }
    
    switch (action.type) {
      case CART_PRODUCTS:
        // console.log('cartproduct type----------',...state)
        return {
          ...state,
          loading: true,
        //   isAuthenticated: !isEmpty(action.payload),
         cart: action.payload,
                // cartProducts: 
        };
        case EMPTY_CART:
          return{
            loading: false,
            cart: action.payload,
            totalPrice: 0
          };
        case GET_CARTS:
          return{
            loading: false,
            getCarts: action.payload,
            // totalPrice: 0
          };
        case TOTAL_PRICE:
        // console.log('cartproduct type----------',...state)
        return {
          ...state,
          loading: true,
        //   isAuthenticated: !isEmpty(action.payload),
         totalPrice: action.payload,
                // cartProducts: 
        };
      default:
        return state;
    }
  }