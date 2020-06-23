const Product = require('../models/product');
const NewCart = require('../models/admin/newCart')
const Review = require('../models/productReviews')
// const {sendMail} = require('./sendMail.email')

// var nodemailer = require('nodemailer');


// const { Item, Review} = require('../models/socketTest')

// var MySchema = mongoose.model('Product')
// Product.update({"name": "erer", "cartStock.cart" : "cart 1" } ,
// {$inc : {"cartStock.$.stock" : 12} },
// function(data) {console.log('hello world',data)});
// Product.findOneAndUpdate({_id: "5e4e8832c68ebc040467d640", 'cartStock.cart': "cart 3"},{$inc:{'cartStock.stock':2}})
// .then((blogPost) => console.log(blogPost.cartStock))
// let product = new Product
// console.log(product)
module.exports = {
    
   
  sendMail(){
    // var transport = {
    //     host: 'smtp.sendgrid.net',
    //     auth: {
    //       user: process.env.mailEmail,
    //       pass: process.env.mailPassword
    //     }
    //   }
      
    //   var transporter = nodemailer.createTransport(transport)
      
    //   transporter.verify((error, success) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Server is ready to take messages');
    //     }
    //   });
    
    // var mailOptions = {
    //   from: 'Rehan Saeed, saeedrehan3@gmail.com',
    //   to: 'ggrowthmates.com@gmail.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
  },




        
    // GET NUMBER OF PRODUCTS...
        countProducts(req, res){
            // console.log('count----',req.query,req.body)
            let countFindArgs = {};

            for(key in req.body.filters){
               if(req.body.filters[key].length > 0){
                  
                       countFindArgs[key] = req.body.filters[key]
                 
               }
               
           }
        // console.log('countFindArgs',countFindArgs)
            Product.countDocuments({...countFindArgs,...req.query}, function(err, result){
                if(err) console.log(err)
                if(result) {
                    res.json(result)
                }
            })
        },

    // GET ALL PRODUCTS WITH SOME FILTERATIONS...
        readAllProducts(req, res){

        console.log('ReadAllProducts called===',req.headers.referer)
        const skip = req.body.skip?req.body.skip:0
        const limit = req.body.limit?req.body.limit:12
        let findArgs = {};

         for(key in req.body.filters){
            if(req.body.filters[key].length > 0){
               findArgs[key] = req.body.filters[key]
            }
        }
        console.log('findArgs',findArgs)
        
        Product.find({...req.query,...findArgs})
               .sort({_id:-1})
               .skip(skip)
               .limit(limit)
               .exec((err, products)=>{    //.limit(10)
            if(err){
                console.log('All products err--------',err);
                return res.status(400).json(err.message);
            }
            if(!products){
                console.log('no data found')
                return res.status(400).json("No products Available");
            }
            // console.log('Products Find====',products)
           
            res.status(200).send(products);
        })
        

    },



//  MAKE REVIEWS ON PRODUCT... 
    makeReview(req, res) {
        // Create a new note and pass the req.body to the entry
        console.log("reveiw req.body====",req.body)
       try{

           Review.create(req.body)
              .then(function(dbReview) {
                // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
                // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return Product.findOneAndUpdate({ _id: req.params.id }, {$push:{ review: dbReview._id, starRating: req.body.star} }, { new: true });
              })
              .then(function(dbProduct) {
                // If we were able to successfully update a Product, send it back to the client
                console.log('Reveiw create===>>>', dbProduct)
                res.json(dbProduct);
              })
              .catch(function(err) {
                // If an error occurred, send it to the client okay>
           console.log('REview catch err====',err)
                res.status(422).json(err);
              });
       }catch(error){
           console.log('try catch err====',error)
           res.status(422).json({serverError:"Server Error, Please refresh the page and try again",error})
       } 
      },


    // GET SINGLE PRODUCT WITH ID... 
      readProduct(req, res){

        const { id } = req.params;
        Product.findById(id)
        .populate("review")
        .exec((err, product) => {
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