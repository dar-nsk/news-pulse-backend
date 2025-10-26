// routes/tags.js
const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const Article = require('../models/Article');

// 🟢 Add a tag to an article
router.post('/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const { tagName } = req.body;

    // Check if article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Prevent duplicate tags for the same article
    const existingTag = await Tag.findOne({ articleId, tagName });
    if (existingTag) {
      return res.status(400).json({ success: false, message: 'Tag already exists for this article' });
    }

    // Create a new tag
    const newTag = new Tag({ articleId, tagName });
    await newTag.save();

    res.status(201).json({ success: true, tag: newTag });
  } catch (err) {
    console.error('Error adding tag:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🟢 Get all tags for an article
router.get('/:articleId', async (req, res) => {
  try {
    const tags = await Tag.find({ articleId: req.params.articleId });
    res.status(200).json({ success: true, tags });
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
