import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar";
import MovieItem from "../components/MovieItem";
import flashback from "../assets/icons/flashback.svg";

const List = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   console.log("useEffect triggered");
   console.log("query:", query);
    console.log("genre:", genre);

   setMovies([]);
   setError(null);

   if (!query && !genre) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try{
        let url = 'https://moviesapi.codingfront.dev/api/v1/movies?';
        const params = [];

        if (genre) {
          params.push(`genres=${encodeURIComponent(genre)}`);
        }

        else if (query) {
          params.push(`q=${encodeURIComponent(query)}`);
        }

        url += params.join('&');
        console.log("fetching URL:", url);

        const res = await fetch(url);

        if(!res.ok) {
          throw new Error("failed to fetch movies");
        } 

        const data = await res.json();
        const moviesData = data.data || data;

        setMovies(moviesData);

        if (moviesData.length === 0) {
          toast("no movies found for your search.")
        }
  
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre, query]);

  const handleSearch = (searchQuery) => {
    navigate(`/list?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="list-container bg-[#070D23]">
      <div className="header relative top-[10px] mb-[10px] flex items-center">
        <button 
        onClick={() => navigate("/")}
        className="p-[15px] pt-[32px]"
        >
          <img src={flashback} alt=" go back" />
        </button>
        <div className=" flex flex-col items-center mx-auto mt-[25px] ml-[90px]">
        <span className="text-white text-center font-bold  ">Result</span>
        <span className="text-gray-500 text-[12px] font-light text-center">for "Search Query"</span>
        </div>
      </div>
      <div className="mt-[32px]">
        <SearchBar initialQuery={query} onSearch={handleSearch} />
      </div>
      {loading ? (
        <div> loading movies...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
      <ul>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
      )}
    </div>
   );
  }
export default List;