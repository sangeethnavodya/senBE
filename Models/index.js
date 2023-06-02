const dbConfig = require('../Config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

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

const db={
}

db.Sequelize=Sequelize 
db.sequelize=sequelize