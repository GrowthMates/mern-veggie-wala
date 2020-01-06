import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  GET_PRODUCTS,
  CART_PRODUCTS,
  ADD_CART,
  PROCEED_PRODUCT,
} from "./types";

const arr=JSON.parse(localStorage.getItem('CartProduct')) || [];
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

 export const addToCart = (productCart) => dispatch => {
    // axios
    //   .post("http://localhost:5000/api/user-data/addToCart", productCart)
    //   .then((res) => {
           
    //          localStorage.setItem('addCart',JSON.stringify(res.data))
    //           console.log('ProductId API', productCart.productId)
    //         var currId = JSON.parse(localStorage.getItem('addCart')).data.productId
    //         console.log(currId, 'abhi ki id') 

    //         var prod = JSON.parse(localStorage.getItem('Products'));
    //           getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
    //           console.log('No1:--GetCartProdLocalStorage------',getCartProdLocalStorage)
    //         var filterObj = prod.filter((e) => {
    //           return e._id === productCart.productId
    //         });
            console.log('No.8:--OurArray-----',arr)

        // Checking data (available || not) in Storage 
            if( localStorage.getItem('CartProduct')){
              
                  console.log('No2:--If K Andar ka GetCart-----',getCartProdLocalStorage)

                  getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
                  //Function to match items
                  function checkItem(item){
                      return item.filterProduct._id==productCart.productId
                  }

                  // Array.find() to find each data matching the params
                  var result=getCartProdLocalStorage.find(checkItem);

                  console.log('No5:--fnl array--------:',JSON.stringify(result));
                 

                  //Result will be undefiend when current data isn't available in prev data array
                    if(result===undefined){
                        // console.log(filterObj[0]._id, 'No6:--find hua wa id');
                        axios
                        .post("http://localhost:5000/api/user-data/addToCart", productCart)
                        .then((res) => {
                             
                               localStorage.setItem('addCart',JSON.stringify(res.data))
                                console.log('ProductId API', productCart.productId)
                              var currId = JSON.parse(localStorage.getItem('addCart')).data.productId
                              console.log(currId, 'abhi ki id') 
                  
                              var prod = JSON.parse(localStorage.getItem('Products'));
                                console.log('No1:--GetCartProdLocalStorage------',getCartProdLocalStorage)
                              var filterObj = prod.filter((e) => {
                                return e._id === productCart.productId
                              });
                              console.log('No.8:--OurArray-----',arr)


                        var newProd = {
                          filterProduct: filterObj[0],
                          cartSchemaId:  currId
                        }
                        arr.push(newProd)
                        localStorage.setItem('CartProduct', JSON.stringify(arr))
                        
                      }) 
                      .catch(err =>
                        {
                        console.log('Cart reducer err---- ', err.message);
                                return(
                        dispatch({
                          type: GET_ERRORS,
                          payload: err.message
                        }))}
                      );
                
                      }


            }
            else
            {

              axios
                  .post("http://localhost:5000/api/user-data/addToCart", productCart)
                  .then((res) => {
                       
                         localStorage.setItem('addCart',JSON.stringify(res.data))
                          console.log('ProductId API', productCart.productId)
                        var currId = JSON.parse(localStorage.getItem('addCart')).data.productId
                        console.log(currId, 'abhi ki id') 
            
                        var prod = JSON.parse(localStorage.getItem('Products'));
                          getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
                          console.log('No1:--GetCartProdLocalStorage------',getCartProdLocalStorage)
                        var filterObj = prod.filter((e) => {
                          return e._id === productCart.productId
                        });
                        console.log('No.8:--OurArray-----',arr)
                    console.log('NEW DATA-----' ,currId)
                    console.log('filterObject[0]-----',filterObj[0])
                    var newProd = {
                      filterProduct: filterObj[0],
                      cartSchemaId:  currId
                    }
                    arr.push(newProd)
                    localStorage.setItem('CartProduct', JSON.stringify(arr))


                  }) 
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
          
            }


            
    
         
            
  //                       }) 
  //     .catch(err =>
  //       {
  //       console.log('Cart reducer err---- ', err.message);
  //               return(
  //       dispatch({
  //         type: GET_ERRORS,
  //         payload: err.message
  //       }))}
  //     );
  // };

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

  export const proceed = (newProceed) => dispatch => {
    axios
      .post('http://localhost:5000/api/products/proceed',newProceed)
      .then(res => {
        dispatch({
          type: PROCEED_PRODUCT,
          payload: res.data
        })
        console.log('proceed ka data ', res.data)
      })
      .catch(err => {
        console.log('proceedsy error......., ', err.message)
      })
  }


 