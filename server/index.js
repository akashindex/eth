const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use('/api/requestLand', require('./routes/api/requestLand'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/faqs', require('./routes/api/faqs'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
