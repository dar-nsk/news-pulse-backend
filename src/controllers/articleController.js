const Article = require('../models/Article');
const Category = require('../models/Category');

exports.getArticles = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};

        if (category) {
            const categoryDoc = await Category.findOne({ name: { $regex: new RegExp(category, 'i') } });
            if (categoryDoc) {
                filter.category = categoryDoc._id;
            } else {
                return res.json([]); // Return empty if category doesn't exist
            }
        }

        const articles = await Article.find(filter)
            .populate('category', 'name') // Show category name instead of just ID
            .sort({ publishedAt: -1 }); // Sort by newest first
            
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};