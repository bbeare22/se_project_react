import { useContext, useEffect, useState } from "react";
import "./ChangeProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ChangeProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({ name: "", avatar: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
      setError("");
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.avatar.trim()) {
      setError("Both fields are required.");
      return;
    }

    onUpdateProfile(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal__title">Change profile data</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name *
            <input
              className="modal__input"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="modal__label">
            Avatar *
            <input
              className="modal__input"
              type="url"
              name="avatar"
              placeholder="Avatar"
              value={formData.avatar}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="modal__error-message">{error}</p>}

          <button
            className="modal__submit-button"
            type="submit"
            disabled={!formData.name || !formData.avatar}
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangeProfileModal;
