import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  username = "Terrence Tegegne",
}) {
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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
          aria-label="Add new clothes"
        >
          + Add clothes
        </button>
      </div>
      <Link to="/profile" className="header__user-container">
        <p className="header__username">{username}</p>
        <img
          src={avatar}
          alt={`Avatar of ${username}`}
          className="header__avatar"
        />
      </Link>
    </header>
  );
}

export default Header;
