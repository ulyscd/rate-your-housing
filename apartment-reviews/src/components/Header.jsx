import { Home, Plus, User } from 'lucide-react';

const Header = ({ onAddReview }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Home className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-blue-600">ApartmentReviews</h1>
          <p className="ml-4 text-gray-600 hidden md:block">
            Find apartments and read honest reviews
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onAddReview}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Review
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;