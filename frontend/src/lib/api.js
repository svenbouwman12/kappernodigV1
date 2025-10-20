const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  // Health check
  async ping() {
    const response = await fetch(`${API_BASE_URL}/api/ping`);
    return response.json();
  },

  // Geocoding service
  async geocode(address) {
    const response = await fetch(`${API_BASE_URL}/api/geocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address })
    });
    const data = await response.json();
    return data.coordinates;
  },

  // Direct geocoding fallback (for development)
  async geocodeDirect(address) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=nl&limit=1`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon)
      };
    }
    return null;
  }
};
