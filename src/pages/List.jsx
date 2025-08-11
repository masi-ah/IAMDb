import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar";
import MovieItem from "../components/MovieItem";

const List = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try{
        const res = await fetch(
          `https://moviesapi.codingfront.dev/api/v1/movies?q=${encodeURIComponent(query)}`
        );

        if(!res.ok) {
          throw new Error("faild to fetch movies");
        } 

        const data = await res.json();
        const moviesData = data.data || data;
        setMovies(moviesData);

        if (moviesData.length === 0) {
          toast("no movies found for your search.")
        }
      } catch (err) {
        setError(err.message);
        toast.error(`Error:${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (searchQuery) => {
    navigate(`/list?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="mb-[32px]">
      <SearchBar initialQuery={query} onSearch={handleSearch} />
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