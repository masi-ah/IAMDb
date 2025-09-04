import GenreButton from "./GenreButton";
import { useState } from "react";
import toast from "react-hot-toast";
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

const loadSteps = [4, 4, 4, 5, 3];

const GenreButtons = () => {
  const [visibleCount, setVisibleCount] = useState(loadSteps[0]);
  const [loadstepIndex, setLoadStepIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const genreFromUrl = searchParams.get("genre") || null;
  const hasMore = visibleCount < allGenre.length;
  
  const handleClick = (genre) => {
    navigate(`/list?genre=${encodeURIComponent(genre)}`);
  };

  const loadMoreGenre = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);

    const toastId = toast.loading('Loading more genres...');

    setTimeout(() => {
      const nextLoadStep =
        loadstepIndex < loadSteps.length
          ? loadSteps[loadstepIndex]
          : loadSteps[loadSteps.length - 1];

      const newVisibleCount = Math.min(visibleCount + nextLoadStep, allGenre.length);
      setVisibleCount(newVisibleCount);
      setLoadStepIndex((prev) => (prev < loadSteps.length ? prev + 1 : prev));
      setLoading(false);

      toast.dismiss(toastId);

      if (newVisibleCount >= allGenre.length) {
        toast.success('All genres have been loaded!');
      } else {
        toast.success('More genres have been loaded!');
      }
    }, 800);
  };

  const visibleGenres = allGenre.slice(0, visibleCount);

  return (
    <div className="max-w-sm mx-auto min-h-screen">
      <InfiniteScroll
        dataLength={visibleGenres.length}
        next={loadMoreGenre}
        hasMore={hasMore}
        loader={
          loading && (
            <p className="text-white text-center w-full py-4">Loading... </p>
          )
        }
        endMessage={
          !hasMore && (
            <p className="text-center text-gray-300 py-4"> All genres are displayed! </p>
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
