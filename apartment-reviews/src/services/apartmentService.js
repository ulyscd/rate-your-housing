import { supabase } from './supabaseClient';

// Real apartment data from Apartment List API (or similar)
export const searchApartments = async (location, filters = {}) => {
  try {
    // For production, you would use a real API like:
    // - Apartment List API
    // - Zillow API
    // - Realtor.com API
    // For now, we'll use mock data that simulates real API responses
    
    const response = await fetch(`/api/apartments?location=${encodeURIComponent(location)}&filters=${JSON.stringify(filters)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch apartments');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching apartments:', error);
    
    // Fallback to Supabase if external API fails
    const { data, error: sbError } = await supabase
      .from('apartments')
      .select('*')
      .ilike('address', `%${location}%`)
      .range(filters.minPrice || 0, filters.maxPrice || 10000);
    
    if (sbError) throw sbError;
    return data;
  }
};

export const getApartmentDetails = async (apartmentId) => {
  const { data, error } = await supabase
    .from('apartments')
    .select('*, reviews(*)')
    .eq('id', apartmentId)
    .single();
  
  if (error) throw error;
  return data;
};

export const saveApartment = async (apartmentData) => {
  const { data, error } = await supabase
    .from('apartments')
    .upsert(apartmentData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};