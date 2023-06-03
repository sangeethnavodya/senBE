const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, Infinity],
          msg: 'Password should have at least 6 characters.',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('customer', 'driver'),
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: {
          args: true,
          msg: 'Invalid URL format.',
        },
      },
    },
    companyRegistrationNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Example instance method to validate user inputs
  User.prototype.validateInputs = function () {
    if (!validator.isEmail(this.email)) {
      throw new Error('Invalid email format.');
    }

    if (!validator.isLength(this.password, { min: 6 })) {
      throw new Error('Password should have at least 6 characters.');
    }

    // Additional input validation logic here

    return true;
  };

  // Compare password with stored hash
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  return User;
}