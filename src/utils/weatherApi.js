export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Weather fetch failed: ${res.status} ${res.statusText}`
      );
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main?.temp ?? null };
  result.condition = data.weather?.[0]?.main?.toLowerCase() ?? "unknown";
  result.type = getWeatherType(result.temp.F);
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
