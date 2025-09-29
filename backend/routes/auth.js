const express = require('express');
const jwt = require('jsonwebtoken');
const Recruiter = require('../models/Recruiter');

const router = express.Router();

function signToken(user) {
  const payload = { id: user._id, email: user.email, name: user.name, address: user.address, role: 'recruiter' };
  const secret = process.env.JWT_SECRET || 'devsecret';
  const expiresIn = '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

// Register recruiter (optional - keep for initial setup)
router.post('/register', async (req, res) => {
  try {
    const { name, address, email, password } = req.body;
    if (!name || !address || !email || !password) {
      return res.status(400).json({ success: false, error: 'Champs manquants' });
    }
    const exists = await Recruiter.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, error: 'Email déjà utilisé' });
    }
    const recruiter = new Recruiter({ name, address, email, password });
    await recruiter.save();
    const token = signToken(recruiter);
    res.json({ success: true, token, recruiter: { id: recruiter._id, name: recruiter.name, address: recruiter.address, email: recruiter.email } });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Login recruiter
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(401).json({ success: false, error: 'Identifiants invalides' });
    const ok = await recruiter.comparePassword(password);
    if (!ok) return res.status(401).json({ success: false, error: 'Identifiants invalides' });
    const token = signToken(recruiter);
    res.json({ success: true, token, recruiter: { id: recruiter._id, name: recruiter.name, address: recruiter.address, email: recruiter.email } });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

module.exports = router;
