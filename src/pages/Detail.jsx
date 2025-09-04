import { useEffect, useState } from "react";
import flashback from "../assets/icons/flashback.svg";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import RatingCircle from "../components/RatingCircle";
import MovieDetails from "../components/MovieDetails";
import MovieRating from "../components/MovieRatings";
import LikeButton from "../components/LikeButton";
import { useFavorites } from "../contexts/FavoritesContext";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { switchFavorite, isFavorite } = useFavorites();

  const handleflashback = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleFavoriteClick = () => {
    const currentlyFavorite = isFavorite(movie.id);
    switchFavorite(movie.id);
    toast.success(
      currentlyFavorite ? "Removed from Favorites" : "Added to Favorites"
    );
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://moviesapi.codingfront.dev/api/v1/movies/${id}`
        );
        if (!res.ok) {
          throw new Error("Movie not found");
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#070D23] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  if (!movie)
    return (
      <div className="min-h-screen bg-[#070D23] flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );

  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className="min-h-screen bg-[#070D23]">
      <div className="md:hidden">
        <div className="relative h-[50vh] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.images?.[0]})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D23] via-[#070D23]/80 to-transparent z-[10]"></div>

          <div className="container mx-auto px-3 sm:px-6 max-w-lg py-4 relative z-[20]">
            <button
              onClick={handleflashback}
              className="w-10 h-10 flex mb-8 pt-6 items-center"
            >
              <img src={flashback} alt="Go back" className="w-10 h-10" />
            </button>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-6 max-w-lg -mt-58 relative z-20">
          <div className="text-white pb-8">
            <h1
              className="font-bold text-[48px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {movie.title}
            </h1>

            <div className="text-[12px] font-light text-white/40 -mt-3">
              {movie.genres.join(", ")}
            </div>

            <p className="text-white/60 mt-2 text-[14px] leading-[24px]">
              {movie.plot}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {movie.rated && (
                <span className="bg-[#222C4F] text-white/70 text-[12px] rounded-[8px] py-[6px] px-[12px]">
                  {movie.rated}
                </span>
              )}
              <span className="bg-[#222C4F] text-white/70 text-[12px] rounded-[8px] py-[6px] px-[12px]">
                {movie.year}
              </span>
              <span className="bg-[#222C4F] text-white/70 text-[12px] rounded-[8px] py-[6px] px-[12px]">
                {movie.runtime}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <RatingCircle rating={Number(movie.imdb_rating) || 0} />
              <div className="text-white text-sm"></div>
              <MovieRating movie={movie} />
            </div>

            <div className="w-full flex justify-center mt-4">
              <img
                src={movie.poster || movie.images?.[0]}
                alt={`${movie.title} Poster`}
                className="w-full h-auto rounded-[18px]"
              />
            </div>

            <div className="mt-4">
              <MovieDetails movie={movie} />
            </div>

            <div className="sticky bottom-4 z-50 w-full max-w-lg mx-auto">
              <button
                onClick={handleFavoriteClick}
                className={`w-full flex items-center justify-center py-[12px] px-[24px] rounded-[12px] mt-4 transition-colors duration-300 ${
                  isMovieFavorite
                    ? "bg-[#222C4F] text-white border border-none"
                    : "bg-[#724CF9] text-white"
                }`}
                aria-label={
                  isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"
                }
              >
                {isMovieFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="relative h-[50vh] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.images?.[0]})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D23] via-[#070D23]/80 to-transparent z-10"></div>
          <div className="container mx-auto px-6 max-w-[920px] py-4 relative z-20">
            <button
              onClick={handleflashback}
              className="w-10 h-10 flex mb-8 items-center"
            >
              <img src={flashback} alt="Go back" className="w-10 h-10" />
            </button>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-[920px] -mt-55 relative z-20">
          <div className="flex gap-20">
            <div className="w-[208px]">
              <img
                src={movie.poster || movie.images?.[0]}
                alt={`${movie.title} Poster`}
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="flex items-center gap-2 pt-4">
                <div className="text-white text-sm"></div>
                <MovieRating movie={movie} />
              </div>
            </div>
            <div className="w-3/5 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-[48px] font-bold mb-2">{movie.title}</h1>
                  <div className="text-gray-400 text-sm">
                    {movie.genres.join(", ")}
                  </div>
                </div>
                <div className="mt-2.5">
                  <LikeButton
                    liked={isFavorite(movie.id)}
                    onClick={handleFavoriteClick}
                  />
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">{movie.plot}</p>

              <div className="flex gap-3 mb-8">
                {movie.rated && (
                  <span className="bg-[#222C4F] text-white text-sm rounded-lg py-2 px-4">
                    {movie.rated}
                  </span>
                )}
                <span className="bg-[#222C4F] text-white text-sm rounded-lg py-2 px-4">
                  {movie.year}
                </span>
                <span className="bg-[#222C4F] text-white text-sm rounded-lg py-2 px-4">
                  {movie.runtime}
                </span>
              </div>
              <div className="mb-8">
                <MovieDetails movie={movie} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
