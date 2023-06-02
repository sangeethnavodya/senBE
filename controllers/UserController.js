const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserController = {
  async register(req, res) {
    try {
      const { name, email, password, type } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        type,
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ where: { email } });

      // User not found
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Invalid password
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Create and send JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, 'your-secret-key');

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = UserController;
