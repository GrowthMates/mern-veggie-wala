const User = require('../../models/user');
const Product = require('../../models/product');
const Proceed = require('../../models/proceed');
const CartOwner = require('../../models/cartOwner');
const Cart =  require('../../models/cartOwner');
const PendingProduct = require('../../models/admin/pending')
const ProductSpecs = require('../../models/categories');
const NewCart = require('../../models/admin/newCart');
const validateLoginInput = require('../../validation/login');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//IMAGE UPLOAD CONFIGURATION
// const multer = require("multer");
// const storage = multer.diskStorage({
// filename: function(req, file, callback) {
// callback(null, Date.now() + file.originalname);
// }
// });
// const imageFilter = function(req, file, cb) {
// // accept image files only
// if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
// return cb(new Error("Only image files are accepted!"), false);
// }
// cb(null, true);
// };
// const upload = multer({ storage: storage, fileFilter: imageFilter });
const cloudinary = require("cloudinary");
cloudinary.config({
cloud_name: "dbevearco", //ENTER YOUR CLOUDINARY NAME
api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
api_secret: process.env.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});

module.exports = {

    login(req, res){
        console.log('Admin Login: ',req.body)
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
           
            const email = req.body.email;
            const password = req.body.password;

            // Checking if email is correct
            if (email!==process.env.ADMIN_EMAIL) {
                return res.status(404).json({ emailnotfound: "Email or Password Incorrect " });
            }

            // Find user by email
            User.findOne({ email:"saeedrehan3@gmail.com" }).then(user => {
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
                        expiresIn: 86400 // 1 day in seconds
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
                    .json({ passwordincorrect: "Email or Password incorrect" });
                }
                });
            });
    },


    
    getAdminUsers(req, res){

        User.findById().exec((err, users) => {
            if(err){
                console.log('getAdminUsers err-----------:',err);
            }
            res.status(200).send(users);
        });
    },
    
    createProductSpecs(req, res){
        const { id, category, tag } = req.body
        ProductSpecs.findById(id).exec((err,result)=>{
            if(result){
                console.log('create productSpec====')
                res.json({specsError:'This specs already available'})
                
            }
            else if(!result){
                ProductSpecs.create(res.body, function(err, result){
                        if(err){
                            console.log('create product spec error====',err.message)
                        }
                        console.log('create product spec success====',result)
                        res.status(200).json({success:true,specs:result})
                    })
        }
    })
    },
    
