import { useState, useEffect } from 'react';
import { searchApartments, getApartmentDetails } from '../services/apartmentService';

export const useApartments = (initialLocation = 'New York, NY') => {
  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (location, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchApartments(location, filters);
      setApartments(results);
      if (results.length > 0) {
        setSelectedApartment(results[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectApartment = async (apartmentId) => {
    try {
      const apartment = await getApartmentDetails(apartmentId);
      setSelectedApartment(apartment);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    search(initialLocation);
  }, [initialLocation]);

  return {
    apartments,
    selectedApartment,
    loading,
    error,
    search,
    selectApartment
  };
};