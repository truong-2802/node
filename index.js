require("dotenv").config(); // sẽ sử dụng đc file cấu hình .env 
const express = require("express");
const app = express();
const port= 2210;

 app.listen(port, function(){
    console.log("Server is runing ...");
 })


//  app.set("view engine", "ejs")
//  app.use(express.static("public"))
//  app.use(express.json());
//  app.use(express.urlencoded({extended:true}));

// // conect database
// require("./src/db/connect");






//  app.get("/auth/register", function(req, res){
//    res.render("auth/register")
   
// })

// app.post("/auth/register",function(req,res){
//    const data = req.body;
//    const userModel = require("./src/models/user.model");
//    const u = new userModel(data);
//    u.save();
//    res.send("Done");
// })





//  app.get("/b7", function(req,res){
//    res.render("b7/b7")
//  })


//  app.get("/product", function(req,res){
//    res.render("product/product")
//  })
//  app.post("/product",function(req,res){
//    const data = req.body;
//    const productModel = require("./src/models/user.model");
//    const u = new productModel(data);
//    u.save();
//    res.send("Done");
// })

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// connect database
require("./src/db/connect");

const web_route = require("./src/routes/web.route");
app.use("/",web_route);

const auth_route = require("./src/routes/auth.route");
app.use("/auth",auth_route);


// app session 
const session =require("express-session");
app.use(
   session({
      resave : true,
      saveUninitialized : true,
      secret:process.env.SESSION_SECRET,
      cookie : {
         maxAge :Number(process.env.COOKIE_MAXAGE), //milisecond
         secure :false
      }
   })
);