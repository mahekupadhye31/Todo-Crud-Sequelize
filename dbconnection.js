const { Sequelize, DataTypes} = require('sequelize');
const dotenv = require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_PATH, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: { max: 5, min: 0 },
    logging:false
});

sequelize.authenticate().then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
});

// const Model=require('./allmodels.js')

// Model.user.hasMany(Model.task);
// Model.task.belongsTo(Model.user);

// sequelize.sync({force:false}).then(()=>{
//     console.log("re-synced")
// }).catch((err)=>{
//     console.log("Error:"+err)
// })

module.exports = sequelize;
