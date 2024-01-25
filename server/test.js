const { connectToDatabase, closeConnection, client } = require('./db/connection');

async function fetchData() {
  try {
    await connectToDatabase();
    
    const database = client.db('mediaMingleReviewHub'); // Update with your database name
    const moviesCollection = database.collection('movies'); // Update with your collection name

    const movies = await moviesCollection.find().toArray();
    console.log('Movies:', movies);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await closeConnection();
  }
}

fetchData();