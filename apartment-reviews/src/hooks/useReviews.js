import { useState, useEffect } from 'react';
import { getReviews, addReview, updateReview, deleteReview } from '../services/reviewService';

export const useReviews = (apartmentId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    if (!apartmentId) return;
    
    setLoading(true);
    try {
      const reviewsData = await getReviews(apartmentId);
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData) => {
    try {
      const newReview = await addReview({
        ...reviewData,
        apartment_id: apartmentId
      });
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editReview = async (reviewId, updates) => {
    try {
      const updatedReview = await updateReview(reviewId, updates);
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId ? updatedReview : review
        )
      );
      return updatedReview;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [apartmentId]);

  return {
    reviews,
    loading,
    error,
    createReview,
    editReview,
    removeReview,
    refetch: fetchReviews
  };
};