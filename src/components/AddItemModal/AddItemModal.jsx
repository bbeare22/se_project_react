import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onCloseModal, onAddItem }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("hot");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
      setWeather("hot");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      submitButtonClass="modal__submit_add-garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isValid={name && link && weather}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          className="modal__input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label>
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
            className="modal__radio-input"
          />
          Hot
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
