const express =require('express')
const app=express();
app.use(express.json());

const db=require('./models');
const userRoutes = require('./routers/UserRouter');


app.use('/users', userRoutes);

db.sequelize.sync({ alter: true }).then((req)=>{
    app.listen(4000,()=>{
        console.log("Server Running on PORT 4000")
    })
})

