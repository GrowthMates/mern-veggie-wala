const Product = require('../models/product');
const mongoose = require('mongoose')
const NewCart = require('../models/admin/newCart')
const { Item, Review} = require('../models/socketTest')

// var MySchema = mongoose.model('Product')
// Product.update({"name": "erer", "cartStock.cart" : "cart 1" } ,
// {$inc : {"cartStock.$.stock" : 12} },
// function(data) {console.log('hello world',data)});
// Product.findOneAndUpdate({_id: "5e4e8832c68ebc040467d640", 'cartStock.cart': "cart 3"},{$inc:{'cartStock.stock':2}})
// .then((blogPost) => console.log(blogPost.cartStock))
// let product = new Product
// console.log(product)
module.exports = {
    
    readAllProducts(req, res){
        console.log('ReadAllProducts called===',req.headers.referer)
        Product.find({}).exec((err, products)=>{    //.limit(10)
            if(err){
                console.log('All products err--------',err);
                return res.status(400).json({ productsNotFound: "No products Available" });
            }
            // console.log('Products Find====',products)
            res.status(200).send(products.reverse());
        })


    },

    //===========================//
    //   Practice of Populate   //
    //==========================//
    
//     createItem(req, res){
//     // practice of Populate
//     Item.create({name:'Gaajar'})
//     .then(function(dbProduct) {
//       // If we were able to successfully create a Product, send it back to the client
//       console.log('item create==>>',dbProduct)
//       res.json(dbProduct);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
//     },

 
//     review(req, res) {
//         // Create a new note and pass the req.body to the entry
//         Review.create({stars:0,review:'L Lelo'})
//           .then(function(dbReview) {
//             // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
//             // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             return Item.findOneAndUpdate({ _id: req.params.id }, {$push:{ review: dbReview._id} }, { new: true });
//           })
//           .then(function(dbProduct) {
//             // If we were able to successfully update a Product, send it back to the client
//             console.log('Reveiw create===>>>', dbProduct)
//             res.json(dbProduct);
//           })
//           .catch(function(err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//           });
//       },
//   viewReview(req, res){
//     Item.findOne({_id:req.params.id})
//     // ..and populate all of the notes associated with it
//     .populate("review")
//     .then(function(dbProduct) {
//       // If we were able to successfully find an Product with the given id, send it back to the client
//       res.json(dbProduct);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
//   },
  
 //=====x========x========x========x=======x========x========x======//

    readProduct(req, res){

        const { id } = req.params;
        Product.findById(id).exec((err, product) => {
            if(err){
                console.log('Product err----------',err);
                return res.status(400).json("Product Not Found");

            }
            res.status(200).send(product);
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