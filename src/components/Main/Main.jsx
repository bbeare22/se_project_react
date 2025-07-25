import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperatureValue = weatherData?.temp?.[currentTemperatureUnit] ?? "--";
  const weatherType = weatherData.type?.toLowerCase() ?? "";

  const matchingItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards" aria-live="polite">
        <p className="cards__text">
          Today is {temperatureValue} &deg;{currentTemperatureUnit} / You may
          want to wear:
        </p>
        {matchingItems.length > 0 ? (
          <ul className="cards__list">
            {matchingItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
        ) : (
          <p className="cards__empty">No recommended items for this weather.</p>
        )}
      </section>
    </main>
  );
}

export default Main;
