import { useState, useEffect, useCallback } from "react";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: null },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    weather: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [error, setError] = useState(null);

  const handleCardClick = useCallback((item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  }, []);

  const handleAddClick = () => {
    const capitalizedWeather = weatherData.type
      ? weatherData.type.charAt(0).toUpperCase() + weatherData.type.slice(1)
      : "";
    setWeatherType(capitalizedWeather);
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setName("");
    setImageUrl("");
    setWeatherType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGarment = {
      _id: Date.now().toString(),
      name,
      link: imageUrl,
      weather: weatherType.toLowerCase(),
    };
    setClothingItems((prevItems) => [newGarment, ...prevItems]);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setError(null);
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch weather data.");
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        {error && <p className="error-message">{error}</p>}
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
        <Footer />
      </div>

      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name*
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image*
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="weatherType"
              value="Hot"
              checked={weatherType === "Hot"}
              onChange={(e) => setWeatherType(e.target.value)}
              required
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weatherType"
              value="Warm"
              checked={weatherType === "Warm"}
              onChange={(e) => setWeatherType(e.target.value)}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weatherType"
              value="Cold"
              checked={weatherType === "Cold"}
              onChange={(e) => setWeatherType(e.target.value)}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
