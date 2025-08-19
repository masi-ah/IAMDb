import { useEffect, useState } from "react";
import flashback from "../assets/icons/flashback.svg";  
import {useNavigate, useParams} from "react-router-dom"    
import toast from "react-hot-toast";
import RatingCircle from "../components/RatingCircle";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const[loading, setLoading] = useState(true);

  const handleflashback = () => {
    if (window.history.length>1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

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

  if (loading) return <div> Loading...</div>;
   if (!movie) return <div>Movie not found</div>

  //  console.log("Movie inside render:", movie)

  return (
    <div className="min-h-screen bg-[#070D23]">
      <div className="relative h-[40vh]">
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
        <div className="text-white absolute top-38 mt-auto pb-8">
          <h1
           className="font-bold text-[48px] mb-0" 
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
            <div className="w-full mt-4 overflow-hidden rounded-[18px]">
              <img
               src={movie.poster || movie.images?.[0]} 
               alt={`${movie.title} Poster`}
               className="w-full h-[406px] object-cover object-top"
               />
            </div>
         </div>
       </div>
     </div>
    </div>
  )
 };
export default Detail;
