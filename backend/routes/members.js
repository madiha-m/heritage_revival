const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// GET /api/members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/members/:id - Get a specific member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/members - Create a new member
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { fullName, email, role, location, consentContact } = req.body;
    if (!fullName || !email || !role || !location || consentContact === undefined) {
      return res.status(400).json({ message: 'Required fields are missing: fullName, email, role, location, consentContact' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const memberData = { ...req.body };
    // Handle profile image file if uploaded
    if (req.file) {
      memberData.profileImage = `/uploads/${req.file.filename}`;
    }

    const member = new Member(memberData);
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
