import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  GET_PRODUCTS,
  CART_PRODUCTS,
  ADD_CART,
  PROCEED_PRODUCT,
  UPDATE_PRODUCT,
} from "./types";

var arr=JSON.parse(localStorage.getItem('CartProduct')) || [];
var getCartProdLocalStorage=[]

 export const getProducts = (caller) => dispatch => {
  console.log(`GEtPRoducts called by ${caller}=====`)
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
        console.log("Products success", err.message)}
      );
  };

 export const addToCart = (productCart) => dispatch => {
   
            console.log('No.8:--OurArray-----',arr)
            console.log('LocalStorageCheck----',JSON.parse(localStorage.getItem('CartProduct')))
        // Checking data (available || not) in Storage 
            if( JSON.parse(localStorage.getItem('CartProduct'))!=null && JSON.parse(localStorage.getItem('CartProduct')).length!=0){
              
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
                                console.log('ProductId quantity', res.data)
                              var currId = JSON.parse(localStorage.getItem('addCart')).data
                              console.log(currId, 'abhi ki id') 
                  
                              var prod = JSON.parse(localStorage.getItem('Products'));
                                console.log('No1:--GetCartProdLocalStorage------',getCartProdLocalStorage)
                              var filterObj = prod.filter((e) => {
                                return e._id === productCart.productId
                              });
                              console.log('No.8:--IfOurArray-----',arr)


                        var newProd = {
                          filterProduct: filterObj[0],
                          cartSchemaId:   currId._id,
                          quantity:      currId.quantity,
                        }
                        arr.push(newProd)
                          localStorage.setItem('CartProduct', JSON.stringify(arr))
                        dispatch({
                          type: CART_PRODUCTS,
                          payload: arr
                        })
                      }) 
                      .catch(err =>
                        {
                        console.log('Cart reducer err---- ', err.message);
                                return(
                        dispatch({
                          type: GET_ERRORS,
                          payload: err.message
                        })
                        )}
                      );
                
                      }
    //                   else{
    //                     var newArr=[{filterProduct:result.filterProduct,cartSchemaId:result.cartSchemaId,quantity:result.quantity+1}]
    //                     const update = {
    //                       qnty: newArr
    //                     }
    //                     console.log('Api Call se pehle newArr----',result,newArr,arr)
    //                     axios.put("http://localhost:5000/api/user-data/updateCart", update )
    //                     .then(res => {
    //                         console.log('Update cart res----',res.data)
    //                         var matchItem = arr.findIndex(i => i._id == result.cartSchemaId );
    //                          arr.splice(matchItem,1,newArr[0])
    //                          console.log('Api Call k bd newArr----',newArr,arr)
    //  //need to be update .... // localStorage.setItem('CartProduct',JSON.stringify(arr))
    //                         // console.log(this.state.cartProducts)
    //                         // this.setState({tick:'inline',loader:'none'})
                       
    //                     })
                
    //                     .catch(err => {
    //                         console.log('cart update ka error.. >',err.message)
    //                     })
    //                   }

            }
            else
            {

              axios
                  .post("http://localhost:5000/api/user-data/addToCart", productCart)
                  .then((res) => {
                       
                         localStorage.setItem('addCart',JSON.stringify(res.data))
                          console.log('ProductId API', productCart.productId)
                        var currId = JSON.parse(localStorage.getItem('addCart')).data
                        console.log(currId, 'abhi ki id') 
            
                        var prod = JSON.parse(localStorage.getItem('Products'));
                          getCartProdLocalStorage = JSON.parse(localStorage.getItem('CartProduct'))
                          console.log('No1:--GetCartProdLocalStorage------',getCartProdLocalStorage)
                        var filterObj = prod.filter((e) => {
                          return e._id === productCart.productId
                        });
                        console.log('No.8:--Else1-OurArray-----',arr)
                    console.log('NEW DATA-----' ,currId)
                    console.log('filterObject[0]-----',filterObj[0])
                    var newProd = {
                      filterProduct: filterObj[0],
                      // matchId: currId._id,
                      cartSchemaId:  currId._id,
                      quantity: productCart.quantity
                    }
                    // arr=[]
                     arr.length=0;
                    console.log('No.8:--Else2-OurArray-----',arr)
                    arr.push(newProd)
                    localStorage.setItem('CartProduct', JSON.stringify(arr))

                    dispatch({
                      type: CART_PRODUCTS,
                      payload: arr
                    })

                  }) 
                  .catch(err =>
                    {
                    console.log('Cart reducer err---- ', err);
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
                      
                          // dispatch({
                          //     type: CART_PRODUCTS,
                          //     payload: res.data
                          //   })
                       
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

  
  export const addProduct = (newPoduct) => dispatch => {
    axios
      .post('http://localhost:5000/api/createProducts',newPoduct)
      .then(res => {
        dispatch(getProducts('Add Products'));
        console.log('create product admin sy ka data ', res.data)
      })
      .catch(err => {
        console.log('create product error......., ', err.message)
      })
  }

  export const updateProduct = (updatePoduct) => dispatch => {
    axios
      .put('http://localhost:5000/api/updateProducts',updatePoduct)
      .then(res => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: res.data
        })
        console.log('Update product admin sy ka data ', res.data)
      })
      .catch(err => {
        console.log('Update product error......., ', err.message)
      })
  }

  export const sendToCartOwner = (orderData) => dispatch => {
    axios
      .post('http://localhost:5000/api/cartOwner/confirmOrder',orderData)
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
 