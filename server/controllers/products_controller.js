const Product = require('../models/product');

module.exports = {
    
    readAllProducts(req, res){
        // let product = new Product
    // console.log(product)
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