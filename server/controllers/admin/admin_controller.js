const User = require('../../models/user');
const Product = require('../../models/product');
const Proceed = require('../../models/proceed');
const PendingProduct = require('../../models/admin/pending')
//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
filename: function(req, file, callback) {
callback(null, Date.now() + file.originalname);
}
});
const imageFilter = function(req, file, cb) {
// accept image files only
if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
return cb(new Error("Only image files are accepted!"), false);
}
cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
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
    createProduct(req, res){

        // const { name, description,price,stock } = req.body;
        console.log('rquest body',req.body)
        // console.log('/add called====',req.body)
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
          if (err) {
            res.json(err.message);
          }
          req.body.image = result.secure_url;
          // add image's public_id to image object
          req.body.imageId = result.public_id;
        // let newProduct = new Product({
        //     name,
        //     description,
        //     price,
        //     stock,
        //     // title,
        //     image,
        //     imageId,

        // });
        Product.create(req.body, function(err, result) {
            if (err) {
              res.json(err.message);
              return res.redirect("/");
            }
            console.log('res send',result)
            res.status(200).json({Product:result})
            // res.json(image)
          });
        })

        // newProduct.img.data =  fs.readFileSync(req.body.imgPath);
        // newProduct.img.contentType = 'image/png'

        // newProduct.save().then((result)=>{res.status(200).json({Product:result})})
        // .catch((err) => {console.log('Product save err---------:',err)})

    },

    updateProduct(req, res){

        // const { id } = req.params;
        const { name, id, price,stock } = req.body;
        console.log(req.body)
        Product.findById(id).exec((err, product)=>{
            product.name=name;
            product.stock=stock;
            product.price=price;
            product.save().then(()=>{
                res.status(200).json({product})
            })
        })

    },
    deleteProduct(req, res){

        const { key, imageId } = req.body;
        console.log(key)
        Product.findByIdAndDelete(key)
        .then(cart => {cart.remove().then(() => {
            cloudinary.v2.uploader.destroy(imageId, function(error,result) {
                if(error){
                    console.log('Destroy image=======',error)
                } 
                console.log('Destroy image=======',result)
                res.json({ success: true,cart })
            });
        })})
        .catch(err => res.status(404).json({ success: false }));
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
        .then(data => res.status(200).json({data}))
        .catch(err => err.json)
    },
    
    getStock(req,res){
        Product.find().then(product=>{
            res.status(200).json({success:true,product})
        }).catch(err=>{
            res.status(400).json({success:false,err})
        })
    },
    cartOwner(req,res){
        const {fname,lname,city,appartment,address,number,timeStamp,cartProducts,} = req.body
        console.log(req.body)
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

        let newProceed = new Proceed({
            fname,
            lname,
            city,
            address,
            appartment,
            number,
            timeStamp,
            cartProducts: crtProduct
              
        });

        console.log('Anday wala burger',crtProduct)
        newProceed.save().then(data=>{
            console.log('Anday wala burger',data)
            res.status(200).json({success:true, data})
        })
        .catch(err => {
            console.log('ksadkjhsakj-------',err.message)
            res.status(404).json({success:false,err})
        });
    },
}

