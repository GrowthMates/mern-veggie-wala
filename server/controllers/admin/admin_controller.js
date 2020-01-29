const User = require('../../models/user');
const Product = require('../../models/product');
const Proceed = require('../../models/proceed');
const CartOwner = require('../../models/cartOwner');
const PendingProduct = require('../../models/admin/pending')

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

        const { name, description,price,stock } = req.body;
        console.log('rquest body',req.body)
        let newProduct = new Product({
            name,
            description,
            price,
            stock,

        });
        // newProduct.img.data =  fs.readFileSync(req.body.imgPath);
        // newProduct.img.contentType = 'image/png'

        newProduct.save().then((result)=>{res.status(200).json({Product:result})})
        .catch((err) => {console.log('errors add product sy ...', err)})

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

        const { key } = req.body;
        console.log(key)
        Product.findByIdAndDelete(key)
        .then(cart => {cart.remove().then(() => res.json({ success: true,cart }))})
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
        .then(data => res.status(200).json({data}))
        .catch(err => err.json)
    },

    delAfterApproved(req,res){
        
        const { key } = req.body;
        console.log(req.body)
        Proceed.findByIdAndDelete(key)
        .then(cart => {cart.remove().then(() => res.json({ success: true,cart }))})
        .catch(err => res.status(404).json({ success: false }));
    },

    
}

