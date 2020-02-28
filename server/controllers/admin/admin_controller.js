const User = require('../../models/user');
const Product = require('../../models/product');
const Proceed = require('../../models/proceed');
const CartOwner = require('../../models/cartOwner');
const Cart =  require('../../models/cartOwner');
const PendingProduct = require('../../models/admin/pending')
const ProductSpecs = require('../../models/categories');
const NewCart = require('../../models/admin/newCart');
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
    createProduct(req, res){

        const { name, description,price,stock,image,cartsStock,category } = req.body;

        let createProduct = new Product({
            name,
            price,
            description,
            image,
            stock,
            cartStock:cartsStock,
            category
        })

        createProduct.save()
        .then(data => {
            res.status(200).send(data)
            console.log(data)
        })
        .catch(err => {
            res.status(400).send(err.message)
        })
        // rehan ka kam yahan sy previous wala


        // req.body.image=[]
        // req.body.imageId=[]
        // console.log('rquest body',req.body)
        // console.log('/add called====', req.files)
        // for(let i=0;i<req.files.length;i++){
        // console.log('loop----',i,'--')
        //    await cloudinary.v2.uploader.upload(req.files[i].path, function(err, result) {
        //       if (err) {
        //         res.json(err.message);
        //       }
              
        //       req.body.image.push(result.secure_url);
        //       console.log('Secure URL=====-=-=-=-',result.secure_url,[i],req.body.image)
        //       // add image's public_id to image object
        //       req.body.imageId.push(result.public_id);
        //     })
            
        // }
        // console.log('After for loop=-=-=-=-')
        //     Product.create(req.body, function(err, result) {
        //         if (err) {
        //           res.json(err.message);
        //           return res.redirect("/");
        //         }
        //         console.log('res send',result)
        //         res.status(200).json({Product:result})
        //         // res.json(image)
        //       });

       

    },

    updateProduct(req, res,next){

        // const { id } = req.params;
        const { name, id, price,stock,category,cartStock,image } = req.body;
        // log(req.body)
        let updateProduct = {
            name, price,stock,category,cartStock,image,stock
        }
        // console.log(req.body)

        Product.findByIdAndUpdate(id,{stock: stock})
        .then(data => {
            console.log(res);
            res.status(200).json(data)
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
    deleteProduct(req, res){

        const { id } = req.body;

        Product.findByIdAndDelete(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json(data)
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
        .catch(err => err.json)
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

