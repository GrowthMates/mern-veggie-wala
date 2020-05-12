import axios from "axios";
// import history from '../history'
// import setAuthToken from "../utils/setAuthToken";
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
  GET_SINGLE_PRODUCT,
  PRODUCTS,
  STATUS_UPDATE,
  PROGRESS_START,
  PROGRESS_END,
} from "./types";
import {socket} from '../components/centralized/navbar'

var arr=JSON.parse(localStorage.getItem('CartProduct')) || [];
var getCartProdLocalStorage=[]

 export const getProducts = (caller) => dispatch => {
  console.log(`GEtPRoducts called by ${caller}=====`)
  // socket.emit("call_products")
  // socket.on("get_products",(products)=>{
  //   console.log('socket products====',products)
  //   return(
  //     dispatch({
  //          type: GET_PRODUCTS,
  //          payload: products
  //        })
      
  //        )   
  // })
  
    axios
      .get("/api/products")
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
          payload: err.response?err.response.data:err.message
        })
        console.log("Products success", err)}
      );
  };

 export const getSingleProduct = (id) => dispatch => {
   console.log('getSingle Product called',id)
   dispatch({
    type: PROGRESS_START,
  })
   axios.get(`/api/products/${id}`).then(res=>{
   console.log('getSingle Product res===',res.data)
      dispatch({
        type:GET_SINGLE_PRODUCT,
        payload:res.data
      })
      dispatch({
        type: PROGRESS_END,
      })
   })
   .catch(err=>{
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
    })
    dispatch({
      type: PROGRESS_END,
    })
   })
 } 

 export const addToCart = (product) => (dispatch, getState) => {

  dispatch({
    type: PROGRESS_START,
  })



   let cartCurrentState = getState().cartReducer
   console.log(getState())
          const productCart={
            productId:product.item._id,
            quantity:product.quantity,
            userId:product.userId,
            priceTotal:product.item.price*product.quantity
          }
            console.log('No.8:--OurArray-----',arr)
        // Checking data (available || not) in Storage //JSON.parse(localStorage.getItem('CartProduct'))!=null && JSON.parse(localStorage.getItem('CartProduct')).length!=0

            if(cartCurrentState.cart){
              
                  console.log('No2:--If K Andar ka GetCart-----',getCartProdLocalStorage)

                  getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
                  //Function to match items
                  function checkItem(item){
                      return item.filterProduct._id==productCart.productId
                  }
                  
                  // Array.find() to find each data matching the params
                  var result=cartCurrentState.cart.find(checkItem);

                  console.log('No5:--fnl array--------:',result);
                 

                  //Result will be undefiend when current data isn't available in prev data array
                    if(result===undefined){ 
                        // console.log(filterObj[0]._id, 'No6:--find hua wa id');
                        const config = {
                          onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                      }
                        axios
                        .post("/api/user-data/addToCart", productCart,config)
                        .then((res) => {
                             
                            dispatch(userCart(productCart.userId))
                            dispatch({
                              type: PROGRESS_END,
                            })
                          // }
                        // dispatch({
                        //   type: CART_PRODUCTS,
                        //   payload: arr
                        // })
                      }) 
                      .catch(err =>
                        {
                        console.log('Cart reducer err---- ', err.message);
                                return(
                        dispatch({
                          type: GET_ERRORS,
                          payload: err.message
                        }),
                        dispatch({
                          type: PROGRESS_END,
                        })
                        )}
                      );
                
                      }
                      else void 0;
   


    //Starting...
            }
            else
            {
              productCart.checker=true
               console.log('products cart else======',productCart)

               const config = {
                onUploadProgress: progressEvent => console.log(progressEvent.loaded)
            }
              axios
                  .post("/api/user-data/addToCart", productCart,config)
                  .then((res) => {
                       
              
                          console.log('ProductId API', productCart.productId)
                   
                      dispatch(userCart(productCart.userId))
                      dispatch({
                        type: PROGRESS_END,
                      })
                 

                  }) 
                  .catch(err =>
                    {
                    console.log('Cart reducer err---- ', err);
                            return(
                    dispatch({
                      type: GET_ERRORS,
                      payload: err.message
                    }),
                    dispatch({
                      type: PROGRESS_END,
                    })
                    )}
                  );
              };
          
            }


            
    
         
   

  export const userCart = (id) => dispatch => {
    console.log('USer cart called====',id)
    let cartArr = []
    axios
      .get(`/api/user-data/cart/${id}`)
      .then((res) => {
                      localStorage.setItem('UserCart',JSON.stringify(res.data))
                      console.log('Cart in local-----:',localStorage.getItem('UserCart') )
                      
                      if(res.data.products!=null||res.data.products!=''){
                        for(let i=0;i<res.data.products.productsList.length;i++){
                          cartArr.push({
                            filterProduct:res.data.products.productsList[i].product,
                            cartSchemaId:res.data.products._id,
                            quantity:res.data.products.productsList[i].quantity
                          })
                        }
                        console.log('CartArray====>>>',cartArr)
                        
                            dispatch({
                                type: CART_PRODUCTS,
                                payload: cartArr
                              })
                            dispatch({
                              type:TOTAL_PRICE,
                              payload:res.data.products.cartTotalPrice
                            })  
                         
                              // history.push('/cart');
                              console.log("User cart success", res.data.products);
                      }
                      else{
                        return(
                          dispatch({
                            type: EMPTY_CART,
                            payload: null
                          })
                        )
                      }
                        }) // re-direct to cart on success
      .catch(err =>
        {
        console.log('View Cart reducer err---- ', err.message);
                return(
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        }))
    }
      );
  };

  export const proceed = (newProceed, history) => dispatch => {
    axios
      .post('/api/products/proceed',newProceed)
      .then(res => {
        // localStorage.removeItem('CartProduct')
        
        console.log('proceed ka data action se=== ', res.data)
        dispatch({
          type: PROCEED_PRODUCT,
          payload: res.data
        })
        if(res.data.success){
          dispatch(emptyCart());
          history.push('/')
        }
      })
      .catch(err => {
        console.log('proceedsy error......., ', err)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }

 export const emptyCart= () => (dispatch,getState) => {
   console.log('Empty Cart Action=====>',getState().auth.user.id);
   axios.post('/api/user-data/cart/delete',{id:getState().auth.user.id}).then(res=>{
    console.log('delte cart success',res.data)
     dispatch({
        type: EMPTY_CART,
        payload: undefined
      })
   }).catch(err=>{

   })
  }
  
  // export const addProduct = (newPoduct) => dispatch => {
  //   axios
  //     .post('/api/createProducts',newPoduct)
  //     .then(res => {
  //       dispatch(getProducts('Add Products'));
  //       console.log('create product admin sy ka data ', res.data)
  //     })
  //     .catch(err => {
  //       dispatch({
  //         type: GET_ERRORS,
  //         payload: err.message
  //       })
  //       console.log('added products sy ..........',err)
  //     })
  // }

  export const addProduct = (newPoduct) => dispatch => {
      axios
        .post('/api/createProduct',newPoduct)
        .then(res => {
          dispatch(getProducts('Add Products'));
          // dispatch({
          //   type: GET_PRODUCTS,
          //   payload: res.data
          // })
          console.log('create product admin sy ka data ', res.data)
        })
        .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.message
          })
          console.log('added products sy ..........',err)
        })
    }

  // export const updateProduct = (updatePoduct) => dispatch => {
  //   axios
  //     .put('/api/updateProducts',updatePoduct)
  //     .then(res => {
  //       dispatch({
  //         type: UPDATE_PRODUCT,
  //         payload: res.data
  //       })
  //       console.log('Update product admin sy ka data ', res.data)
  //     })
  //     .catch(err => {
  //       console.log('Update product error......., ', err.message)
  //     })
  // }

  export const sendToCartOwner = (orderData) => dispatch => {
    axios
      .post('/api/cartOwner/confirmOrder',orderData)
      .then(res => {
        dispatch({
          type: CONFIRM_ORDER,
          payload: res.data
        })
        console.log('proceed ka data ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }

  export const delAfterApproved = (key) => dispatch => {
    axios
      .post('/api/del/approved',key)
      .then(res => {
        dispatch({
          type: DEL_APPROVALS,
          payload: res.data
        })
        console.log('approval wali product del ho gai admin sy ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }

  export const delCartProducts = (prcd) => dispatch => {
    axios
      .post('/api/del/cart',prcd)
      .then(res => {
           localStorage.removeItem('CartProduct');
        console.log('approval wali product del ho gai admin sy ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }

  export const totalPrice = (data) => dispatch => {
    dispatch({
      type: TOTAL_PRICE,
      payload: data
    })
  }

  export const wishList = (data) => dispatch => {
        axios
        .post('/api/wishList',data)
        .then(res => {
            dispatch({
              type: WISHLIST,
              payload: data
            })
          console.log('Wish List Ka Action then sy', res.data)
        })
        .catch(err => {
          console.log('Wish List ka error......., ', err.message)
        })
  }

  export const getWishList = (data) => dispatch => {
    // console.log(data)
    axios
    .post('/api/getWishList',data)
    .then(res => {
      console.log(res.data)
        dispatch({
          type: WISHLIST,
          payload: res
        })
      // console.log('Wish List Get ki Req sy', res.data)
    })
    .catch(err => {
      console.log('Wish List ka error......., ', err.message)
    })
}

export const delWishList = (data) => dispatch => {
  // console.log(data)
  axios
  .post('/api/del/wishList',data)
  .then(res => {
    console.log(res.data)
      dispatch({
        type: DEL_WISHLIST,
        payload: res.data
      })
    // console.log('Wish List Get ki Req sy', res.data)
  })
  .catch(err => {
    console.log('Wish List ka error......., ', err.message)
  })
}
export const infoPathCheck = (data) => dispatch => {
  // console.log(data)
      dispatch({
        type: PATH_CHECKER,
        payload: data
      })
    // console.log('Wish List Get ki Req sy', res.data)
 
}

export const updateStatus = (data) => dispatch => {
  // console.log(data)
  axios
  .post('/api/updateStatus',data)
  .then(res => {
    console.log('status change succesfully',res.data)
      dispatch({
        type: STATUS_UPDATE,
        payload: res.data
      })
    // console.log('Wish List Get ki Req sy', res.data)
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
    console.log('Status update ka error ka error......., ', err.message)
  })
}

export const updateProductStatus = (data) => dispatch => {
  // console.log(data)
  axios
  .post('/api/updateProductStatus',data)
  .then(res => {
    console.log('status change succesfully',res.data)
      dispatch({
        type: STATUS_UPDATE,
        payload: res.data
      })
    // console.log('Wish List Get ki Req sy', res.data)
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
    console.log('Status update ka error ka error......., ', err.message)
  })
}


  

  
  
  