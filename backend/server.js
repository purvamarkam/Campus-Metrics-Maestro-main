const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes'); // Adjust the path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use event routes
app.use('/api', eventRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
