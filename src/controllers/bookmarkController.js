const Bookmark = require('../models/Bookmark');
const Article = require('../models/Article');

exports.addBookmark = async (req, res) => {
    try {
        const articleId = req.params.articleId;
        const userId = req.user.id;

        // Check if article exists
        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ msg: 'Article not found' });
        
        // Check if bookmark already exists
        const existingBookmark = await Bookmark.findOne({ user: userId, article: articleId });
        if(existingBookmark) return res.status(400).json({ msg: 'Article already bookmarked' });

        const newBookmark = new Bookmark({ user: userId, article: articleId });
        await newBookmark.save();

        res.json(newBookmark);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMyBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id })
            .populate({
                path: 'article',
                populate: {
                    path: 'category',
                    model: 'Category',
                    select: 'name'
                }
            });
            
        res.json(bookmarks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.removeBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOneAndDelete({
            user: req.user.id,
            article: req.params.articleId
        });

        if (!bookmark) return res.status(404).json({ msg: 'Bookmark not found' });
        
        res.json({ msg: 'Bookmark removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};