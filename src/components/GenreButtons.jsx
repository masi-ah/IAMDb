import GenreButton from "./GenreButton";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const allGenre = [
  "Crime",
  "Drama",
  "Action",
  "Biography",
  "History",
  "Adventure",
  "Fantasy",
  "Western",
  "Comedy",
  "Sci-Fi",
  "Romance",
  "Mystery",
  "Family",
  "War",
  "Thriller",
  "Horror",
  "Music",
  "Animation",
  "Film-Noir",
  "Sport",
];

const loadsteps = [4, 4, 4, 5, 3];

const GenreButtons = () => {
  const [visibleCount, setVisibleCount] = useState(loadsteps[0]);
  const [loadstepIndex, setLoadStepIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const genreFromUrl = searchParams.get("genre") || null;

  const handleClick = (genre) => {
    navigate(`/list?genre=${encodeURIComponent(genre)}`);
  };

  const loadMoreGenre = () => {
    // console.log("loading more...")
    if (loading) return;
    if (visibleCount >= allGenre.length) return;
    setLoading(true);

    setTimeout(() => {
      const nextLoadStep =
        loadstepIndex < loadsteps.length
          ? loadsteps[loadstepIndex]
          : loadsteps[loadsteps.length - 1];

      setVisibleCount((prev) => Math.min(prev + nextLoadStep, allGenre.length));
      setLoadStepIndex((prev) => (prev < loadsteps.length ? prev + 1 : prev));
      setLoading(false);
    }, 800);
  };

  const visibleGenres = allGenre.slice(0, visibleCount);
  console.log("visibleCount:", visibleCount);

  return (
    <div
      id="scrollableDiv"
      className="max-w-sm mx-auto h-[80vh] overflow-y-auto "
    >
      <InfiniteScroll
        dataLength={visibleCount}
        next={loadMoreGenre}
        hasMore={visibleCount < allGenre.length}
        loader={
          loading && (
            <p className="text-white text-center w-full py-4">Loading... </p>
          )
        }
      >
        <div className="flex flex-wrap gap-[10px] justify-center mt-[30px]">
          {visibleGenres.map((genre) => (
            <GenreButton
              key={genre}
              genre={genre}
              isActive={genre === genreFromUrl}
              onClick={() => handleClick(genre)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default GenreButtons;
