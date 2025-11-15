import { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { calculateAverageRating, getRatingBreakdown } from '../utils/helpers';

const ReviewSection = ({ apartment, reviews, onCreateReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const averageRating = calculateAverageRating(reviews);
  const ratingBreakdown = getRatingBreakdown(reviews);

  const ratingCategories = [
    { key: 'management', label: 'Management' },
    { key: 'cleanliness', label: 'Cleanliness' },
    { key: 'safety', label: 'Safety' },
    { key: 'noise', label: 'Noise Level' },
    { key: 'maintenance', label: 'Maintenance' }
  ];

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Apartment Header */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{apartment.name}</h2>
              <div className="flex items-center mt-2">
                <div className="rating-stars text-xl flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.floor(averageRating)
                          ? 'fill-current'
                          : star === Math.ceil(averageRating) && averageRating % 1 !== 0
                          ? 'fill-current opacity-50'
                          : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-700 text-lg">
                  {averageRating.toFixed(1)} Overall Rating
                </span>
                <span className="ml-4 text-gray-600">{reviews.length} Reviews</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Write a Review
              </button>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
            {ratingCategories.map(category => (
              <div
                key={category.key}
                className="text-center p-3 bg-blue-50 rounded-lg"
              >
                <p className="text-sm text-gray-600">{category.label}</p>
                <div className="rating-stars mt-1 flex justify-center">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(ratingBreakdown[category.key] || 0)
                          ? 'fill-current'
                          : star === Math.ceil(ratingBreakdown[category.key] || 0) && 
                            (ratingBreakdown[category.key] || 0) % 1 !== 0
                          ? 'fill-current opacity-50'
                          : ''
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 font-medium">
                  {(ratingBreakdown[category.key] || 0).toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <ReviewForm
            apartment={apartment}
            onSubmit={async (reviewData) => {
              await onCreateReview(reviewData);
              setShowReviewForm(false);
            }}
            onCancel={() => setShowReviewForm(false)}
          />
        )}

        {/* Reviews List */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Reviews</h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review this apartment!
            </div>
          ) : (
            reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;