const User = require('../../models/user');
const Product = require('../../models/product');
const Proceed = require('../../models/proceed');
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

        const { name, description,price } = req.body;
        let newProduct = new Product({
            name,
            description,
            price
        });

        newProduct.save().then((result)=>{res.status(200).json({Product:result})})
        .catch((err) => {console.log('Product save err---------:',err)})

    },
    updateProduct(req, res){

        const { id } = req.params;
        const { name, description, price } = req.body;
        Product.findById(id).exec((err, product)=>{
            product.name=name;
            product.description=description;
            product.price=price;
            product.save().then(()=>{
                res.status(200).json({product})
            })
        })
        console.log('ponka')
    },
    deleteProduct(req, res){

        const { id } = req.params;
        Product.deleteOne({_id:id}).exec((err, product)=>{
            if(err){
                console.log('Delete Product err---------:',err);
            }
            else
            res.status(200).json({seccess:true,product});
        })

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
    }
}

