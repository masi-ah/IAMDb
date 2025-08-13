import { useState } from "react";
import HeartIcon from "../assets/icons/Favorite.svg"

const MovieItem = ({movie, onLikeChange }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (onLikeChange) onLikeChange(movie.id, newLiked);
  };

  return (
    <li className="flex item-start bg-[#070D23]">
      <img 
      src={movie.poster} 
      alt={movie.title}
      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
      />
    </li>
  )
}

export default MovieItem;