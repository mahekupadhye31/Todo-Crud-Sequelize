const {addTask, getTask,editTask,deleteTask } = require('../controller/task')
const {Token} = require('../middleware/authentication')
const express = require('express')
const router = new express.Router()

router.post('/addTask',Token,addTask)
router.get('/getTask',Token,getTask)
router.put('/editTask',Token,editTask)
router.delete('/deleteTask',Token,deleteTask)

module.exports = router;