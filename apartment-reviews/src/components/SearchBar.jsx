import { Search } from 'lucide-react';
import { PRICE_RANGES, BEDROOM_OPTIONS } from '../utils/constants';

const SearchBar = ({ onSearch, loading }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    priceRange: PRICE_RANGES[0],
    bedrooms: BEDROOM_OPTIONS[0],
    amenities: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by city, neighborhood, or apartment name"
              value={searchParams.location}
              onChange={(e) => setSearchParams(prev => ({
                ...prev,
                location: e.target.value
              }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={searchParams.priceRange.label}
              onChange={(e) => setSearchParams(prev => ({
                ...prev,
                priceRange: PRICE_RANGES.find(range => range.label === e.target.value)
              }))}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PRICE_RANGES.map(range => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
            <select
              value={searchParams.bedrooms}
              onChange={(e) => setSearchParams(prev => ({
                ...prev,
                bedrooms: e.target.value
              }))}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BEDROOM_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option === 'Any' ? 'Beds' : option}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center disabled:opacity-50"
            >
              <Search className="h-4 w-4 mr-1" />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;