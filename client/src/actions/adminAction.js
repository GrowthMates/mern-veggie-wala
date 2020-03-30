import axios from "axios";

import {
  GET_ERRORS,  
  GET_PRODUCTS,
  SELECTED_PRODUCT,
  GET_CARTS,
} from "./types";

export const getProducts = (caller) => dispatch => {
    console.log(`GEtPRoducts admin ky update by ${caller}=====`)
 
      axios
        .get("http://localhost:5000/api/products")
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

export const updateProduct = data => dispatch => {
    axios.post("http://localhost:5000/api/updateProduct",data)
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

  axios.get('http://localhost:5000/api/getCartOwners')
  .then(res => {
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
    


