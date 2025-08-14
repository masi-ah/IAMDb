import { useState } from "react";
// import HeartIcon from "../assets/icons/Favorite.svg"
// import Star from "../assets/icons/star.svg"

const MovieItem = ({movie, onLikeChange }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (onLikeChange) onLikeChange(movie.id, newLiked);
  };

  return (
    <li className="flex items-start bg-[#070D23] mt-4 pb-4 border-b border-b-[1px] border-[rgba(34,44,79,0.5)]  last:border-b-0">
      <img 
      src={movie.poster} 
      alt={movie.title}
      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
      />
      <div className="ml-4 flex-1 flex flex-col ">
        <div className="flex justify-between">
          <div>
            <h3 className="text-white text-[24px] leading-tight mb-0">{movie.title}</h3>
            <p className="text-gray-500 text-xs">{movie.genres.join(",")}</p>
          </div>
          <button onClick={handleLike}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill={liked ? "purple" : "none"}
              strokeWidth="1"
              stroke="white"
              className="transition-all duration-200  hover:fill-purple-500"
              xmlns="http://www.w3.org/200/svg"
              onclick={handleLike}
            >
              <path d="M11.6667 1.27795C10.916 1.28963 10.1816 1.49919 9.53783 1.88547C8.89404 2.27175 8.36357 2.82107 7.99999 3.47795C7.63642 2.82107 7.10595 2.27175 6.46215 1.88547C5.81835 1.49919 5.08403 1.28963 4.33333 1.27795C3.13662 1.32995 2.00913 1.85346 1.19718 2.73411C0.385232 3.61476 -0.0451745 4.78097 -7.46106e-06 5.97795C-7.46106e-06 9.00929 3.19066 12.32 5.86666 14.5646C6.46414 15.0667 7.21956 15.342 7.99999 15.342C8.78042 15.342 9.53585 15.0667 10.1333 14.5646C12.8093 12.32 16 9.00929 16 5.97795C16.0452 4.78097 15.6148 3.61476 14.8028 2.73411C13.9909 1.85346 12.8634 1.32995 11.6667 1.27795ZM9.27666 13.5446C8.91931 13.8455 8.46716 14.0106 7.99999 14.0106C7.53282 14.0106 7.08067 13.8455 6.72333 13.5446C3.29799 10.6706 1.33333 7.91329 1.33333 5.97795C1.28775 5.13443 1.57757 4.30711 2.13957 3.67642C2.70157 3.04573 3.49015 2.66285 4.33333 2.61129C5.1765 2.66285 5.96509 3.04573 6.52708 3.67642C7.08908 4.30711 7.3789 5.13443 7.33333 5.97795C7.33333 6.15477 7.40356 6.32433 7.52859 6.44936C7.65361 6.57438 7.82318 6.64462 7.99999 6.64462C8.1768 6.64462 8.34637 6.57438 8.4714 6.44936C8.59642 6.32433 8.66666 6.15477 8.66666 5.97795C8.62109 5.13443 8.9109 4.30711 9.4729 3.67642C10.0349 3.04573 10.8235 2.66285 11.6667 2.61129C12.5098 2.66285 13.2984 3.04573 13.8604 3.67642C14.4224 4.30711 14.7122 5.13443 14.6667 5.97795C14.6667 7.91329 12.702 10.6706 9.27666 13.542V13.5446Z" fill="white"/>
            </svg>
          </button>
        </div>
        <p 
          className="opacity-80 text-[18px] font-normal mt-[6px] text"
          style={{ color:'rgba(255, 255, 255, 1)'}}
        >
          {movie.year} • {movie.country} • {movie.imdb_rating} </p>
      </div>
    </li>
  );
};

export default MovieItem;