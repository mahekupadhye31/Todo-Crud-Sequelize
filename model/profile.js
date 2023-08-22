const Sequelize =require('sequelize');
const db=require('../dbconnection.js')

const profile=db.define('profile',{
    name:{
        type:Sequelize.STRING,
        required:true
    },
    age:{
        type:Sequelize.NUMBER,
        required:true
    },
    email:{
        type:Sequelize.STRING,
        required:true
    }
},{
    timestamps:true
})

module.exports=profile;