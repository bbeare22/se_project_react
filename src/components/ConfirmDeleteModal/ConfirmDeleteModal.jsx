import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onConfirm, onCancel }) {
  const cancelBtn = (
    <button type="button" className="modal__cancel-button" onClick={onCancel}>
      Cancel
    </button>
  );

  return (
    <ModalWithForm
      title=""
      buttonText="Yes, delete item"
      isOpen={isOpen}
      onClose={onCancel}
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm();
      }}
      isDeleteButton={true}
      cancelButton={cancelBtn}
    >
      <p className="modal__warning-message">
        Are you sure you want to delete this item?
      </p>
      <p className="modal__irreversible-text">This action is irreversible.</p>
    </ModalWithForm>
  );
}

export default ConfirmDeleteModal;
