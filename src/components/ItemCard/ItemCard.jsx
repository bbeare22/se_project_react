import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import heartOutline from "../../assets/heart-outline.svg";
import heartFilled from "../../assets/heart-filled.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  const isLoggedIn = !!currentUser?._id;
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  return (
    <li className="card">
      <div className="card__top-row">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className="card__like-button"
            onClick={handleLike}
            aria-label={isLiked ? "Dislike item" : "Like item"}
          >
            <img
              src={isLiked ? heartFilled : heartOutline}
              alt={isLiked ? "Filled heart" : "Empty heart"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
