const Sequelize =require('sequelize');
const db=require('../dbconnection.js')
const bcrypt = require('bcrypt')

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

user.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});


module.exports=user;