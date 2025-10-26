// models/Tag.js
const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  tagName: { type: String, required: true }, // ✅ changed from "name" → "tagName"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tag', TagSchema);
