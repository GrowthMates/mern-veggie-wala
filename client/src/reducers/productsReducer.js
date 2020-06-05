import {
    GET_PRODUCTS,
    USER_LOADING,
    GET_SINGLE_PRODUCT,
    CART_PRODUCTS,
    GET_ERRORS,
    WISHLIST,
    DEL_WISHLIST,PATH_CHECKER,
    SELECTED_PRODUCT,
    STATUS_UPDATE,
    GET_FEATURED_PRODUCTS,
    OPEN_NOTE,
    COUNT_PRODUCTS,
  } from "../actions/types";
  import axios from 'axios'
import { getProducts } from "../actions/productsAction";
  const isEmpty = require("is-empty");
  const initialState = {
    products: undefined,
    featuredProducts: undefined,
    cart:[],
    cartProducts: undefined ||JSON.parse(localStorage.getItem('UserCart')) ,
    loading: true,
    apiProducts:undefined,
    productErrors:undefined,
    singleProduct:undefined,
    error:false,
    wishList:undefined,
    delProduct: false,
    pathChecker: false,
    isProduct:false,
    editProduct: undefined,
    status:undefined,
    productsLength:undefined,
    openNote:false,

  };

  
  export default  function(state = initialState, action) {
 
 
  console.log('get product ne bulaya h=======',action)
    switch (action.type) {

      //Length of products Available in DB
      case COUNT_PRODUCTS:
        return {
          ...state,
          productsLength: action.payload
        };

      // ALL PRODUCTS
      case GET_PRODUCTS:
        return {
          ...state,
        //   isAuthenticated: !isEmpty(action.payload),
          loading: false,
          products: action.payload
        };
      // FEATURED PRODUCTS  
      case GET_FEATURED_PRODUCTS:
        return {
          ...state,
          loading: false,
          featuredProducts: action.payload
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
        case GET_SINGLE_PRODUCT:
            return{
              ...state,
              singleProduct:action.payload,
            } 
        case OPEN_NOTE:
          return{
            ...state,
            openNote: action.payload
          }    
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