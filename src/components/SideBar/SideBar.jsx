import { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const name = currentUser?.name || "User";
  const avatar = currentUser?.avatar;

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {avatar ? (
          <img
            src={avatar}
            alt={`Avatar of ${name}`}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__name">{name}</p>
      </div>

      <button className="sidebar__button" onClick={onEditProfile}>
        Change profile data
      </button>

      <button
        className="sidebar__button sidebar__button_type_logout"
        onClick={onLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
