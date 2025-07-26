import { useEffect } from "react";
import "../AuthModal/AuthModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
  error,
  onSwitchToLogin,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      avatar: values.avatar,
      email: values.email,
      password: values.password,
    });
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal__title">Sign Up</h2>
        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name *"
            value={values.name || ""}
            onChange={handleChange}
            required
          />
          <span className="modal__error">{errors.name}</span>

          <input
            className="modal__input"
            type="url"
            name="avatar"
            placeholder="Avatar URL *"
            value={values.avatar || ""}
            onChange={handleChange}
            required
          />
          <span className="modal__error">{errors.avatar}</span>

          <input
            className="modal__input"
            type="email"
            name="email"
            placeholder="Email *"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span className="modal__error">{errors.email}</span>

          <input
            className="modal__input"
            type="password"
            name="password"
            placeholder="Password *"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <span className="modal__error">{errors.password}</span>

          {error && <p className="modal__error-message">{error}</p>}

          <div className="modal__actions">
            <button
              className="modal__submit-button"
              type="submit"
              disabled={!isValid}
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
