                                                                                                                                                                                                                                                  
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

  useEffect(() => {
   console.log("useEffect triggered");
   console.log("query:", query);
   console.log("genre:", genre);
   
   if ((!query && !genre)) return;

   const controller = new AbortController();
   const signal = controller.signal;


   setMovies([]);
   setLoading(true);

    const fetchMovies = async () => {
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

        const res = await fetch(url, {signal});

        if(!res.ok) {
          throw new Error("failed to fetch movies");
        } 

        const data = await res.json();
        const moviesData = data.data || data;
        console.log("movies API response:", moviesData)

        setMovies(moviesData);
        
        if (moviesData.length === 0) {
          toast("no movies found for your search.")
        }
      } catch (err) {
        if (err.name !== "AbortError") toast.error(`Error: ${err.message}`);
          // console.log("fetch aborted")
      } finally {
        setLoading(false);
      }
    };
       fetchMovies();

      return () => {
        controller.abort();
      }
      }, [genre, query]);

  const handleSearch = (searchQuery) => {
    navigate(`/list?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-[#070D23] px-3 sm:px-6 md:max-w-[920px] max-w-[406px] mx-auto">
      <div className="sticky top-0 bg-[#070D23] z-10 pt-6 mb-8 flex justify-between items-center">
          <button 
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center"
          >
            <img src={flashback} alt=" go back" className="w-10 h-10"/>
          </button>
          <div className=" flex flex-col items-center">
          <span className="text-white font-bold  ">Result</span>
          <span className="text-gray-500 text-xs font-light text-center">for "Search Query"</span>
          </div>
          <div className="w-10"/>
        </div>
        <SearchBar initialQuery={query} onSearch={handleSearch} />
      {loading ? (
        <div className="text-center text-white mt-6"> loading movies...</div>
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