import React from "react";
import "./Testimonials.scss";

const Testimonials = () => {
  const reviews = [
    {
      name: "Grace Mwangi",
      feedback: "The mobile IV service was amazing! The clinician was professional and very friendly.",
      rating: 5,
    },
    {
      name: "Daniel Otieno",
      feedback: "Fast and efficient service. I felt rejuvenated in just 45 minutes.",
      rating: 4,
    },
    {
      name: "Lilian Karanja",
      feedback: "Highly recommend iDripPlus! Booking was easy and the drip was perfect for recovery.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <p className="subtitle">Trusted by our clients across Nairobi</p>

      <div className="reviews-grid">
        {reviews.map((review, idx) => (
          <div className="review-card" key={idx}>
            <div className="stars">
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
            </div>
            <p className="feedback">"{review.feedback}"</p>
            <h4 className="name">- {review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
