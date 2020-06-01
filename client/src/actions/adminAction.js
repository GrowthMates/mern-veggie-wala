import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,  
  SET_CURRENT_USER,
  USER_LOADING,
  GET_PRODUCTS,
  SELECTED_PRODUCT,
  SET_ADMIN_AUTH,
  GET_CARTS,
} from "./types";

export const getProducts = (caller) => dispatch => {
    console.log(`GEtPRoducts admin ky update by ${caller}=====`)
 
      axios
        .post("/api/products")
        .then((res) => {
  
                        console.log("Products success", res)
                        return(
                           dispatch({
                                type: GET_PRODUCTS,
                                payload: res.data
                              })
                           
                              )    
                          }) // re-direct to login on successful register
        .catch(err => { 
          dispatch({
            type: GET_ERRORS,
            payload: err.message
          })
          console.log("Products success", err)}
        );
    };

export const selectedproduct = data => dispatch => {

    dispatch({
        type: SELECTED_PRODUCT,
        payload:data
    })

}

export const deleteProductImage = (imageId) => dispatch => {
  console.log('Image delete called....',imageId)
  axios.post('/api/deleteImage',imageId)
  .then((res)=>{
    console.log('Image Deleted...',res.data)
  })
  .catch(err => {
    console.log('Image Delete Error...',err)
  })
}

export const updateProduct = data => dispatch => {
    axios.post("/api/updateProduct",data)
    .then(res => {
        dispatch(getProducts('Add Products'));
        
    })
    .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err.message
        })
    })
}

export const carts = data => dispatch => {

  axios.get('/api/getCartOwners')
  .then(res => {
    console.log(res.data)
      dispatch({
        type:GET_CARTS,
        payload: res.data
    })
  
      
  })
  .catch(err => {
      dispatch({
          type:GET_ERRORS,
          payload: err.message
      })
  })
}
    
// Authentication....//




// Login - get user token
export const loginAdmin = userData => dispatch => {
  axios
    .post("/api/admin/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      console.log("Login Success", res)
      const { token } = res.data;
      sessionStorage.setItem("AJwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setAdminAuth(decoded));
    })
    .catch((err) =>
      {console.log("Login Err",err.message)
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};


// Set logged in user
export const setAdminAuth = decoded => {
  console.log("setAdminAuth: ",decoded)
  return {
    type: SET_ADMIN_AUTH,
    payload: decoded
  };
};


// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};


// Log user out
export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  sessionStorage.removeItem("AJwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setAdminAuth({}));
  window.location.href="./administrator/login"
};






