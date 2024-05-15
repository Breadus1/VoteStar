const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { name, website, email, password } = req.body;
  try {
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }
    const company = new Company({ name, website, email, password });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
