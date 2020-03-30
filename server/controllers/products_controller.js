const Product = require('../models/product');
const mongoose = require('mongoose')

module.exports = {
    
    readAllProducts(req, res){
        // var MySchema = mongoose.model('Product')
        // console.log('Schema',MySchema)
        // Product.update({"name": "erer", "cartStock.cart" : "cart 1" } ,
        // {$inc : {"cartStock.$.stock" : 12} },
        // function(data) {console.log('hello world',data)});
        // Product.findOneAndUpdate({_id: "5e4e8832c68ebc040467d640", 'cartStock.cart': "cart 3"},{$inc:{'cartStock.stock':2}})
        // .then((blogPost) => console.log(blogPost.cartStock))


        Product.find({}).exec((err, products)=>{
            if(err){
                console.log('All products err--------',err);
                return res.status(400).json({ productsNotFound: "No products Available" });
            }
            // console.log('Products Find====',products.reverse())
            res.status(200).send(products.reverse());
        })

    },
    readProduct(req, res){

        const { id } = req.params;
        Product.findById(id).exec((err, product) => {
            if(err){
                console.log('Product err----------',err);
                return res.status(400).json({ productNotFound: "Product Not Found" });

            }
            res.status(200).send({product});
        })

    }
}