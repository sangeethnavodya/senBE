const express =require('express')
const app=express();

const db=require('./models');
db.sequelize.sync().then((req)=>{
    app.listen(4000,()=>{
        console.log("Server Running")
    })
})