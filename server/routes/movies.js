const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController.js');

// Define routes
router.get('/', moviesController.getAllMovies);
router.get('/:movieName', moviesController.getMovieById);
router.post('/', moviesController.createMovie);
router.put('/:movieName', moviesController.updateMovie);
router.delete('/:movieName', moviesController.deleteMovie);

module.exports = router;