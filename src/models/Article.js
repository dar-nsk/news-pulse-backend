// models/Article.js
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true, unique: true },
  imageUrl: { type: String },
  publishedAt: { type: Date, required: true },
  content: { type: String },
  source: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
});

module.exports = mongoose.model('Article', ArticleSchema);
