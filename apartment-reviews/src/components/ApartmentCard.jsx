import { MapPin, Star } from 'lucide-react';
import { formatPrice, calculateAverageRating } from '../utils/helpers';

const ApartmentCard = ({ apartment, isSelected, onSelect }) => {
  const averageRating = calculateAverageRating(apartment.reviews || []);

  return (
    <div
      className={`apartment-card border-b p-4 hover:bg-gray-50 transition cursor-pointer ${
        isSelected ? 'selected-apartment bg-blue-50' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{apartment.name}</h3>
          <div className="flex items-center mt-1">
            <div className="rating-stars flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(averageRating)
                      ? 'fill-current'
                      : star === Math.ceil(averageRating) && averageRating % 1 !== 0
                      ? 'fill-current opacity-50'
                      : ''
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-700">
              {averageRating.toFixed(1)} ({apartment.reviews?.length || 0} reviews)
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">
            {formatPrice(apartment.price)}
          </p>
          <p className="text-gray-600 text-sm">
            {apartment.bedrooms} bd | {apartment.bathrooms} ba
          </p>
        </div>
      </div>
      <p className="text-gray-600 mt-2 flex items-center">
        <MapPin className="h-4 w-4 text-red-500 mr-1" />
        {apartment.address}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {apartment.amenities?.slice(0, 3).map(amenity => (
          <span
            key={amenity}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
          >
            {amenity}
          </span>
        ))}
        {apartment.amenities?.length > 3 && (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            +{apartment.amenities.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};

export default ApartmentCard;