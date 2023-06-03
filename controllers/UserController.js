const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      companyName,
      companyURL,
      companyRegistrationNumber,
    } = req.body;

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !role) {
      throw new Error('Required fields are missing. Please provide all required information.');
    }

    if (role === 'customer' && (!companyName || !companyURL || !companyRegistrationNumber)) {
      throw new Error('Company information is missing. Please provide all required information for the customer role.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      companyName: role === 'customer' ? companyName : null,
      companyURL: role === 'customer' ? companyURL : null,
      companyRegistrationNumber: role === 'customer' ? companyRegistrationNumber : null,
    });

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Invalid email or password.');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, 'your_secret_key');

    res.json({ message: 'Login successful.', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signup,
  login, 
};
