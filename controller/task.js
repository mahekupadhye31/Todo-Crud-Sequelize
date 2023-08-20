const Model = require('../allmodels.js')

const addTask = async (req, res, next) => {
    try {
        const { description, status, due_date } = req.body
        const task = await Model.task.create({
            description,
            status,
            userId: req.user.userData.id,
            due_date: new Date(due_date)
        })
        res.status(201).json({ message: "Task Added Successfully", task })
    } catch (err) {
        res.status(404).json({message:"Oops! An error has occured"});
    }
}

const getTask = async (req, res, next) => {
    try {
        const task = await Model.task.findAll({
            where: {
                userId: req.user.userData.id
            }
        })
        res.status(200).json({ task })
    } catch (err) {
        res.status(404).json({message:"Oops! An error has occured"});
    }
}

const editTask = async (req, res, next) => {
    try {
        const { id, description, status, due_date } = req.body
        const task = await Model.task.update({
            description,
            status,
            due_date: new Date(due_date),
        }, {
            where: {id}
        })
        res.status(200).json({ message: "Task upadated successfully!" })
    } catch (err) {
        res.status(404).json({message:"Oops! An error has occured"});
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const {id} = req.query
        await Model.task.destroy({
            where: {id}
        })
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (err) {
        res.status(404).json({message:"Oops! An error has occured"});
    }
}
module.exports = {
    addTask,
    getTask,
    editTask,
    deleteTask
}