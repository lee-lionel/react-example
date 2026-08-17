import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./Reviews.css";
import reviewData from "../../data/reviews";

const STAR_LABELS = ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"];

function Reviews() {
    const [reviews, setReviews] = useState(reviewData);

    const [name, setName] = useState("");
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [error, setError] = useState("");
    const [posted, setPosted] = useState("");
    /* Was: reviews under 4 stars were filtered out permanently, so a 3-star
       review vanished on submit with no explanation. Hiding bad reviews on a
       review page is also just dishonest. It's a filter the reader controls
       now, and it defaults to showing everything. */
    const [topRatedOnly, setTopRatedOnly] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        if (name.trim() === "" || review.trim() === "" || stars === 0) {
            setError("Name, rating, and review are required.");
            setPosted("");
            return;
        }

        setError("");

        const newReview = { id: Date.now(), name, stars, review };
        setReviews((prev) => [newReview, ...prev]);

        // Say so, and make sure the new review is actually on screen.
        setPosted(`Thanks ${name.trim()} — your ${stars}-star review is posted.`);
        if (stars < 4) setTopRatedOnly(false);

        setName("");
        setStars(0);
        setReview("");
    }

    const displayedReviews = topRatedOnly
        ? reviews.filter((r) => r.stars >= 4)
        : reviews;

    const average =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
            : "0.0";

    return (
        <div className="reviews-page">
            <header className="reviews-head">
                <h2>Customer Reviews</h2>
                <p className="reviews-summary">
                    <strong>{average}</strong> average from {reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"}
                </p>
                <label className="reviews-filter">
                    <input
                        type="checkbox"
                        checked={topRatedOnly}
                        onChange={(e) => setTopRatedOnly(e.target.checked)}
                    />
                    4 stars and up
                </label>
            </header>

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
                    <p>No reviews match that filter.</p>
                )}
            </div>

            <hr />

            <h2>Leave a Review</h2>

            <form onSubmit={handleSubmit} className="review-form">
                <label className="field">
                    <span className="field-label">Your name</span>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                {/* Was a row of bare spans: unreachable by keyboard and
                    invisible to a screen reader, so the form could not be
                    completed without a mouse. */}
                <fieldset className="star-rating" aria-describedby="rating-hint">
                    <legend className="field-label">Your rating</legend>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                            key={rating}
                            type="button"
                            className="star"
                            aria-label={STAR_LABELS[rating - 1]}
                            aria-pressed={stars === rating}
                            onClick={() => setStars(rating)}
                        >
                            {rating <= stars ? "⭐" : "☆"}
                        </button>
                    ))}
                    <span id="rating-hint" className="sr-only">
                        Choose a rating from one to five stars
                    </span>
                </fieldset>

                <label className="field">
                    <span className="field-label">Your review</span>
                    <textarea
                        placeholder="Write your review..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>

                {error && (
                    <p className="error" role="alert">
                        {error}
                    </p>
                )}

                {posted && (
                    <p className="posted" role="status">
                        {posted}
                    </p>
                )}

                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default Reviews;
