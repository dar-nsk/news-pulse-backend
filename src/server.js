const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initializeNewsFetcher } = require('./jobs/newsFetcher');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use('/api/comments', require('./routes/comments'));  // ✅ Comments route
app.use('/api/tags', require('./routes/tags'));          // ✅ Tags route

// Start the news fetching job
initializeNewsFetcher();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
