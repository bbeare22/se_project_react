import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";

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
      <img className="header__logo" src={logo} alt="App logo" />
      <p className="header__date-and-location" aria-live="polite">
        {currentDate}
        {weatherData.city ? `, ${weatherData.city}` : ""}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-button"
        aria-label="Add new clothes"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">{username}</p>
        <img
          src={avatar}
          alt={`Avatar of ${username}`}
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
