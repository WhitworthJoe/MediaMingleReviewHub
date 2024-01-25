const { ObjectId } = require("mongodb"); // Ensure you import ObjectId from mongodb
const { getCollection } = require("../db/connection");

// Controller functions
const getAllReviews = async (req, res) => {
  const reviewsCollection = await getCollection("reviews");
  const reviews = await reviewsCollection.find({}).toArray();
  res.json(reviews);
};

const getReviewById = async (req, res) => {
  let { reviewID } = req.params;

  console.log("Review from request:", reviewID);

  try {
    const reviewsCollection = await getCollection("reviews");
    const reviewItem = await reviewsCollection.findOne({
      _id: new ObjectId(reviewID), // Use the 'class' field for querying
    });

    if (!reviewItem) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(reviewItem);
  } catch (error) {
    console.error("Error retrieving Review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createReview = async (req, res) => {
  const { body } = req;
  const reviewsCollection = await getCollection("reviews");

  try {
    const result = await reviewsCollection.insertOne(body);
    console.log("Insert result:", result);

    // Log the ops array
    console.log("Ops array:", result.ops);

    // Fetch the inserted document using insertedId
    const insertedDocument = await reviewsCollection.findOne({
      _id: result.insertedId,
    });
    console.log("Inserted document:", insertedDocument);

    res.status(201).json(insertedDocument);
  } catch (error) {
    console.error("Error creating Review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  const {  } = req.params;
  const { body } = req;
  const reviewsCollection = await getCollection("reviews");

  try {
    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(reviewID) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    const updatedReview = await reviewsCollection.findOne({
      _id: new ObjectId(reviewID),
    });

    res.json({
      _id: updatedReview._id,
      Review: updatedReview.Review,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error("Error updating Review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
    const { reviewID } = req.params;
    const reviewsCollection = await getCollection("reviews");
  
    try {
      console.log("Deleting review with ID:", reviewID); // Add this line
  
      const result = await reviewsCollection.deleteOne({ _id: new ObjectId(reviewID) });
  
      if (result.deletedCount === 0) {
        console.log("Review not found for deletion"); // Add this line
        return res.status(404).json({ error: "Review not found" });
      }
  
      console.log("Review deleted successfully"); // Add this line
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting Review:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
