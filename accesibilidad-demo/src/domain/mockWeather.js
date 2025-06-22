export const initialWeather = {
  temperature: "",
  humidity: "",
  wind: "",
  pressure: "",
  lat: null,
  lon: null,
  air: {
    co: "",
    no2: "",
    ozone: "",
    pm25: "",
  },
  extras: {
    feelsLike: "",
    sky: "",
    clouds: "",
    visibility: "",
  },
  alerts: {
    temp: "",
    wind: "",
    humidity: "",
    air: "",
  },
};

export const mockWeather = {
  temperature: "23°C",
  humidity: "84%",
  wind: "2.19 m/s",
  pressure: "1011 hPa",
  lat: -0.96,
  lon: -80.73,
  air: {
    co: "76.43",
    no2: "0.61",
    ozone: "50.37",
    pm25: "6.92",
  },
  extras: {
    feelsLike: "25°C",
    sky: "cielo claro",
    clouds: "10%",
    visibility: "10000 m",
  },
  alerts: {
    temp: "BAJA",
    wind: "MEDIA",
    humidity: "MEDIA",
    air: "BAJA",
  },
};
