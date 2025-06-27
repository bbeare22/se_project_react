import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  fetchClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [error, setError] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [modalContextData, setModalContextData] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = useCallback((item) => {
    setActiveModal("preview");
    setSelectedCard(item);
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({ name: "", link: "", weather: "" });
    setModalContextData(null);
  };

  const handleAddItemSubmit = ({ name, link, weather }) => {
    addClothingItem({ name, link, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  const openConfirmDeleteModal = (card) => {
    setModalContextData(card);
    setActiveModal("confirm-delete");
  };

  const handleDeleteCard = () => {
    deleteClothingItem(modalContextData._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== modalContextData._id)
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
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

  useEffect(() => {
    fetchClothingItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Failed to fetch items:", err);
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

          <main className="main-content">
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
          </main>

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
          isOpen={activeModal === "confirm-delete"}
          onConfirm={handleDeleteCard}
          onCancel={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
