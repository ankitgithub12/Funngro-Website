import express from 'express';
import mongoose from 'mongoose';
import Gig from '../models/Gig.js';
import { fallbackDb } from '../utils/fallbackDb.js';

const router = express.Router();

// Get all gigs
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const gigs = await Gig.find().sort({ createdAt: -1 });
      return res.json(gigs);
    } else {
      console.log('⚡ Using fallback JSON database for GET /api/gigs');
      const gigs = fallbackDb.getGigs();
      return res.json(gigs);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving gigs', error: error.message });
  }
});

// Post a new gig
router.post('/', async (req, res) => {
  try {
    const { title, company, description, budget, category, skills, duration } = req.body;

    if (!title || !company || !description || !budget || !category || !duration) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const gigData = {
      title,
      company,
      description,
      budget: Number(budget),
      category,
      skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()).filter(Boolean),
      duration
    };

    if (mongoose.connection.readyState === 1) {
      const newGig = new Gig(gigData);
      const savedGig = await newGig.save();
      return res.status(201).json(savedGig);
    } else {
      console.log('⚡ Using fallback JSON database for POST /api/gigs');
      const savedGig = fallbackDb.createGig(gigData);
      return res.status(201).json(savedGig);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating gig', error: error.message });
  }
});

export default router;
