import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  cancelButton, // new prop
  isDeleteButton,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__content">
        {title && (
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
        )}
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        ></button>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              !isValid ? "modal__submit_disabled" : ""
            } ${isDeleteButton ? "modal__submit_delete" : ""}`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
          {cancelButton && (
            <div className="modal__cancel-button-wrapper">{cancelButton}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
