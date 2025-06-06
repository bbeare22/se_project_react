import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const temperature = weatherData?.temp?.F ?? "--";
  const weatherType = weatherData.type?.toLowerCase() ?? "";
  const matchingItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards" aria-live="polite">
        <p className="cards__text">
          Today is {temperature} &deg;F / You may want to wear:
        </p>
        {matchingItems.length > 0 ? (
          <ul className="cards__list">
            {matchingItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
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
