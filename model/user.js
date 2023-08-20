const Sequelize =require('sequelize');
const db=require('../dbconnection.js')

const user= db.define('user',{
    name:{
        type:Sequelize.STRING,
        required:true
    },
    email:{
        type:Sequelize.STRING,
        required:true,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        required:true,
      
    }
},{
    timestamps:true
})
module.exports=user;