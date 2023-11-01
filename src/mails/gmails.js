const nodemailer = require("nodemailer")
const emailService =  process.env.SERVICE
const emailHost =  process.env.HOST
const emailPost =  process.env.POST
const emailUser =  process.env.USER
const emailPass =  process.env.PASS
const config_mail ={
    service : emailService,
    host : emailHost,
    post :  emailPost,
    auth: {
        user : emailUser,
        pass : emailPass
    }
}
const transpost = nodemailer.createTransport(config_mail);
module.exports = transpost;