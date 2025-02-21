import React, { useContext, useState } from "react";
import { FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { toast } from "react-toastify";

const Review = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewData, setReviewData] = useState({});
  const { id: partyPalaceId } = useParams() || {};
  const { createReview, loading } = useContext(userContext) || {};

  // Handle review data update
  const handleReviewData = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value, partyPalaceId });
  };

  // Submit review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewData.comment || !reviewData.ratings) {
      toast.error("provide both a comment and rating.");
      return;
    }
    createReview(reviewData);
    setReviewData((prev) => ({
      ...prev,
      comment: "",
      ratings: null,
    }));
    setRating(null)
  };

  return (
    <section className="bg-neutral-50 w-full rounded-md p-2 max-w-7xl mx-auto">
      <p className="font-bold text-2xl tracking-wider">Customer Reviews</p>

      {/* Example Review */}
      <div className="flex gap-4 mt-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={""} className="w-full h-full object-cover bg-neutral-200" />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <span className="font-semibold">UserName</span>
            <span className="text-sm text-neutral-500">2 days ago</span>
          </div>
          <span className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#FBAD34]" size={20} />
            ))}
          </span>
          <p className="mt-1 text-neutral-500 break-words">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      </div>

      {/* Review Form */}
      <form className="bg-neutral-100 w-full mt-4 rounded-md p-2">
        <p className="font-semibold text-neutral-800 text-xl tracking-wide">
          Write a Review
        </p>
        <textarea
          className="w-full bg-white rounded-md p-2 mt-2 border border-neutral-300 resize-none outline-none focus:border-[#FBAD34]"
          rows={4}
          maxLength={200}
          placeholder="Share your thoughts about our place"
          value={reviewData.comment || ""}
          name="comment"
          onChange={handleReviewData}
        />

        {/* Star Rating */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <React.Fragment key={currentRating}>
                  <input
                    type="radio"
                    id={`star-${currentRating}`}
                    onClick={() => {
                      setRating(currentRating);
                      setReviewData((prev) => ({
                        ...prev,
                        ratings: currentRating,
                      }));
                    }}
                    value={currentRating}
                    hidden
                    name="ratings"
                    onChange={handleReviewData}
                  />
                  <label htmlFor={`star-${currentRating}`}>
                    <FaStar
                      color={
                        currentRating <= (hover || rating) ? "#FBAD34" : ""
                      }
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                      size={24}
                      className="cursor-pointer"
                    />
                  </label>
                </React.Fragment>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleReviewSubmit}
            className="p-2 rounded-md bg-black text-white tracking-wide cursor-pointer flex items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                <FaArrowAltCircleRight />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Review;