// add product........
   async createProduct(req, res){

        const { name, description,price,stock,image,cartStock,category,alarmingStock } = req.body;
        // cartStock.forEach(e=>{
            // console.log(e.stock)
            
            // })
            for(let i=0;i<cartStock.length;i++){
                cartStock[i] = JSON.parse(cartStock[i])
            }
        console.log(cartStock[0].stock)
        //Arslan Ka Kaam image without cloudinary (FileReader)

        // let createProduct = new Product({
        //     name,
        //     price,
        //     description,
        //     image,
        //     stock,
        //     cartStock:cartsStock,
        //     category,
        //     status: 'dispatch',
        //     alarmingStock
        // })

        // createProduct.save()
        // .then(data => {
        //     res.status(200).send(data)
        //     console.log(data)
        // })
        // .catch(err => {
        //     res.status(400).send(err.message)
        // })

        // rehan ka kam yahan sy previous wala

        req.body.images=[]
        req.body.imageId=[]
        req.body.status='dispatch'
        // res.body.cartStock=cartsStock
        console.log('rquest body',req.body)
        console.log('/add called====', req.files)
        for(let i=0;i<req.files.length;i++){
        console.log('loop----',i,'--')
           await cloudinary.v2.uploader.upload(req.files[i].path, function(err, result) {
              if (err) {
                res.json(err.message);
              }
              
              req.body.images.push({image:result.secure_url,imageId:result.public_id});
              console.log('Secure URL=====-=-=-=-',result.secure_url,[i],req.body.images)
              // add image's public_id to image object
            //   req.body.imageId.push(result.public_id);
            })
            
        }
        console.log('After for loop=-=-=-=-')
            Product.create(req.body, function(err, result) {
                if (err) {
                    console.log(err.message)
                    return res.json(err.message);
                //   return res.redirect("/");
                }
                console.log('res send',result)
                res.status(200).json(result)
                // res.json(image)
              });

       

    },

    updateProduct(req, res,next){

        // const { id } = req.params;
        const { name, id, price,stock,category,cartStock,images } = req.body;
        // console.log('edit body---',req.body)
        let updateProduct = {
            name, price,stock,category,cartStock,images
        }
        console.log(updateProduct)

        Product.findByIdAndUpdate(id,updateProduct)
        .then(data => {
            console.log('result of update prodcut ka',data);
            res.status(200).send(updateProduct)
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).json(err)

        })

        // .exec((err,data) => {
            
        //     if(err){
        //         console.log(err)
        //         res.status(200).send(data)
                
        //     }
        //     else if(data){
        //         console.log(data)
        //         res.status(200).json(data)
        //     }
        // })
        // .then(data => {
        //     res.status(200).json({data})
        //     next()
        //     log('update product ka succes',data)
        // })
        // .catch(err => {
        //     res.status(400).send(err.message)
        //     log('update product ka error',err.message)

        // })
        //     product.name=name;
        //     product.stock=stock;
        //     product.price=price;
        //     product.save().then(()=>{
        //         res.status(200).json({product})
        //     })
        // })

    },

    deleteImages(req, res){
        const {imageId,id} = req.body;
        console.log('Delete image----',imageId,id)
        cloudinary.v2.uploader.destroy(imageId, function(error,result) {
                    if(error){
                        console.log('Destroy image Error=======',error)
                        return res.status(400).send(error)
                    } 
                    else{
                        console.log('Destroy image=======',result)
                        Product.findById(id)
                        .then((data)=>{
                            console.log('Data found in Database----',data)
                            if(!data){
                                return res.status(422).send('Product Not Found')
                            }
                          let imagesIndex = data.images.findIndex((e) => e.imageId===imageId)
                            data.images.splice(imagesIndex, 1)
                            data.save().then(result => {
                                console.log('Image Deletion From Database done----',result)
                                res.status(200).send({ success: true })
                            }).catch(err=>console.log('Database Image Error----',err))
                        })
                        .catch(err => {
                            console.log('Data found Error in Database----',err)    
                        })
                    }
                });
    },

    deleteProduct(req, res){

        const { id } = req.body;
console.log(id)
        Product.findByIdAndDelete(id)
        .then(data => {
            console.log('response delete sy',data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json(err)
        })
        // purana rehan ka kaam cloudnry k lye
        // const { id, imageId } = req.body;
        // console.log(key)
        // Product.findByIdAndDelete(key)
        // .then(cart => {cart.remove().then(() => {
        //     cloudinary.v2.uploader.destroy(imageId, function(error,result) {
        //         if(error){
        //             console.log('Destroy image=======',error)
        //         } 
        //         console.log('Destroy image=======',result)
        //         res.json({ success: true,cart })
        //     });
        // })})
        // .catch(err => res.status(404).json({ success: false }));
    },

    pendingProduct(req, res) {
        const {name, description, quantity,user,price} = req.body;

        PendingProduct.find().exec((err,product) => {
            if(err){
             res.status(400).json({success:false,err})
            }
            else
            res.status(200).json({success:true,product})
        })

    },

    bookedProduct(req,res){
        
        Proceed.find()
        .then(data => {
            res.status(200).send(data.reverse())
        console.log('booked orders ka data',data)
    })
        .catch(err => err.json)
    },
    
    getStock(req,res){
        Product.find().then(product=>{
            res.status(200).json({success:true,product})
        }).catch(err=>{
            res.status(400).json({success:false,err})
        })
    },

    // createCart(req, res){
    //     const {products} = req.body
    //     Cart.find().exec((err, result)=>{
    //         if(!result){

    //             let cart = new Cart({
    //                 products,
    //             })
    //             cart.save().then(data=>{

    //             })
    //         }
    //         else if(result){
                
    //         }
    //     })
    // },



    cartOwner(req,res){
        const {fname,lname,city,appartment,address,number,timeStamp,cartProducts,cartOwnerName} = req.body
        console.log(req.body,'cart owners')
        
        var crtProduct=[];
        // var productData=cartProducts.filterProduct
        cartProducts.forEach(i => {
            crtProduct.push({
                name:i.name,
                price:i.price,
                stock:i.stock,
                productId:i._id,
                quantity:i.quantity})
            
        })

        let cartOwnerReciept = new CartOwner({
            fname,
            lname,
            city,
            address,
            appartment,
            number,
            timeStamp,
            cartProducts: crtProduct,
            cartOwnerName,
              
        });

        console.log('Anday wala burger',cartOwnerReciept)
        cartOwnerReciept.save().then(data=>{
            console.log('Anday wala burger',data)
            res.status(200).json({success:true, data})
        })
        .catch(err => {
            console.log('ksadkjhsakj-------',err.message)
            res.status(404).json({success:false,err})
        });
    },

    cartOwnerReciept(req,res){
        
        CartOwner.find()
        .then(data => res.status(200).send(data.reverse()))
        .catch(err => res.status(400).send(err.message))
    },

    getOrders(req,res){

        NewCart.find()
        .then(data => {res.status(200).send(data)})
        .catch(err => {res.status(200).send(err.message)})
    },

    delAfterApproved(req,res){
        
        const { key } = req.body;
        console.log(req.body)
        Proceed.findByIdAndDelete(key)
        .then(cart => {cart.remove().then(() => res.json({ success: true,cart }))})
        .catch(err => res.status(404).json({ success: false }));
    },

    getCartOwners(req,res){

        NewCart.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(400).send(err.message)
        })

    }

    
}

