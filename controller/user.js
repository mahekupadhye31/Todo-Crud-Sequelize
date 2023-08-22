const Model= require('../allmodels.js');
const jwt = require('jsonwebtoken');
const {validationResult}= require('express-validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const multer= require('multer')


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,"uploads");
        },
        filename : function(req,file,cb){
            cb(null, file.fieldname+".jpg")
        }
    }),
}).single("user_file");

const sendEmail=async(email,subject,body)=>{

    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tu9116253@gmail.com',
          pass: process.env.password
        }
      });
      
      const mailOptions = {
        from: 'tu9116253@gmail.com',
        to: email,
        subject: subject,
        text: body
      };
      let info= await transporter.sendMail(mailOptions)
      console.log("Message sent!")
}

const signup=async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(404).json(errors)
        }
        else{
        const {name,email,password}=req.body;
        const userData= await Model.user.create({
            name,
            email,
            password
        })
        const subject="Successful Registration!"
        const body="You have registered to the TO DO LIST app"
        sendEmail(email,subject,body)
        res.status(201).json({ message: "signup successful!", userData: userData })

        } 
    }
    catch(err){
        res.status(404).json({ message: "Invalid Credentials"})
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userData = await Model.user.findOne({
            where: {
                email
            }
        })
        const matched = await bcrypt.compare(password, userData.password)
        if (matched) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY)
                res.status(200).json({ userData, token })
            }
        else {
            res.status(404).json({ message: "Invalid Credentials"})
        }
    } catch (err) {
        res.status(404).json({ message: "Invalid Credentials"})
    }
}

module.exports = {
    signup,
    login,
    upload
}