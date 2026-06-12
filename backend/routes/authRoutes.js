import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { fallbackDb } from '../utils/fallbackDb.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// @route   POST /api/auth/register
// @desc    Register a new user (Teen or Company)
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, age, companyName, skills, portfolioLink, pitch } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }

    if (role === 'teen' && !age) {
      return res.status(400).json({ message: 'Teens must enter their age' });
    }

    if (role === 'company' && !companyName) {
      return res.status(400).json({ message: 'Companies must enter their brand name' });
    }

    // Check if user exists
    let existingUser = null;
    if (mongoose.connection.readyState === 1) {
      existingUser = await User.findOne({ email: email.toLowerCase() });
    } else {
      existingUser = fallbackDb.findUserByEmail(email);
    }

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      age: role === 'teen' ? Number(age) : undefined,
      companyName: role === 'company' ? companyName : undefined,
      skills: skills || '',
      portfolioLink: portfolioLink || '',
      pitch: pitch || ''
    };

    let savedUser = null;
    if (mongoose.connection.readyState === 1) {
      const newUser = new User(userData);
      savedUser = await newUser.save();
    } else {
      savedUser = fallbackDb.createUser(userData);
    }

    // Create token
    const token = generateToken(savedUser._id);

    // Remove password from response
    const userResponse = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      age: savedUser.age,
      companyName: savedUser.companyName,
      skills: savedUser.skills,
      portfolioLink: savedUser.portfolioLink,
      pitch: savedUser.pitch
    };

    res.status(201).json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = fallbackDb.findUserByEmail(email);
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
      companyName: user.companyName,
      skills: user.skills,
      portfolioLink: user.portfolioLink,
      pitch: user.pitch
    };

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', async (req, res) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
      token = token.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    let user = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(decoded.id).select('-password');
    } else {
      user = fallbackDb.findUserById(decoded.id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If it's a fallback user or mongoose model, make sure password is not returned
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
      companyName: user.companyName,
      skills: user.skills,
      portfolioLink: user.portfolioLink,
      pitch: user.pitch
    };

    res.json(userResponse);
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token validation failed', error: error.message });
  }
});

export default router;
