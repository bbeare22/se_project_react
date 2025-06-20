import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  if (!card) return null;

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-caption"
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
          aria-label="Close preview modal"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-row">
            <h2 id="modal-caption" className="modal__caption">
              {card.name}
            </h2>
            <button
              className="modal__delete-button"
              onClick={() => onDeleteClick(card)}
              aria-label="Delete item"
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
