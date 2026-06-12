import express from 'express';
import mongoose from 'mongoose';
import Application from '../models/Application.js';
import { fallbackDb } from '../utils/fallbackDb.js';

const router = express.Router();

// Get all applications
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const applications = await Application.find().sort({ createdAt: -1 });
      return res.json(applications);
    } else {
      console.log('⚡ Using fallback JSON database for GET /api/applications');
      const applications = fallbackDb.getApplications();
      return res.json(applications);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applications', error: error.message });
  }
});

// Post a new application
router.post('/', async (req, res) => {
  try {
    const { gigId, gigTitle, teenName, teenEmail, age, skills, portfolioLink, pitch } = req.body;

    if (!gigId || !gigTitle || !teenName || !teenEmail || !age || !skills || !pitch) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const appData = {
      gigId,
      gigTitle,
      teenName,
      teenEmail,
      age: Number(age),
      skills,
      portfolioLink,
      pitch
    };

    if (mongoose.connection.readyState === 1) {
      const newApp = new Application(appData);
      const savedApp = await newApp.save();
      return res.status(201).json(savedApp);
    } else {
      console.log('⚡ Using fallback JSON database for POST /api/applications');
      const savedApp = fallbackDb.createApplication(appData);
      return res.status(201).json(savedApp);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Update application status (Approve / Reject)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    if (mongoose.connection.readyState === 1) {
      const updatedApp = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!updatedApp) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.json(updatedApp);
    } else {
      console.log('⚡ Using fallback JSON database for PATCH /api/applications/:id/status');
      const updatedApp = fallbackDb.updateApplicationStatus(id, status);
      if (!updatedApp) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.json(updatedApp);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error: error.message });
  }
});

export default router;
