import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from '../utils/constants';

const Map = ({ apartments, selectedApartment, onApartmentSelect }) => {
  return (
    <div className="h-96 lg:h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_MAP_ZOOM}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {apartments.map(apartment => (
          <Marker
            key={apartment.id}
            position={[apartment.latitude, apartment.longitude]}
            eventHandlers={{
              click: () => onApartmentSelect(apartment.id)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{apartment.name}</h3>
                <p className="text-blue-600 font-semibold">
                  ${apartment.price}/month
                </p>
                <p className="text-gray-600">
                  {apartment.bedrooms} bed | {apartment.bathrooms} bath
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;