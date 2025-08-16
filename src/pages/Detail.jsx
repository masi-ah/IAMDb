import { useEffect, useState } from "react";
import flashback from "../assets/icons/flashback.svg";  
import {useNavigate, useParams} from "react-router-dom"    
import toast from "react-hot-toast";

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

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat"
    style={{
          backgroundImage: `linear-gradient(to top, rgba(7,13,35,1) 10%, rgba(7,13,35,0.3) 70%, transparent 100%), 
                     url(${movie.images?.[0]})`
  }}
    >
      <button 
        onClick={handleflashback}
      >
        <img src={flashback} alt="Go back" />
      </button>
      <div>
        <h1>{movie.title || "No Title"}</h1>
        <p>{movie.plot || "No description available."}</p>
      </div>
    </div>
  );
};
export default Detail;
