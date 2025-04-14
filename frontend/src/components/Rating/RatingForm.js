import React, { useState } from 'react';

function RatingForm({ onSubmit, initialRating }) {
    const [rating, setRating] = useState(initialRating || 0);

    const handleChange = (e) => {
        setRating(parseInt(e.target.value, 10));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating >= 1 && rating <= 5) {
            onSubmit(rating);
        } else {
            alert('Please select a rating between 1 and 5.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rate this store (1-5):</label>
                <select value={rating} onChange={handleChange}>
                    <option value="0">-- Select --</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button type="submit">Submit Rating</button>
        </form>
    );
}

export default RatingForm;
