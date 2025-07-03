export async function fetchGoogleAirQuality(lat, lon, apiKey) {
  const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`;
  const body = {
    location: { latitude: lat, longitude: lon },
    extraComputations: ["HEALTH_RECOMMENDATIONS"],
    languageCode: "es"
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('google air');
  const json = await res.json();
  const index = json.indexes && json.indexes[0];
  return {
    uaqi: index ? String(index.aqiDisplay || index.aqi) : '',
    uaqiCategory: index ? index.category : '',
    uaqiPollutant: index ? index.dominantPollutant : '',
    recommendations: json.healthRecommendations || null
  };
}
