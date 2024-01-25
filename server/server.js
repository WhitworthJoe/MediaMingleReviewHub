const express = require('express');
const app = express();
const { connectToDatabase, closeConnection } = require('./db/connection');

// Import routes
const moviesRoute = require('./routes/movies');
const reviesRoute = require('./routes/reviews')

// Middleware
app.use(express.json());

// Use routes
app.use('/movies', moviesRoute);
app.use('/reviews', reviesRoute)

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectToDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

// Close MongoDB connection when the server stops
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit();
});

// Start the server
startServer();