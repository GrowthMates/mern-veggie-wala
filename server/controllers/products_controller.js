const Product = require('../models/product');
const NewCart = require('../models/admin/newCart')

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

    },

    updateStatus(req,res){
        const { index,id,orderStatus } = req.body;
        console.log(orderStatus);       

        let updateStatus = {
            status: orderStatus
        }
            NewCart.findById(id)
            .then(data => {
                console.log(data.orders[index].status=orderStatus)
                // res.status(200).send(orderStatus)

                data.orders[index].status= orderStatus;
                // console.log(data)
                data.markModified('orders')
                data.save()
                .then(fData => {
                    console.log('succes',fData);
                    res.status(200).send(fData.orders[index])
                })
                .catch(err => {
                    console.log('error status update ka pehla wala',err.message);
                    res.status(400).send(err.message)
                })
            })
            .catch(err => {
                console.log('error update staus',err.message)
            })
                // product.orders[index].status=orderStatus;
                // console.log(product)
                // product.save().then((data)=>{
                //     console.log(data,product)
                //     res.status(200).json({product})
                // })
            
    
      
        // const { name, id, price,stock } = req.body;
        // console.log(req.body)
    },

}