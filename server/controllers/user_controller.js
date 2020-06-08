const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserCart = require('../models/userCart');
const Product = require('../models/product');
const User = require('../models/user');
const Carts = require('../models/carts');
const WishList = require('../models/wishList');
const Proceed = require('../models/proceed');
const NewCart = require('../models/admin/newCart');
const validateRegisterInput = require('../validation/register');
const validateInformationInput = require('../validation/information');
const validateLoginInput = require('../validation/login');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
// var ip = require("ip");
var currentProduct=undefined
var avilableCarts = undefined
module.exports = {

    readUserData(req, res){

    },
    //Need to be fixed........
    addToCart(req, res){
        const { productId, quantity, userId, priceTotal } = req.body;
        // const { id } = req.params;
        console.log('addtocart-----------:', req.body.productId )
        if(!userId){
            return res.status(400).send('Not Signed In')
        }
   
            UserCart.findById(userId).exec((err, result)=>{
                let currproduct=[]
                if(!result){
                console.log('Naya usercart===')
                currproduct.unshift({product:productId,quantity})
                let productInCart = new UserCart({
                    
                    _id:userId,
                    productsList:currproduct,
                    cartTotalPrice:priceTotal
                    // quantity
                    
                });
                        
                    productInCart.save().then(products=>{   
                console.log('Naya usercart succes===',products)
                UserCart.findById(userId).populate('productsList.product').exec((err, result)=>{
                    if(err){
                        console.log('Add cart error==',err)
                        return res.status(400).json(err)
                    }
                    try{
                        console.log('populated---',result)
                        return res.status(200).json({success:true, products})
                    }
                    catch(error){
                        console.log('Add cart error==',error)
                        return res.status(400).json(error)
                    }
                })
            })
                        .catch(err => {
                            console.log('AddToCart Save Err--------',err.message)
                            res.json(err);
                    
                    });
            }
            else if(result){
                currproduct=result.productsList;
                console.log('Puarana usercart===')
                // currproduct.unshift(productId);
                let price=result.cartTotalPrice+priceTotal
                let filtered = currproduct.filter(e=>{return e.product._id==productId})
                if(filtered.length!=0){
                    console.log('Same agya===',filtered)
                    try {
                       return res.status(200).json({success:true, products:''})
                    } 
                    catch (error) {
                       return res.status(400).json(error)
                    }
                }
                result.updateOne({$push:{productsList:{product:productId,quantity}},cartTotalPrice:price},{ new: true }).exec((err,products)=>{
                    if(err){
                        console.log('Update cart error==',err)
                        return res.status(400).json(err)
                    }
                    try{
                        console.log('Update products===',products)
                        res.status(200).json({success:true, products:''})
                    }
                    catch(error){
                        console.log('Update cart error==',error)
                        return res.status(400).json(error)
                    }
                })
                // .catch(err=>{
                //     console.log('Update error===',err.message)
                // })

            }
        })
            // */

    },
    viewCart(req, res){
        const {id} = req.params
        console.log(id)
        UserCart.findById(id).populate('productsList.product').exec((err, products)=>{
            if(err){
                console.log('View cart err------:', err)
            }
            else {
                // const  =products.productId
                console.log('User cart products====>',products)
                res.status(200).json({success:true, products})
            }
        })
        

    },

    updateCart(req, res){
        var {qnty}=req.body
        console.log('Update',req.body)
        var finalArr=[]
        qnty.forEach((element,index )=> {
            
            const { cartSchemaId,filterProduct, quantity } = element
           
            UserCart.findById(cartSchemaId).exec((err, productCart)=>{
                if(err){
                    console.log('Err usercart',err.message)
                }
               else{ 
                   console.log("Product Cart Quantity------",productCart)
                   if(productCart.quantity!=qnty[index].quantity){
                    var newStock = productCart.quantity-qnty[index].quantity
                    console.log('New Stock=====',newStock)
                    // return (
                        //  Product.findById(filterProduct._id).then((product)=>{
                        // currentProduct=product
                        // console.log('UpdateCart Change Stock success:===== ',product)
                        // product.stock=product.stock+newStock
                        // product.save().then((success)=>{
                        // console.log('PeoductNew Stock======',product.stock)
                        productCart.quantity = qnty[index].quantity
                        productCart.save().then(()=>{
    
                        finalArr.push(productCart);
                        console.log('If FinalArray====',finalArr,index,qnty.length-1)
                        if(finalArr.length==qnty.length){
                            res.status(200).json({finalArr})
                        }
                    })
                    // });
                    // })    
                    // )
                    }
                    else{
                        console.log('Else New Stock=====',productCart.quantity,quantity)
                        productCart.quantity = quantity
                        productCart.save().then(()=>{
    
                        finalArr.push(productCart)
                        if(finalArr.length==qnty.length){
                            console.log('Else FinalArray====',finalArr,index,qnty.length-1)
                            res.status(200).json({finalArr})
                        }
                    })
                    }
                  }
            })
        });
        

    },
    removeCart(req,res){
        const {id} = req.body
        console.log('cart deleted id---',id)
        UserCart.findByIdAndDelete(id)
        .then(cart => {
            
               console.log('delete-cart success')
               res.json({ success: true,cart })
             
                                    
                    })
        .catch(err => {res.status(404).json(err)
    console.log(err.message)
    });
    },

    //Need to be fixed........
    removeFromCart(req, res){
        
        const { key,productId,quantity,price } = req.body;
        console.log('remove cart=====',req.body);
      
        UserCart.findOne({_id:key})
        .then(cart => {
            if(cart.productsList.length<=1){
                cart.remove().then(succ=>{
                    console.log('delete success===',succ )
                     res.json({ success: true,cart })
                })
            }
            else{
                let found=cart.productsList.find(e=>{return e.product._id==productId})
                if(found){
                    found.remove();
                    cart.cartTotalPrice-=price
                    cart.save().then(succ=>{
        
                        console.log('delete success===',succ )
                         res.json({ success: true,cart })
    
                    })
                }
                else{
                    res.json({ success: true,cart })
                }
            }
                                    
                    })
        .catch(err => {res.status(404).json({ success: false, err })
    console.log(err.message)
    });
    
  

    },

     async proceed(req, res){
        const {fname,lname,city,appartment,address,number,timeStamp,cartProducts,area,block} = req.body
        const productId = cartProducts.filterProduct
        console.log('proceed request=====',cartProducts,productId)
         // Form validation
         const { errors, isValid } = validateInformationInput(req.body);
         // Check validation
             if (!isValid) {
             return res.status(400).json(errors);
            //  console.log('isValid bad: ',errors);      
             }
       
        var crtProduct=[];
        // var productData=cartProducts.filterProduct
        cartProducts.forEach(i => {
            crtProduct.push({
                name:i.filterProduct.name,
                price:i.filterProduct.price,
                stock:i.filterProduct.stock,
                productId:i.filterProduct._id,
                quantity:i.quantity})
            
        })

       await NewCart.find().exec((err, result)=>{
           if(err){
               return res.status(400).json(err);
           }
            if(!result){
                console.log('No cart available====')
                return res.status(400).json('Sorry your Order cannot be preceed. Kindly inform us the problem');
                
            }
           else if(result){
            console.log('reaslt.orders====>',result.orders)
            avilableCarts=result
            console.log(result)
           }
        })
        Proceed.find().then(prevOrders => {
            let orderNo = Math.round(Math.random()*1000);
            if(prevOrders){
                orderNo = parseInt(prevOrders[prevOrders.length-1].orderNo)+1 || orderNo
            }
            
            let newProceed = new Proceed({
                fname,
                lname,
                city,
                address,
                appartment,
                number,
                area,
                block,
                timeStamp,
                status: 'pending',
                orderNo,
                cartProducts: crtProduct
                  
            });
    
            newProceed.save().then(async (data)=>{
                if(block){
                    let cartId;
                    console.log('Cart 1 Selected=====')
                    cartId= await avilableCarts[0]._id
                    // if(block<6&&block>0){
                        
                    // }
                    // else if(block<14&&block>5){
                    //     //cart 2
                    //     console.log('Cart 2 Selected=====')
                    //      cartId= await avilableCarts[1]._id
                        
                    // }
                    // else if(block<21&&block>13){
                    //     //cart 3
                    //     console.log('Cart 3 Selected=====')
                    //      cartId= await avilableCarts[2]._id
                       
                    // }
                    NewCart.findByIdAndUpdate(cartId,{$push:{orders:data}}).exec((err, result)=>{
                        if(err){
                            console.log('err adminCart update se===',err.message)
                            return res.status(400).json(err.message)
                         }
                        res.status(200).json({success:true,orderNo})
    
                    })
    
             }  
    
                    cartProducts.forEach( (item,i)=>{
                        console.log('Index dekho===',i,data)
                       Product.findById(item.filterProduct._id).then((product)=>{
                           if(product.cartStock[0].stock<item.quantity){
                               return  res.status(400).json('Sorry this product is out of Stock!')
                           }
                           product.cartStock[0].stock-= item.quantity
                           product.stock-=item.quantity
                           currentProduct=product
    
    
                           product.markModified("cartStock")
                           product.save()
                           .then(data => {
                               console.log('stock cart vise succes',data)
                            //    NewCart.findByIdAndUpdate(cartId,{$push:{orders:data}}).exec((err, result)=>{
                            //     if(err){
                            //         console.log('err adminCart update se===',err.message)
                            //         return res.status(400).json(err.message)
                            //      }
                            //     res.status(200).json({success:true,result})
            
                            // })
                            //    res.status(200).send(data)
                           })
                           .catch(err => {
                               console.log('stck cart vse sy',err.message)
                            //    res.status(200).send(data)
    
                           })
                            console.log('ProductUpdate success: ',product)
                            // if(cartProducts[i]===cartProducts[cartProducts.length-1]){ 
                            //    console.log('stock cart vise',data,i)
                            // //    res.status(200).json({success:true, data})
                            // }
                        })
                        .catch(err => {
                                console.log('Stock Change From Proceed Error-------',err.message)
                                // res.status(400).json(err.message)
                            }); 
                   })
                
            })
        })
        // .catch(err => {
        //     console.log('ksadkjhsakj-------',err.message)
        //     res.status(404).json({success:false,err})
        // });


    },
    register(req, res){
         // Form validation
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
            if (!isValid) {
            return res.status(400).json(errors);
            console.log('isValid bad: ',errors);      
            }
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
              return res.status(400).json({ email: "Email already exists" });
            console.log('findOne bad: ');
            
            } else {
              const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                number: req.body.number
              });
        // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err));
                });
              });
            }
          }).catch(err=> console.log(err));
        },

    login(req, res){
        console.log('Login: ',req.body)
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const email = req.body.email;
            const password = req.body.password;
            // Find user by email
            User.findOne({ email }).then(user => {
                // Check if user exists
                if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
                }
            // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log("userID: ",user.id)
        
                    // User matched
                    // Create JWT Payload
                    const payload = {
                    id: user.id,
                    name: user.name,
                    userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                    );
                } else {
                    return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
                });
            });
    },

    delCartProducts(req, res){
        // const { id } = req.params;
        const { cartProducts } = req.body;
        console.log('cart del sy------', cartProducts);

        let cartSchemaId = []
        cartProducts.forEach((i,index) => {

            UserCart.findByIdAndDelete(i.cartSchemaId)
            .then(cart => {cart.remove().then(() => {
                if(index===cartProducts.length-1){

                    console.log('pura ho gya----',cart)
                    res.json({ success: true,cart })
                }
            }
               )})
            .catch(err => res.status(404).json({ success: false }));
            // cartSchemaId.push({
            //     id:i.cartSchemaId
            // })
        })

        console.log('cart ki idssssssssssss..',cartSchemaId)
       
    
      

    },

    wishList(req,res){
         // const { id } = req.params;
         const {userId, productId } = req.body;
         console.log('WishList sy------', req.body);
        
         WishList.findById(userId).exec((err, users) => {
            if(!users){
                let productsId=[]
                productsId.push(productId)
                let wishList = new WishList({
                    _id:userId,
                    products: productsId,
                });
                wishList.save().then(data => res.json(data)).catch(err => res.status(422).json(err))

            }
            else if(users){
                WishList.updateOne({_id:users._id},{$push:{products:productId} })
                .then(data => {
                    res.status(200).json({data})})
                    // console.log(data)
                .catch(err => res.send(err))
              
                // console.log(res)
            }
            

        });


        
 
         
    },

    getWishList(req, res){

        const {key} = req.body
        console.log(key)
        WishList.findById(key).populate('products').exec((err, users) => {
            if(err){
                console.log('getAdminUsers err-----------:',err);
                res.status(400).json(err)
            }
            if(users){
                console.log(users)
                res.status(200).send(users);
            }
            else{
                res.status(200).send(undefined);
                
            }
        });
    },

    delWishList(req, res){

        const {key,productId} = req.body
        console.log(req.body)

        WishList.updateOne({_id:key},{$pull:{products:productId} })
               .then(data => {
                      console.log(data)
                   res.status(200).json({data})
                })
               .catch(err => res.send(err))

        // WishList.findById(key).exec((err, users) => {
        //     if(!users){
               

        //     }
        //     else if(users){
        //        console.log('USer id del k lye---->',users.products)
              
        //        const delFinal = users.products.filter(i => {
        //            return i === productId
        //        })

        //       
        //         console.log('filter sy===>',delFinal[0])
        //     }
            

        // });

    },

    logout(req, res){

    },

    authGoogleCallback(req,res){
        // var token = req.user.token;
        console.log('res.user>>>=====',req.user)
        User.findOne({email:req.user.email}).exec((err,user)=>{
            if(user){
                console.log('Gmail Already Exist',user)
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.redirect("http://localhost:3000?token=" + token);
                        // res.json({
                        // success: true,
                        // token: "Bearer " + token
                        // });
                    }
                    );
            }
            else if(!user){
                const newUser = new User({
                    name: req.user.name,
                    email: req.user.email,
                    password: `#Pael526${req.user.email}q1w2e3zaxscd`,
                  });
            // Hash password before saving in database
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then((user) =>{ 
                            const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            // userType: user.userType
                            };
                    // Sign token
                            jwt.sign(
                            payload,
                            process.env.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                res.redirect("http://localhost:3000?token=" + token);

                                // res.json({
                                // success: true,
                                // token: "Bearer " + token
                                // });
                            }
                            )}
                            )
                        .catch(err => console.log(err));
                    });
                  });
            }
        })
        // res.redirect("http://localhost:3000?token=" + token);

    }
}