const Product = require('../models/product');
const mongoose = require('mongoose')
const NewCart = require('../models/admin/newCart')

module.exports = {
    
    readAllProducts(req, res){
        // var MySchema = mongoose.model('Product')
        // console.log('Schema',MySchema)
        // Product.update({"name": "erer", "cartStock.cart" : "cart 1" } ,
        // {$inc : {"cartStock.$.stock" : 12} },
        // function(data) {console.log('hello world',data)});
        // Product.findOneAndUpdate({_id: "5e4e8832c68ebc040467d640", 'cartStock.cart': "cart 3"},{$inc:{'cartStock.stock':2}})
        // .then((blogPost) => console.log(blogPost.cartStock))


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

    updateProductStatus(req,res){

        const {productStatus,index,id} =req.body;

        Product.findById(id)
        .then(data => {
            console.log('pehla Response andar ka updte status sy',data)

            data.status= productStatus

            data.save()
            .then(fdata => {
                console.log('pehla Response Baahr ka updte status sy',fdata)
                res.status(200).send(fdata)
            } )
            .catch(err => {
                console.log('pehla error andr ka updte status sy',err.message)
                res.status(200).send(fdata)

            })
        })
        .catch(error => {
            console.error('pehla error Baahaar ka updte status sy',error.message)
            res.status(200).send(fdata)

        })
    },

}