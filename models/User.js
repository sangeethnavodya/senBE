module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define("User",{
        firstname:{
            type:DataTypes.STRING
        }
    });
    return User
};