import { useEffect, useState } from "react";
import flashback from "../assets/icons/flashback.svg";  
import {useNavigate, useParams} from "react-router-dom"    
import toast from "react-hot-toast";
import RatingCircle from "../components/RatingCircle";
import MovieDetails from "../components/MovieDetails";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const[loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleflashback = () => {
    if (window.history.length>1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const switchFavorite = () => {
    setIsFavorite((prev) => !prev);
    toast.success(isFavorite ? "Removed from Favorites" : "Added to Favorites");
  }

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://moviesapi.codingfront.dev/api/v1/movies/${id}`);
        if (!res.ok) {throw new Error("Movie not found"); }
        const data = await res.json();
        setMovie(data);
        
        // console.log("Movie data:", data);

      } catch (error) {
        // console.error("Fetch error;", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  },[id]);

   if (loading) return (
    <div className="min-h-screen bg-[#070D23] flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );
    if (!movie) return (
  <div className="min-h-screen bg-[#070D23] flex items-center justify-center">
    <div className="text-white text-xl">Movie not found</div>
  </div>
);

  //  console.log("Movie inside render:", movie)

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
        
        <div className="container mx-auto px-3 sm:px-6 max-w-lg -mt-32 relative z-20">
          <div className="text-white pb-8">
            <h1 className="font-bold text-[48px]" style={{ fontFamily: "'Inter', sans-serif" }}>
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
              <div className="text-white text-sm">
                <span>{movie.imdb_vote != null ? new Intl.NumberFormat().format(movie.imdb_vote) : "N/A"}</span>
                {movie.rotten_tomatoes_score != null && (
                  <span>{new Intl.NumberFormat().format(movie.rotten_tomatoes_score)}% on Rotten Tomatoes</span>
                )}
                {movie.metacritic_score != null && (
                  <span>{new Intl.NumberFormat().format(movie.metacritic_score)} on Metacritic</span>
                )}
              </div>
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
                onClick={switchFavorite}
                className="text-white w-full bg-[#724CF9] flex items-center justify-center py-[12px] px-[24px] rounded-[12px] mt-4"
                aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                {isFavorite ? "Added to Favorites" : "Add to Favorites"}
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
              <div className="mt-6 p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <RatingCircle rating={Number(movie.imdb_rating) || 0} size="lg" />
                  <div className="text-white">
                    <div className="font-semibold text-lg">
                      {movie.imdb_rating}/10
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {movie.imdb_vote ? new Intl.NumberFormat().format(movie.imdb_vote) : "N/A"} ratings on IMDB
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {movie.rotten_tomatoes_score != null && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Rotten Tomatoes</span>
                      <span className="text-white font-semibold">{movie.rotten_tomatoes_score}%</span>
                    </div>
                  )}
                  {movie.metacritic_score != null && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Metacritic</span>
                      <span className="text-white font-semibold">{movie.metacritic_score}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-3/5 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-[48px] font-bold mb-2">
                    {movie.title}
                  </h1>
                  <div className="text-gray-400 text-sm">
                    {movie.genres.join(", ")}
                  </div>
                </div>
                <button 
          onClick={handleLike}
          className="p-1 -mt-5 self-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill={liked ? "rgba(114, 76, 249, 1)" : "none"}
            strokeWidth="1"
            stroke={liked ? "rgba(114, 76, 249, 1)" : "white"}
            className={`transition-colors duration-300`}
          >
            <path d="M11.6667 1.27795C10.916 1.28963 10.1816 1.49919 9.53783 1.88547C8.89404 2.27175 8.36357 2.82107 7.99999 3.47795C7.63642 2.82107 7.10595 2.27175 6.46215 1.88547C5.81835 1.49919 5.08403 1.28963 4.33333 1.27795C3.13662 1.32995 2.00913 1.85346 1.19718 2.73411C0.385232 3.61476 -0.0451745 4.78097 -7.46106e-06 5.97795C-7.46106e-06 9.00929 3.19066 12.32 5.86666 14.5646C6.46414 15.0667 7.21956 15.342 7.99999 15.342C8.78042 15.342 9.53585 15.0667 10.1333 14.5646C12.8093 12.32 16 9.00929 16 5.97795C16.0452 4.78097 15.6148 3.61476 14.8028 2.73411C13.9909 1.85346 12.8634 1.32995 11.6667 1.27795ZM9.27666 13.5446C8.91931 13.8455 8.46716 14.0106 7.99999 14.0106C7.53282 14.0106 7.08067 13.8455 6.72333 13.5446C3.29799 10.6706 1.33333 7.91329 1.33333 5.97795C1.28775 5.13443 1.57757 4.30711 2.13957 3.67642C2.70157 3.04573 3.49015 2.66285 4.33333 2.61129C5.1765 2.66285 5.96509 3.04573 6.52708 3.67642C7.08908 4.30711 7.3789 5.13443 7.33333 5.97795C7.33333 6.15477 7.40356 6.32433 7.52859 6.44936C7.65361 6.57438 7.82318 6.64462 7.99999 6.64462C8.1768 6.64462 8.34637 6.57438 8.4714 6.44936C8.59642 6.32433 8.66666 6.15477 8.66666 5.97795C8.62109 5.13443 8.9109 4.30711 9.4729 3.67642C10.0349 3.04573 10.8235 2.66285 11.6667 2.61129C12.5098 2.66285 13.2984 3.04573 13.8604 3.67642C14.4224 4.30711 14.7122 5.13443 14.6667 5.97795C14.6667 7.91329 12.702 10.6706 9.27666 13.542V13.5446Z" />  
          </svg>
        </button>
        </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {movie.plot}
              </p>

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
