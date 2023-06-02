const express =require('express')
const app=express();

const db=require('./models');
const userRoutes = require('./routers/UserRouter');

app.use('/users', userRoutes);

db.sequelize.sync().then((req)=>{
    app.listen(4000,()=>{
        console.log("Server Running")
    })
})