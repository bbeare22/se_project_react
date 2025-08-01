import { checkResponse } from "./checkResponse";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const fahrenheit = data.main?.temp ?? null;
  const celsius =
    fahrenheit !== null ? Math.round((fahrenheit - 32) * (5 / 9)) : null;

  const result = {};
  result.city = data.name;
  result.temp = { F: fahrenheit, C: celsius };
  result.condition = data.weather?.[0]?.main?.toLowerCase() ?? "unknown";
  result.type = getWeatherType(fahrenheit);
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = (sys, now) => {
  if (!sys?.sunrise || !sys?.sunset) return true;
  return sys.sunrise * 1000 < now && now < sys.sunset * 1000;
};

const HOT_THRESHOLD = 86;
const WARM_THRESHOLD = 66;

const getWeatherType = (temperature) => {
  if (temperature == null) return "unknown";

  if (temperature >= HOT_THRESHOLD) {
    return "hot";
  } else if (temperature >= WARM_THRESHOLD) {
    return "warm";
  } else {
    return "cold";
  }
};
