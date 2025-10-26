// src/test-fetcher.js
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initializeNewsFetcher } = require('./jobs/newsFetcher');

// Load environment variables (like your MONGO_URI and NEWS_API_KEY)
dotenv.config();

const runTest = async () => {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected. Starting news fetcher job...');

    // This runs the same function your server calls
    initializeNewsFetcher();

    // Give it some time to finish the API calls and database insertions
    setTimeout(() => {
        console.log('Test script finished. Check your Atlas logs.');
        process.exit(0);
    }, 30000); // 30 seconds should be enough
};

runTest();