import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  GET_PRODUCTS,
  CART_PRODUCTS,
  ADD_CART,
} from "./types";

const arr=[]
var getCartProdLocalStorage=[]

export const getProducts = (productData, history) => dispatch => {
    axios
      .get("http://localhost:5000/api/products", productData)
      .then((res) => {
                      console.log("Products success", res)
                      return(
                          dispatch({
                              type: GET_PRODUCTS,
                              payload: res.data
                            })
                            )    
                        }) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

 export const addToCart = (productId) => dispatch => {
    axios
      .post("http://localhost:5000/api/user-data/addToCart", productId)
      .then((res) => {
          
             localStorage.setItem('addCart',JSON.stringify(res.data))
              
            var currId = JSON.parse(localStorage.getItem('addCart')).data.productId
            console.log(currId, 'abhi ki id') 

            var prod = JSON.parse(localStorage.getItem('Products'));
              getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
            var filterObj = prod.filter((e) => {
                console.log(e._id, 'filter') 
                return e._id === currId
            });
            var pushData = undefined


                        // for(var i=0; i<getCartProdLocalStorage.length; i++){

            //     if(filterObj[0]._id === getCartProdLocalStorage[i]._id){
            //         return pushData = 'available'

            //     }
            // }

            // if(pushData === undefined){
            //     arr.push(filterObj[0])
            // }
            // else
            //     console.log('match ho gai')
            // }
            if( localStorage.getItem('CartProduct')){

         
                // solution
                var hasDuplicate = false;
                getCartProdLocalStorage.map(v => v._id).sort().sort((a, b) => {
                  if (a === b) {
                    hasDuplicate = true;

                  }
                //   else if(hasDuplicate === false){
                //     arr.push(filterObj[0])
                //     console.log('dplcte nh hy')
                //   }
            })
            console.log('hasDuplicate', hasDuplicate)
            localStorage.setItem('CartProduct', JSON.stringify(arr))
                // if(getCartProdLocalStorage)
                // var valueArr = getCartProdLocalStorage.map(function(item,index){ return item._id });
                
                // console.log( valueArr, 'dplcte')
                // for(var i =0; i<valueArr.length; i++){
                //     console.log(valueArr[i]);

                //     if(valueArr[i] === filterObj[0]._id){
                //         return pushData = 'isDuplicate'
                //     }
                // }
                // if(pushData !== 'isDuplicate'){
                //     arr.push(filterObj[0])
                //     console.log('dplcte nh hy final')
                // }
                // else{
                //     console.log('dplcte hy ')
                // }
                // for(var i=0)
            //     if(valueArr !== filterObj[0]._id){
            //         console.log(valueArr, 'vaue arr')

            //        arr.push(filterObj[0]) 
            //        localStorage.setItem('CartProduct', JSON.stringify(arr))
            //        console.log('du[plcte nh hy')
            //        console.log(valueArr[0],filterObj[0]._id,'ids')
            //    }
            //    else{
            //        console.log('duplicate caught')
            //    }
                //   console.log( 'ids' ,) 
                // console.log( 'filter if wala' , filterObj[0]) 
                // console.log("Products sent in cart success", res.data);
                        //   localStorage.setItem('UserCart',)
                              return(
                                  dispatch({
                                      type: CART_PRODUCTS,
                                      payload: arr
                                    })
                                    )  
                // console.log('lcl nh hy' ,valueArr)
                
            }
            else{
               console.log('else id nh hy')
               arr.push(filterObj[0]) 
               localStorage.setItem('CartProduct', JSON.stringify(arr))

            }
            // var isDuplicate = valueArr.some(function(item, idx){ 
            //     return valueArr.indexOf(item) != idx 
            // });
           
        //   if(valueArr[0] !== filterObj[0]._id){
        //       console.log('hello')
        //   }
        //   else{
        //     console.log('id match ho gai')

        //   }
            // var arr = [] || filterObj[0]
            // console.log(isDuplicate, 'locl strge')

            // console.log(valueArr[0], 'find hua wa array')
            console.log(filterObj[0]._id, 'find hua wa id');

            
                        }) // re-direct to login on successful register
      .catch(err =>
        {
        console.log('Cart reducer err---- ', err.message);
                return(
        dispatch({
          type: GET_ERRORS,
          payload: err.message
        }))}
      );
  };

  export const userCart = (history) => dispatch => {
    axios
      .get("http://localhost:5000/api/user-data/cart")
      .then((res) => {
                      localStorage.setItem('UserCart',JSON.stringify(res.data))
                      console.log('Cart in local-----:',localStorage.getItem('UserCart') )
                      
                          dispatch({
                              type: CART_PRODUCTS,
                              payload: res.data
                            })
                       
                            // history.push('/cart');
                            console.log("Products sent in cart success", res.data);
                        }) // re-direct to cart on success
      .catch(err =>
        {
        console.log('View Cart reducer err---- ', err.message);
        //         return(
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // }))
    }
      );
  };


 