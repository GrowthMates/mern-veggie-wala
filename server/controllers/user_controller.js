const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserCart = require('../models/userCart');
const Product = require('../models/product');
const User = require('../models/user');
const Proceed = require('../models/proceed');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
// var ip = require("ip");
 var currentProduct=undefined
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
            Product.findByIdAndUpdate(productId,{ $inc: { stock: -1 } }).then((product)=>{
                currentProduct=product
                console.log('ProductUpdate success: ',product)
            })     
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
                    return (
                         Product.findById(filterProduct._id).then((product)=>{
                        currentProduct=product
                        console.log('UpdateCart Change Stock success:===== ',product)
                        product.stock=product.stock+newStock
                        product.save().then((success)=>{
                        console.log('PeoductNew Stock======',product.stock)
                        productCart.quantity = qnty[index].quantity
                        productCart.save().then(()=>{
    
                        finalArr.push(productCart);
                        console.log('If FinalArray====',finalArr,index,qnty.length-1)
                        if(finalArr.length==qnty.length){
                            res.status(200).json({finalArr})
                        }
                    })
                    });
                    })    )
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
        console.log(req.body);

        UserCart.findOneAndDelete(key)
        .then(cart => {cart.remove()
                      .then(() =>{
                        Product.findById(productId).then((res)=>{
                            res.stock=res.stock+quantity
                            res.save().then(success=>console.log('deletecart added stock===',success))
                        })
                        res.json({ success: true,cart })
                        })
                    })
        .catch(err => {res.status(404).json({ success: false })
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

    proceed(req, res){
        const {fname,lname,city,appartment,address,number,timeStamp,cartProducts,quantity} = req.body
        console.log(req.body)

        let newProceed = new Proceed({
            fname,
            lname,
            city,
            address,
            appartment,
            number,
            timeStamp,
            quantity: cartProducts.quantity,
            price: cartProducts.filterProduct.price,
            productName: cartProducts.filterProduct.name,
           
            
        });

        newProceed.save().then(data=>{
            res.status(200).json({success:true, data})
        })
        .catch(err => {
            res.status(404).json({success:false,err})
        });


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
    logout(req, res){

    }
}