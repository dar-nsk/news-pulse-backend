    // routes/bookmarks.js

    const express = require('express');
    const router = express.Router();
    const { addBookmark, getMyBookmarks, removeBookmark } = require('../controllers/bookmarkController');
    const authMiddleware = require('../middleware/authMiddleware');

    // All bookmark routes are protected
    // Pass the authMiddleware function here
    router.use(authMiddleware);

    // @route   POST api/bookmarks/:articleId
    // @desc    Bookmark an article
    router.post('/:articleId', addBookmark);

    // @route   GET api/bookmarks
    // @desc    Get all bookmarks for the logged-in user
    router.get('/', getMyBookmarks);

    // @route   DELETE api/bookmarks/:articleId
    // @desc    Remove a bookmark
    router.delete('/:articleId', removeBookmark);

    module.exports = router;