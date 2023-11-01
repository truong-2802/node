// const userModel = require('./../models/user.model');
const productModel = require('./../models/product.model');
const bcrypt = require("bcryptjs");
const { validationResult} = require("express-validator");
const gmail = require("./../mails/gmails")
exports.register = function(req,res){
    res.render("auth/register");
};
exports.postRegister = async function(req,res){
    const data = req.body;    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(errors.array());
    }
    try {
        if(req.file){
            const file = req.file;
            // data.avatar = "/uploads/"+file.filename;
            const fs = require("fs");
            const img = fs.readFileSync(file.path);
            data.avatar ={
                contentType : file.mimetype,
                data : img.toString("base64")
            }
        }


        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password,salt);
        data.password = hashed;
        const u = new userModel(data);
        await u.save();
        //send mail
        gmail.sendMail({
            from : "T2210M Registrantion",
            to : u.email,
            // cc : " nhanvien@gmail.com"
            //bcc :"manager@gmail.com"
            subject : "Đăng kí tài khoản thành công",
            //text 
            html : "<h1> Nếu gửi mail cho gv mà không có subject thì trừ điểm </h1>"
        })
        res.send("Done");
        // res.redirect("/auth/login");
    } catch (error) {
        res.send(error);
    }    
};
exports.login =  function(req,res){
   res.render("auth/login");     
}
exports.postLogin = async function(req,res){
    const email = req.body.email;
    const pwd = req.body.password;
    try {
        // b1-  dùng email tìm user trong db -> nếu ko có báo lỗi email hoặc password ko đúng
        const u = await userModel.findOne({email:email});
        if(u == null){
            return res.send("Email or Password is not correct");
        }
        // b2 -  so sanh password - dùng cơ chế hash verify để so sánh
        const verify = await bcrypt.compare(pwd,u.password);// return true/false
        if(!verify){
            return res.send("Email or Password is not correct");
        }
        // b3- phản hồi khi đúng -- lưu user vào session 
        req.session.auth = {
            full_name : u.full_name,
            email : u.email
        }
        
        return res.send("Log in successfully");

    } catch (error) {
        return res.send(error);
    }
}
exports.product=function(req,res){
    res.render("auth/product");
}

exports.postProduct= function(req,res){
    const data = req.body;
       try {
        if(req.file){
            const file = req.file;
            // data.avatar = "/uploads/"+file.filename;
            const fs = require("fs");
            const img = fs.readFileSync(file.path);
            data.thumbnail ={
                contentType : file.mimetype,
                data : img.toString("base64")
            }
        }

       const u = new productModel(data);
       u.save();
       res.send("Done");
       } catch (error) {
        return res.send(error)
    }

}