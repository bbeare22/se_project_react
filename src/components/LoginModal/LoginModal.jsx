import { useEffect } from "react";
import "../AuthModal/AuthModal.css";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  error,
  onSwitchToRegister,
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
    onLogin({
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
        <h2 className="modal__title">Log In</h2>
        <form className="modal__form" onSubmit={handleSubmit} noValidate>
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
