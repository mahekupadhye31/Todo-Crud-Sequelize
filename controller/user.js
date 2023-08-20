const Model= require('../allmodels.js')
const jwt = require('jsonwebtoken')

const signup=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const userData= await Model.user.create({
            name,
            email,
            password
        })
        res.status(201).json({ message: "signup successful!", userData: userData })
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
        if (userData) {
            if (email===userData.email) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY)
                res.status(200).json({ userData, token })
            } else {
                res.status(404).json({ message: "Invalid Credentials"})
            }
        } else {
            res.status(404).json({ message: "Invalid Credentials"})
        }
    } catch (err) {
        res.status(404).json({ message: "Invalid Credentials"})
    }
}

module.exports = {
    signup,
    login
}