const ReviewModel = require('../models/review.model');

const ReviewController = {
  async create(req, res) {
    try {
      const { enrollmentId, rating, reviewText } = req.body;
      await ReviewModel.addReview({ enrollmentId, rating, reviewText });
      res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
      console.error('❌ Failed to add review:', err);
      res.status(500).json({ error: 'Failed to add review' });
    }
  },

  async getAll(req, res) {
    try {
      const reviews = await ReviewModel.getAllReviews();
      res.status(200).json(reviews);
    } catch (err) {
      console.error('❌ Failed to fetch reviews:', err);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  },

  async getOne(req, res) {
    try {
      const reviewId = parseInt(req.params.id);
      const review = await ReviewModel.getReviewById(reviewId);

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      res.status(200).json(review);
    } catch (err) {
      console.error('❌ Failed to fetch review:', err);
      res.status(500).json({ error: 'Failed to fetch review' });
    }
  }
};

module.exports = ReviewController;
