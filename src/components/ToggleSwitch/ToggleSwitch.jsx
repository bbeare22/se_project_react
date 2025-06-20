import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch" aria-label="Toggle temperature unit">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "F"}
      />
      <span className="switch__track">
        <span
          className={`switch__label ${
            currentTemperatureUnit === "F" ? "switch__active" : ""
          }`}
        >
          F
        </span>
        <span
          className={`switch__label ${
            currentTemperatureUnit === "C" ? "switch__active" : ""
          }`}
        >
          C
        </span>
        <span
          className={
            currentTemperatureUnit === "F"
              ? "switch__slider switch__slider-F"
              : "switch__slider switch__slider-C"
          }
        ></span>
      </span>
    </label>
  );
};

export default ToggleSwitch;
