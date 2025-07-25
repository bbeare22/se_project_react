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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ChangeProfileModal from "../ChangeProfileModal/ChangeProfileModal";
import * as api from "../../utils/api";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import {
  fetchClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";
import * as auth from "../../utils/auth";

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

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] =
    useState(false);

  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const closeAllModals = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsChangeProfileModalOpen(false);
    setActiveModal("");
    setSelectedCard({ name: "", link: "", weather: "" });
    setModalContextData(null);
    setError(null);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => {
        console.error("Registration error:", err);
        setError("Failed to register. This email may already be in use.");
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Email or password incorrect");
      });
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleCardLike = ({ _id, likes }) => {
    const isLiked = likes.includes(currentUser._id);
    const token = localStorage.getItem("jwt");

    const likePromise = isLiked
      ? api.removeCardLike(_id, token)
      : api.addCardLike(_id, token);

    likePromise
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Like/Dislike failed:", err));
  };

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        setLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

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

  const handleEditProfileClick = () => {
    setIsChangeProfileModalOpen(true);
  };

  const handleAddItemSubmit = ({ name, link, weather }) => {
    const token = localStorage.getItem("jwt");

    addClothingItem({ name, link, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeAllModals();
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
    const token = localStorage.getItem("jwt");

    deleteClothingItem(modalContextData._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== modalContextData._id)
        );
        closeAllModals();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    auth
      .updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(null);
    window.location.href = "/";
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
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              loggedIn={loggedIn}
              onSignUp={handleOpenRegisterModal}
              onLogIn={handleOpenLoginModal}
            />
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
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute loggedIn={loggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        handleCardClick={handleCardClick}
                        handleCardLike={handleCardLike}
                        onLogout={handleLogout}
                        onEditProfile={handleEditProfileClick}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={closeAllModals}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeAllModals}
            onDeleteClick={openConfirmDeleteModal}
          />

          <ConfirmDeleteModal
            isOpen={activeModal === "confirm-delete"}
            onConfirm={handleDeleteCard}
            onCancel={closeAllModals}
          />

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onRegister={handleRegister}
            error={error}
            onSwitchToLogin={handleSwitchToLogin}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onLogin={handleLogin}
            error={error}
            onSwitchToRegister={handleSwitchToRegister}
          />

          <ChangeProfileModal
            isOpen={isChangeProfileModalOpen}
            onClose={closeAllModals}
            onUpdateProfile={handleUpdateProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
