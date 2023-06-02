const express =require('express')
const cors=require('cors')
const app=express()
const Sequelize=require('sequelize')  
const dbConfig = require('./Config/dbConfig')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorsAliase:false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
}
)

sequelize.authenticate().then(()=>{
    console.log('Connnected to DataBase')
}) 

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