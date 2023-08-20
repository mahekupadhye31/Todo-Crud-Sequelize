const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const PORT= process.env.PORT || 8000

require('./dbconnection.js');
require('./relations.js').modelRelations();

const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

app.use(express.json());

app.use('/user',userRoutes)
app.use('/task',taskRoutes)


app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})


