import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({ isOpen, onCloseModal, onAddItem }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({
      name: values.name,
      link: values.link,
      weather: values.weather,
    });
    resetForm();
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      submitButtonClass="modal__submit_add-garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="modal__input"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="link"
          placeholder="Image URL"
          className="modal__input"
          value={values.link || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.link}</span>
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label>
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            className="modal__radio-input"
            required
          />
          Hot
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label>
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Cold
        </label>
        <span className="modal__error">{errors.weather}</span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
