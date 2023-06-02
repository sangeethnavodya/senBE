const express =require('express')
const cors=require('cors')
const app=express()
const Sequelize=require('sequelize')  
const dbConfig = require('./Config/dbConfig')



var corOption={
    origin:'https://localhost:8081'
}

app.use(cors(corOption)) 

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))


const PORT=process.env.PORT||4000

app.listen(PORT,()=>{
    console.log("connected to sentransport BE")
})
