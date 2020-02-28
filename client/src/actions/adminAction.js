import axios from "axios";

import {
  GET_ERRORS,
  GET_PRODUCTS,
  CART_PRODUCTS,
  ADD_CART,
  PROCEED_PRODUCT,
  UPDATE_PRODUCT,
  CONFIRM_ORDER,
  DEL_APPROVALS,
  TOTAL_PRICE,
  WISHLIST,
  EMPTY_CART,
  DEL_WISHLIST,
  PATH_CHECKER,
  PRODUCTS
} from "./types";

// export const updateProduct = (caller) => dispatch => {
//     console.log(`GEtPRoducts called by ${caller}=====`)
     
//       axios
//         .get("http://localhost:5000/api/products")
//         .then((res) => {
  
//                         console.log("Products success", res)
                  
//                            dispatch({
//                                 type: GET_PRODUCTS,
//                                 payload: res.data
//                               })
                           
                            
//                           }) // re-direct to login on successful register
//         .catch(err => { 
//           dispatch({
//             type: GET_ERRORS,
//             payload: err.message
//           })
//           console.log("Products success", err)}
// }

export const updateProduct = data => dispatch => {
    axios.post("http://localhost:5000/api/updateProduct",data)
    .then(res => {
        dispatch({
            type:UPDATE_PRODUCT,
            payload: data
        })
        
    })
    .catch(err => {
        dispatch({
            type:GET_ERRORS,
            payload: err
        })
    })
}
    


