const cron = require('node-cron');
const axios = require('axios');
const Category = require('../models/Category');
const Article = require('../models/Article');

const categoriesToFetch = ['technology', 'science', 'health', 'sports', 'business', 'politics', 'entertainment'];

const seedCategories = async () => {
    try {
        for (const cat of categoriesToFetch) {
            await Category.findOneAndUpdate(
                { name: cat.charAt(0).toUpperCase() + cat.slice(1) },
                { name: cat.charAt(0).toUpperCase() + cat.slice(1) },
                { upsert: true }
            );
        }
        console.log('Categories seeded/verified.');
    } catch (error) {
        console.error('Error seeding categories:', error.message);
    }
};

const fetchAndStoreNews = async () => {
    // ... (rest of the fetchAndStoreNews function)
    console.log('Running cron job: Fetching latest news...');
    try {
        for (const categoryName of categoriesToFetch) {
            const categoryDoc = await Category.findOne({ name: { $regex: new RegExp(categoryName, 'i') } });
            if (!categoryDoc) continue;

            const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                params: {
                    q: categoryName,
                    language: 'en',
                    apiKey: process.env.NEWS_API_KEY
                }
            });

            console.log(`API Response for '${categoryName}':`, response.data);
            const articles = response.data.articles || [];
            console.log(`Found ${articles.length} articles for '${categoryName}'.`);

            for (const article of articles) {
                await Article.findOneAndUpdate(
                    { url: article.url },
                    {
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        imageUrl: article.urlToImage,
                        publishedAt: article.publishedAt,
                        content: article.content,
                        source: article.source.name,
                        category: categoryDoc._id
                    },
                    { upsert: true }
                );
            }
        }
        console.log('News fetch job completed successfully.');
    } catch (error) {
        console.error('Error fetching news:', error.response ? error.response.data : error.message);
    }
};

// --- THIS IS THE CRITICAL LINE ---
// It wraps all the logic into one function and exports it.
exports.initializeNewsFetcher = () => {
    seedCategories();
    fetchAndStoreNews();
    cron.schedule('0 * * * *', fetchAndStoreNews);
};