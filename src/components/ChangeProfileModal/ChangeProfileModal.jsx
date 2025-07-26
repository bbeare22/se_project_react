import { useContext, useEffect } from "react";
import "./ChangeProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function ChangeProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
      resetForm(
        {
          name: currentUser.name || "",
          avatar: currentUser.avatar || "",
        },
        {},
        true
      );
    }
  }, [currentUser, isOpen, setValues, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      name: values.name,
      avatar: values.avatar,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal__title">Change profile data</h2>

        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          <label className="modal__label">
            Name *
            <input
              className="modal__input"
              type="text"
              name="name"
              placeholder="Name"
              value={values.name || ""}
              onChange={handleChange}
              required
            />
            <span className="modal__error">{errors.name}</span>
          </label>

          <label className="modal__label">
            Avatar *
            <input
              className="modal__input"
              type="url"
              name="avatar"
              placeholder="Avatar URL"
              value={values.avatar || ""}
              onChange={handleChange}
              required
            />
            <span className="modal__error">{errors.avatar}</span>
          </label>

          <button
            className="modal__submit-button"
            type="submit"
            disabled={!isValid}
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeProfileModal;
