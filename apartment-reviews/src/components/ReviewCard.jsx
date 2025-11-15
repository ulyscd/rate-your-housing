import { Star } from 'lucide-react';
import { generateUserInitials } from '../utils/helpers';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="review-card bg-gray-50 p-4 rounded-lg mb-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-bold text-blue-600 text-sm">
              {generateUserInitials(review.author_name || 'Anonymous')}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium">
              {review.author_name || 'Anonymous'}
            </p>
            <div className="flex items-center">
              <div className="rating-stars text-sm flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.overall_rating ? 'fill-current' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">
                {formatDate(review.created_at)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-blue-600">{review.overall_rating.toFixed(1)}</p>
          <p className="text-gray-600 text-sm">Overall</p>
        </div>
      </div>
      
      <p className="mt-3 text-gray-700">{review.comment}</p>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {review.pros && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Pros: {review.pros}
          </span>
        )}
        {review.cons && (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            Cons: {review.cons}
          </span>
        )}
        {review.would_recommend && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Would Recommend
          </span>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;