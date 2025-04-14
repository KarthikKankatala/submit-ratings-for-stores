
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getStoreDetails, submitRating } from '../../services/api';
import RatingForm from '../Rating/RatingForm';

function StoreDetail() {
    const { id } = useParams();
    const [store, setStore] = useState(null);
    const [error, setError] = useState('');
    const [userRating, setUserRating] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    const fetchStoreDetails = useCallback(async () => {
        try {
            const response = await getStoreDetails(id);
            setStore(response.store);
            setUserRating(response.userRating);
            setAverageRating(response.store.averageRating);
        } catch (err) {
            setError(err.message || 'Failed to fetch store details');
        }
    }, [id, getStoreDetails]);

    useEffect(() => {
        fetchStoreDetails();
    }, [id, fetchStoreDetails]);

    const handleRatingSubmit = async (ratingValue) => {
        try {
            await submitRating(id, ratingValue);
            fetchStoreDetails();
        } catch (err) {
            setError(err.message || 'Failed to submit rating');
        }
    };

    if (!store) {
        return <div>Loading store details...</div>;
    }

    return (
        <div>
            <h2>{store.name}</h2>
            <p>Address: {store.address}</p>
            <p>Overall Rating: {averageRating ? averageRating.toFixed(2) : 'No ratings yet'}</p>
            {userRating !== null && <p>Your Rating: {userRating}</p>}
            <RatingForm onSubmit={handleRatingSubmit} initialRating={userRating} />
            <h3>Ratings:</h3>
            {store.ratings && store.ratings.length > 0 ? (
                <ul>
                    {store.ratings.map(rating => (
                        <li key={rating.userName}>
                            {rating.userName}: {rating.rating}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No ratings for this store yet.</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default StoreDetail;