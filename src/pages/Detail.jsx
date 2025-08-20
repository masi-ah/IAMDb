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

  const handleflashback = () => {
    if (window.history.length>1) {
      navigate(-1);
    } else {
      navigate("/");
    }
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
        if (!res.ok) {
          throw new Error("Movie not found");
        }
        const data = await res.json();
        setMovie(data);
        
        console.log("Movie data:", data);

      } catch (error) {
        console.error("Fetch error;", error);
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
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.images?.[0]})`}}
        ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D23] via-[#070D23]/80 to-transparent z-[10]"></div>
        <div className="container mx-auto px-3 sm:px-6 max-w-lg py-4 relative z-[20]">
          <button 
            onClick={handleflashback}
            className="w-10 h-10 flex mb-8 pt-6 items-center" 
          >
            <img src={flashback} alt="Go back" className="w-10 h-10" />
          </button>
        <div className="text-white top-38 mt-auto pb-8">
          <h1
           className="font-bold text-[48px] mt-35" 
           style={{ fontFamily: "'Inter', sans-serif",}}
          >
           {movie.title}
          </h1>
          <div className="relative z-20 text-[12px] font-light -mt-3.5 text-white/40">
            {movie.genres.join(", ")}
          </div>
            <p className="text-white/60 mt-2 text-[14px] leading-[24px]">
            {movie.plot}
            </p>
          <div className="flex items-center gap-3 mt-4">
            {movie.rated && (
              <span className="border bg-[#222C4F] text-white/70  font-normal text-[12px] rounded-[8px] py-[6px] px-[12px] border-none outline-none">{movie.rated}</span>
            )}
            <span className="border bg-[#222C4F] text-white/70  font-normal text-[12px] rounded-[8px] py-[6px] px-[12px] border-none outline-none">{movie.year}</span>
             <span className="border bg-[#222C4F] text-white/70  font-normal text-[12px] rounded-[8px] py-[6px] px-[12px] border-none outline-none">{movie.runtime}</span>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <RatingCircle rating={Number(movie.imdb_rating) || 0} />
            <div>
              <span>{movie.imdb_vote != null ? new Intl.NumberFormat().format(movie.imdb_vote) : "N/A"}</span>
              {movie.rotten_tomatoes_score != null && (
                <span>{new Intl.NumberFormat().format(movie.rotten_tomatoes_score)}% on Rotten Tomatoes</span>
                )}
              {movie.metacritic_score != null ? (
                <span>{new Intl.NumberFormat().format(movie.metacritic_score)} on Metacritic</span>
                ) : null}
            </div>
          </div>
            <div className="w-full flex justify-center mt-4 ">
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
               className="text-white w-full bg-#724CF9 flex items-center justify-center py-[12px] px-[24px] rounded-[12px] mt-4"
                style={{ backgroundColor: "#724CF9" }}
                aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
               {isFavorite ? "Added to Favorites" : "Add to Favorites"}
              </button>
            </div>
         </div>
       </div>
     </div>
    </div>
  )
 };
export default Detail;
