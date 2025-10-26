const express = require('express');
const router = express.Router();
const { getArticles } = require('../controllers/articleController');

// @route   GET api/articles
// @desc    Get all articles (can filter by category)
// @access  Public
// Example: GET /api/articles?category=Technology
router.get('/', getArticles);

module.exports = router;