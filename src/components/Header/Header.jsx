import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, loggedIn, onSignUp, onLogIn }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header" role="banner">
      <Link to="/">
        <img className="header__logo" src={logo} alt="App logo" />
      </Link>
      <p className="header__date-and-location" aria-live="polite">
        {currentDate}
        {weatherData.city ? `, ${weatherData.city}` : ""}
      </p>

      <div className="header__controls">
        <ToggleSwitch />
        {loggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-button"
              aria-label="Add new clothes"
            >
              + Add clothes
            </button>
            {currentUser && (
              <Link to="/profile" className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`Avatar of ${currentUser.name}`}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            )}
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={onSignUp}
              className="header__auth-button"
              aria-label="Sign Up"
            >
              Sign Up
            </button>
            <button
              onClick={onLogIn}
              className="header__auth-button"
              aria-label="Log In"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
