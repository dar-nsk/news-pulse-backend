// models/Bookmark.js
const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    // "Foreign key" to the User collection
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // "Foreign key" to the Article collection
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    createdAt: { type: Date, default: Date.now }
});

// Ensures a user cannot bookmark the same article twice
BookmarkSchema.index({ user: 1, article: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);