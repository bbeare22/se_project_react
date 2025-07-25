import { useState, useEffect } from "react";
import "../AuthModal/AuthModal.css";

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  error,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", avatar: "", email: "", password: "" });
    }
  }, [isOpen]);

  const isFormValid =
    formData.name && formData.avatar && formData.email && formData.password;

  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal__title">Sign Up</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="modal__input"
            type="url"
            name="avatar"
            placeholder="Avatar URL *"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
          <input
            className="modal__input"
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="modal__input"
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="modal__error-message">{error}</p>}

          <div className="modal__actions">
            <button
              className="modal__submit-button"
              type="submit"
              disabled={!isFormValid}
            >
              Sign Up
            </button>
            <span className="modal__alt">
              or{" "}
              <button
                type="button"
                className="modal__alt-link"
                onClick={onSwitchToLogin}
              >
                Log In
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
