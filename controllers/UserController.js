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

    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format.');
    }

    // Validate password length
    if (!isValidPassword(password)) {
      throw new Error('Invalid password length.');
    }

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

// Helper function to validate email format
function isValidEmail(email) {
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password length
function isValidPassword(password) {
  // Set a minimum password length (e.g., 8 characters)
  const minLength = 8;
  return password.length >= minLength;
}


module.exports = {
  signup,
  login, 
};
