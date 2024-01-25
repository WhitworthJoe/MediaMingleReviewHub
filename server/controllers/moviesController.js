const { ObjectId } = require("mongodb"); // Ensure you import ObjectId from mongodb
const { getCollection } = require("../db/connection");

// Controller functions
const getAllMovies = async (req, res) => {
  const moviesCollection = await getCollection("movies");
  const movies = await moviesCollection.find({}).toArray();
  res.json(movies);
};

const getMovieById = async (req, res) => {
  let { movieName } = req.params;
  movieName = movieName.toLowerCase(); // Convert to lowercase

  console.log("Movie from request:", movieName);

  try {
    const moviesCollection = await getCollection("movies");
    const movieItem = await classesCollection.findOne({
      movie: movieName, // Use the 'class' field for querying
    });

    if (!movieItem) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movieItem);
  } catch (error) {
    console.error("Error retrieving Movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createMovie = async (req, res) => {
  const { body } = req;
  const moviesCollection = await getCollection("movies");

  try {
    const result = await moviesCollection.insertOne(body);
    console.log("Insert result:", result);

    // Log the ops array
    console.log("Ops array:", result.ops);

    // Fetch the inserted document using insertedId
    const insertedDocument = await moviesCollection.findOne({
      _id: result.insertedId,
    });
    console.log("Inserted document:", insertedDocument);

    res.status(201).json(insertedDocument);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const moviesCollection = await getCollection("movies");

  try {
    const result = await moviesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const updatedMovie = await moviesCollection.findOne({
      _id: new ObjectId(id),
    });

    res.json({
      _id: updatedMovie._id,
      movie: updatedMovie.movie,
      message: "Movie updated successfully",
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const moviesCollection = await getCollection("movies");

  try {
    const result = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
