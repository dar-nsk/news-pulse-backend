// routes/comments.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Article = require('../models/Article');

// 🟢 GET all comments for a specific article
router.get('/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 🟢 POST a new comment for an article
router.post('/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const { username, message } = req.body;

    // ✅ Check if article exists
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // ✅ Create a new comment document (separate collection)
    const newComment = new Comment({
      articleId,
      username,
      message
    });

    await newComment.save();

    res.status(201).json({ success: true, comment: newComment });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
