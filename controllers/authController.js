const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup Route
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('Signup - Original Password:', password);

    const user = new User({ name, email, password });

    await user.save();
    console.log('Signup - User Saved:', user);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
};

// Login Route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login - User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Login - Entered Password:', password);
    console.log('Login - Stored Hashed Password:', user.password);

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Login - Password Match Result:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};


// Get User Details Route (Protected)
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err.message });
  }
};

module.exports = { signup, login, getUserDetails };
