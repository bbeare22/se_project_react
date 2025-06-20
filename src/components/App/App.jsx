import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

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
    setCardToDelete(null);
    setIsConfirmDeleteOpen(false);
  };

  const handleAddItemSubmit = (item) => {
    setClothingItems([item, ...clothingItems]);
    closeActiveModal();
  };

  const openConfirmDeleteModal = (card) => {
    setCardToDelete(card);
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setCardToDelete(null);
    setIsConfirmDeleteOpen(false);
  };

  const handleDeleteCard = () => {
    setClothingItems((items) =>
      items.filter((item) => item._id !== cardToDelete._id)
    );
    closeConfirmDeleteModal();
    closeActiveModal();
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
    <BrowserRouter>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          {error && <p className="error-message">{error}</p>}
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={closeActiveModal}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteClick={openConfirmDeleteModal}
        />

        <ConfirmDeleteModal
          isOpen={isConfirmDeleteOpen}
          onConfirm={handleDeleteCard}
          onCancel={closeConfirmDeleteModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
