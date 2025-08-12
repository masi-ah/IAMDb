import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar";
import MovieItem from "../components/MovieItem";

const List = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("query from, URL:", query)
    console.log("genre from, URL:", genre)

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

        if (query) {
          params.push(`q=${encodeURIComponent(query)}`);
        }

        url += params.join('&');

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
        toast.error(`Error:${err.message}`);
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