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
        const { productId, quantity } = req.body;
        // const { id } = req.params;
        console.log('addtocart-----------:', req.body.productId )

        let productInCart = new UserCart({
            
            productId,
            quantity
            
        });
                
            productInCart.save().then(data=>{
            // Product.findByIdAndUpdate(productId,{ $inc: { stock: -1 } }).then((product)=>{
            //     currentProduct=product
            //     console.log('ProductUpdate success: ',product)
            // })     
            res.status(200).json({success:true, data})
        })
                .catch(err => {
                    console.log('AddToCart Save Err--------',err.message)
                    res.json(err);
            
            });

    },
    viewCart(req, res){
        UserCart.find().exec((err, products)=>{
            if(err){
                console.log('View cart err------:', err.message)
            }
            else{
                // const  =products.productId
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

    //Need to be fixed........
    removeFromCart(req, res){
        // const { id } = req.params;
        const { key,productId,quantity } = req.body;
        console.log('remove cart=====',req.body);

        UserCart.findOneAndDelete(key)
        .then(cart => {cart.remove()
                      .then(() =>{
                        // Product.findById(productId).then((res)=>{
                        //     res.stock=res.stock+quantity
                        //     res.save().then(success=>console.log('deletecart added stock===',success))
                        // })
                        res.json({ success: true,cart })
                        })
                    })
        .catch(err => {res.status(404).json({ success: false, err })
    console.log(err.message)
    });
    
        // UserCart.findByIdAndDelete(key).exec((err, data)=>{
        //     if(err) console.log("removeFromCart err-----------:",err.message)
        //     else
        //     res.status(200).json({success:true,data})
        // });

        // UserCart.update(
        //     {$pull: {product: id}},
        //     {safe: true, upsert: true},
        //     function(err, doc) {
        //         if(err){
        //         console.log(err);
        //         }else{
        //         //do stuff
        //         }
        //     });

        // find by document id and update and pop or remove item in array
        // users.findByIdAndUpdate(userId,
        //     {$pull: {product: id}},
        //     {safe: true, upsert: true},
        //     function(err, doc) {
        //         if(err){
        //         console.log(err);
        //         }else{
        //         //do stuff
        //         }
        //     });


        //   UserCart.save().then((data)=> {res.status(200).json({
        //       success:true,
        //       data
        //     })}).catch(err=>console.log(err))

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
            if(!result){
                console.log('No cart available====')
                return 0;
                
            }
           else if(result){
            console.log('reaslt.orders====>',result.orders)
            avilableCarts=result
           }
        })

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
            cartProducts: crtProduct
              
        });

        newProceed.save().then(async (data)=>{
            if(block){
                let cartId;
                if(block<6&&block>0){
                    console.log('Cart 1 Selected=====')
                     cartId= await avilableCarts[0]._id
                    
                }
                else if(block<14&&block>5){
                    //cart 2
                    console.log('Cart 2 Selected=====')
                     cartId= await avilableCarts[1]._id
                    
                }
                else if(block<21&&block>13){
                    //cart 3
                    console.log('Cart 3 Selected=====')
                     cartId= await avilableCarts[2]._id
                   
                }
                NewCart.findByIdAndUpdate(cartId,{$push:{orders:data}}).exec((err, result)=>{
                    if(err){
                        console.log('err adminCart update se===',err.message)
                        return res.status(400).json(err.message)
                     }
                    res.status(200).json({success:true,result})

                })

         }  

                cartProducts.forEach( (item,i)=>{
                    console.log('Index dekho===',i,data)
                   Product.findByIdAndUpdate(item.filterProduct._id,{ $inc: { stock: -item.quantity } }).then((product)=>{
                       currentProduct=product
                        console.log('ProductUpdate success: ',product)
                        if(cartProducts[i]===cartProducts[cartProducts.length-1]){ 
                           console.log('Anday wala burger1',data,i)
                        //    res.status(200).json({success:true, data})
                        }
                    })
                    .catch(err => {
                            console.log('Stock Change From Proceed Error-------',err.message)
                            res.status(400).json(err.message)
                        }); 
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
        // console.log('Login: ',req)
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
                wishList.save().then(res => res.send()).catch(err => res.send(err))

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
        WishList.findById(key) .exec((err, users) => {
            if(err){
                console.log('getAdminUsers err-----------:',err);
            }
            res.status(200).send(users);
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