import { useState } from "react";
import "../AuthModal/AuthModal.css";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  error,
  onSwitchToRegister,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal__title">Log In</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
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
              disabled={!formData.email || !formData.password}
            >
              Log In
            </button>
            <span className="modal__alt">
              or{" "}
              <button
                type="button"
                className="modal__alt-link"
                onClick={onSwitchToRegister}
              >
                Sign Up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
