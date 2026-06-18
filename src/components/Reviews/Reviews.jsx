import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./Reviews.css";
import reviewData from "../../data/reviews";

function Reviews() {
    const [reviews, setReviews] = useState(reviewData);

    const [name, setName] = useState("");
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (
            name.trim() === "" ||
            review.trim() === "" ||
            stars === 0
        ) {
            setError("Name, rating, and review are required.");
            return;
        }

        setError("");

        const newReview = {
            id: Date.now(),
            name,
            stars,
            review
        };

        setReviews(prev => [...prev, newReview]);

        setName("");
        setStars(0);
        setReview("");
    }

    const displayedReviews = reviews.filter(
        review => review.stars >= 4
    );

    return (
        <div className="reviews-page">
                        <h2>Customer Reviews</h2>
            <div className="reviews-grid">
            {displayedReviews.length > 0 ? (
                displayedReviews.map((review) => (
                    <UserCard
                        key={review.id}
                        name={review.name}
                        stars={review.stars}
                        review={review.review}
                    />
                ))
            ) : (
                <p>No reviews available.</p>
            )}
    </div>
            <hr />


            <h2>Leave a Review</h2>

            <form onSubmit={handleSubmit} className="review-form">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <span
                            key={rating}
                            onClick={() => setStars(rating)}
                        >
                            {rating <= stars ? "⭐" : "☆"}
                        </span>
                    ))}
                </div>

                <textarea
                    placeholder="Write your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Submit Review
                </button>
            </form>

            

        </div>
    );
}

export default Reviews;