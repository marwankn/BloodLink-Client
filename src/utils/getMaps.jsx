const mapsApi = import.meta.env.VITE_MAPS_API;

function getGoogleMapsUrl(lat, lng) {
  const coordinates = `${lat},${lng}`;

  return `https://www.google.com/maps?api=${mapsApi}&q=${coordinates}`;
}

export { getGoogleMapsUrl };
