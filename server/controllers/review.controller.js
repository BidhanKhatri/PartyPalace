import Review from "../models/review.model.js";

// create review controller;
export const createReviewController = async (req, res) => {
  try {
    const { partyPalaceId, comment, ratings } = req.body;

    const userId = req?.userId; //from middleware

    if (!partyPalaceId) {
      return res.status(400).json({
        msg: "partyPalaceId is required",
        success: false,
        error: true,
      });
    }
    if (!comment) {
      return res.status(400).json({
        msg: "comment is required",
        success: false,
        error: true,
      });
    }
    if (!ratings) {
      return res.status(400).json({
        msg: "provide a ratings max 5",
        success: false,
        error: true,
      });
    }
    if (!userId) {
      return res.status(400).json({
        msg: "reviewBy userId is required",
        success: false,
        error: true,
      });
    }

    const createReview = new Review({
      partyPalaceId,
      reviews: {
        comment,
        ratings,
      },
      reviewBy: userId,
    });
    await createReview.save();

    if (!createReview) {
      return res.status(400).json({
        msg: "sorry unable to create review",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      msg: "Review submitted successful",
      success: true,
      error: false,
      data: createReview,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error || "Internal server error",
      success: false,
      error: true,
    });
  }
};

//get review controller
export const getReviewController = async (req, res) => {
  try {
    const { partyPalaceId } = req.query;

    if (!partyPalaceId) {
      return res.status(400).json({
        msg: "partyPalaceId is required",
        error: true,
        success: false,
      });
    }

    const findReview = await Review.find({ partyPalaceId }).populate(
      "reviewBy"
    );

    if (findReview.length === 0) {
      return res.status(400).json({
        msg: "No review found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Review found successfully",
      error: false,
      success: true,
      data: findReview,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error || "Internal server error",
      success: false,
      error: true,
    });
  }
};
