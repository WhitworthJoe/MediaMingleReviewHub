const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController.js');

// Define routes
router.get('/', reviewsController.getAllReviews);
router.get('/:reviewID', reviewsController.getReviewById);
router.post('/', reviewsController.createReview);
router.patch('/:reviewID', reviewsController.updateReview);
router.delete('/:reviewID', reviewsController.deleteReview);

module.exports = router;