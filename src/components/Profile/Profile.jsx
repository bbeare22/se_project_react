import { useNavigate } from "react-router-dom";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
  onLogout,
  onEditProfile,
  handleCardLike,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="profile" style={{ position: "relative" }}>
      <button
        className="profile__close-button"
        onClick={handleBack}
        aria-label="Close Profile and go back home"
      >
        &times;
      </button>

      <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddClick={handleAddClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
      />
    </div>
  );
}

export default Profile;
