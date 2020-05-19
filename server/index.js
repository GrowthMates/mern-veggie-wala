require('dotenv').config();
const express = require('express');
// const http = require("http");
// const socketIO = require("socket.io");
const path = require("path");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const Test = require('./models/socketTest');
const Product = require('./models/product')
const Image = require('./models/socketTest')
const userController = require('./controllers/user_controller');
const adminController = require('./controllers/admin/admin_controller');
const productsController = require('./controllers/products_controller');
const cartOwnerController = require('./controllers/cartOwner_controller')
const PORT = process.env.PORT || 5000;
const passport = require("passport");

// const server = http.createServer(app);
// const io = socketIO(server);

//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
//   destination : function(req, file, cb){
//     cb(null, 'server/uploads/');
// },
filename: function(req, file, callback) {
  console.log("storage====",file)
callback(null, Date.now() + file.originalname);
}
});
const imageFilter = function(req, file, cb) {
// accept image files only
console.log("ImageFilter====",file)
if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
return cb(new Error("Only image files are accepted!"), false);
}
cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter});//{ storage: storage, fileFilter: imageFilter}, fileFilter: imageFilter 
const cloudinary = require("cloudinary");
cloudinary.config({
cloud_name: "dbevearco", //ENTER YOUR CLOUDINARY NAME
api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
api_secret: process.env.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(err)=>{
    if(err){
        console.log('Database Connection Err-------------:',err.message);
        
    }
    else
    console.log('Database Connected-------------');

});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000*60*60*24*17
    }
}));

app.use(cors());

app.use(passport.initialize()); 
require("./config/passport");

//socket io working...
// io.on("connection", socket => {
//     console.log("New client connected" + socket.id);
//     // Returning the initial data of food menu from FoodItems collection
//     socket.on("initial_data", () => {
//         let test = new Test({
//             name:'Abdul Ghafoor',
//             description:'Yeh Bik Gai Hai Gormint'
//         })
//         productInCart.save().then(data=>{
               
//             Test.find({}).then(docs => {
//             io.sockets.emit("get_data", docs);
//             });
//             // res.status(200).json({success:true, data})
//         })

//      });
// })

setTimeout(()=>{
    // app.get("/viewImages", (req, res) => {
    //     Image.find(function(err, images) {
    //       if (err) {
    //         res.json(err.message);
    //       } else {
    //         res.json(images);
    //       }
    //     });
    //   });
      
    //   app.post("/add", upload.single("image"), (req, res) => {
    //       console.log('/add called====',req.body)
    //     cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    //       if (err) {
    //         req.json(err.message);
    //       }
    //       req.body.image = result.secure_url;
    //       // add image's public_id to image object
    //       req.body.imageId = result.public_id;
      
    //       Image.create(req.body, function(err, image) {
    //         if (err) {
    //           res.json(err.message);
    //           return res.redirect("/viewImages");
    //         }
    //         console.log('res send',image)
    //         res.json(image)
    //       });
    //     });
    //   });
    // io.on("connection", socket => {
    //     console.log("New client connected" + socket.id);
    //     // Returning the initial data of food menu from FoodItems collection
    //     socket.on("call_products", () => {
    //         console.log('initial data called by client=====')
               
    //             // Product.find({}).then(docs => {
    //             //     console.log('emitted data====',docs)
    //             //     io.sockets.emit("get_products", docs);
    //             // });
    //             // res.status(200).json({success:true, data})
           
    
    //      });
    // })

    /* -----------GET Google Authentication API.----------- */
        app.get(
          "/auth/google",
          passport.authenticate("google", { scope: ["profile", "email"] })
        );
        app.get(
          "/auth/google/callback",
          passport.authenticate("google", { failureRedirect: "/", session: false }),userController.authGoogleCallback);
          // function(req, res) {
          //     var token = req.user.token;
          //     console.log('res.user>>>=====',req.user)
          //     res.redirect("http://localhost:3000?token=" + token);
          // }
        // );

  /*---------Data Call APIs---------*/ 
    app.get('/api/user-data', userController.readUserData);
    //Add a item to cart.
    app.post('/api/user-data/addToCart', userController.addToCart);
    //Add a item to cart.
    // app.post('/api/cart-owner/send-message', cartOwnerController.sendSMS);
    //update cart item
    app.put('/api/user-data/updateCart', userController.updateCart);
    //view cart items
    // app.get('/api/user-data/cart', userController.viewCart);
    //view cart items
    app.get('/api/user-data/cart/:id', userController.viewCart);
    //Remove a item from the cart.
    // Use request parameter to remove item from cart since you are looking a specific item in cart.
    app.post("/api/user-data/delCart", userController.removeFromCart);
    //remove full cart
    app.post("/api/user-data/cart/delete", userController.removeCart);
    //User Register to place order
    app.post('/api/register', userController.register)
    //When user login
    app.post('/api/login', userController.login);
    //When the user logouts
    app.post('/api/logout', userController.logout);
    //Products Endpoints
    //Getting all the products
    app.get('/api/products', productsController.readAllProducts);

    app.post('/api/updateProductStatus', productsController.updateProductStatus);

    //Getting a specified product
    //Use a request parameter, since retrieving a specified product..
    app.get('/api/products/:id', productsController.readProduct);
    //Admin Endpoints
    //Gets the admin users.
    app.get('/api/users', adminController.getAdminUsers);
    //When a admin creates a product. No need for request parameter in this case. Since we are inserting data to database.
    app.post('/api/createProduct', upload.array("image") , adminController.createProduct); //For Cloudinary base database

    // Delete Images from Cloudinary...
    app.post('/api/deleteImage',adminController.deleteImages)

    app.get('/api/bookedProducts', adminController.bookedProduct);

    // app.get('/api/delProducts', adminController.delProducts);
    //When a admin update a current product. Need request parameter since updating a specific product based on  the id.
    app.post('/api/updateProduct', adminController.updateProduct);
    //When a admin deletes a product, need an id to specify a product to delete.
    app.post('/api/deleteProduct', adminController.deleteProduct);

    // app.post('/api/createProduct', adminController.createProduct);  //To save data without Cloudinary...


    app.get('/api/products/pending', adminController.pendingProduct);

    app.post('/api/products/proceed', userController.proceed);

    app.post('/api/del/approved', adminController.delAfterApproved);

    app.get('/api/get-stock', adminController.getStock);

    app.post('/api/del/cart', userController.delCartProducts);

    app.post('/api/cartOwner/confirmOrder', adminController.cartOwner);

    app.get('/api/getOrders', adminController.getOrders);

    app.get('/api/cartOwner/reciept', adminController.cartOwnerReciept);


    app.get('/api/getCartOwners', adminController.getCartOwners);

    app.post('/api/updateStatus', productsController.updateStatus);

    app.post('/api/wishList', userController.wishList)

    app.post('/api/getWishList', userController.getWishList)

    app.post('/api/del/wishList', userController.delWishList)

    // app.get("/review/:id", productsController.review) 
    // app.get("/getReview/:id", productsController.viewReview) 
    // app.get("/item/", productsController.createItem) 

    
    
},200);


// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); // serve the static react app
  app.get(/^\/(?!api).*/, (req, res) => { // don't serve api routes to react app
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  console.log('Serving React App...');
};


app.listen(PORT,()=>{console.log('Server running on Localhost:',PORT)});
