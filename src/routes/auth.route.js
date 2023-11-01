const express = require("express");
const router = express.Router();
const controller = require("./../controllers/auth.controller");
const { check } = require("express-validator");
const validateRegister = ()=>{
    return [
        check("email","Vui lòng nhập email").not().isEmpty(),
        check("email","Vui lòng nhập đúng email").isEmail(),
        check("full_name","Vui lòng nhập họ và tên").not().isEmpty(),
        check("full_name","Tối thiểu 6 ký tự").isLength({min:6}),
        check("password","Vui lòng nhập mật khẩu").not().isEmpty(),

    ]
}
const auth_middleware = require("./../middlewares/auth");
// router.use(auth_middleware.guest);                  kiểm soát toàn bộ router
router.use("/auth/register",auth_middleware.guest);      // kiểm soát từng router


// upload file
const multer = require("multer");
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null,"public/uploads");
    },
    filename : function(req,file,callback){
        // callback(null,file.originalname);
        callback(null,Date.now()+file.originalname);
    }
})
const upload = multer({storage:sy=storage})


router.use("/auth/login",auth_middleware.guest);
router.get("/register",controller.register);
router.post("/register",upload.single("avatar"),controller.postRegister);
router.get("/login",controller.login);
router.post("/login",controller.postLogin);
router.get("/product",controller.product);
router.post("/product",upload.single("thumbnail"),controller.postProduct);
module.exports = router;