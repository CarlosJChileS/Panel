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
  water: {
    temp: "",
    oxygen: "",
    salinity: "",
    chlorophyll: "",
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
  water: {
    temp: "76°C",
    oxygen: "8.8",
    salinity: "36.5ppt",
    chlorophyll: "76.2",
  },
  alerts: {
    temp: "BAJA",
    wind: "MEDIA",
    humidity: "MEDIA",
    air: "BAJA",
  },
};
