const Sequelize =require('sequelize');
const db=require('../dbconnection.js')

const task= db.define('task',{
    description: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM("Completed", "Incomple"),
    },
    due_date:{
        type: Sequelize.DATE
    },
    userId: {
        type: Sequelize.INTEGER,
    }
},{
    timestamps:true
})
module.exports=task;