import ApartmentCard from './ApartmentCard';

const ApartmentList = ({ apartments, selectedApartment, onApartmentSelect, loading }) => {
  if (loading) {
    return (
      <div className="lg:w-1/3">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-1/3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Apartments Found
          </h2>
          <p className="text-gray-600">{apartments.length} apartments found</p>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
          {apartments.map(apartment => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              isSelected={selectedApartment?.id === apartment.id}
              onSelect={() => onApartmentSelect(apartment.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApartmentList;