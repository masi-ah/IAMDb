import RatingCircle from "../components/RatingCircle";


const MovieRating = ({ movie }) => {
   let ratings = [];
  try {
    if (movie?.ratings) {
      ratings = JSON.parse(movie.ratings);
    }
  } catch (err) {
    console.error("Failed to parse ratings:", movie?.ratings, err);
  }

  const rotten = ratings.find((r) => r.Source === "Rotten Tomatoes");
  const metacritic = ratings.find((r) => r.Source === "Metacritic");

  const rottenRating = rotten?.Value?.includes("%")
    ? rotten.Value
    : rotten?.Value
    ? `${rotten.Value}%`
    : null;

  const metacriticRating = metacritic?.Value || null;

  let imdbVotes = null;
  if (movie?.imdb_votes && !isNaN(Number(movie.imdb_votes.replace(/,/g, "")))) {
    imdbVotes = new Intl.NumberFormat().format(
      Number(movie.imdb_votes.replace(/,/g, ""))
    );
  }

  return (
    <div>
    <div className="flex flex-row mt-4 space-y-5 gap-10 md:hidden">
      {imdbVotes && (
        <div className="flex flex-col items-start">
          <span className="text-white text-[16px] font-roboto">{imdbVotes}</span>
          <span className="text-white/60 text-[14px]">rating on IMDB</span>
        </div>
      )}
       <div className="flex flex-col leading-[18px] text-[13px] gap-2">
      {rottenRating && (
        <div className="flex gap-1">
          <span className="text-white/60 ">{rottenRating}</span>
          <span className="text-white/60">on Rotten Tomatoes</span>
        </div>
      )}
      {metacriticRating && (
        <div className="flex gap-1">
          <span className="text-white/60">{metacriticRating}</span>
          <span className="text-white/60">on Metacritic</span>
        </div>
      )}
       </div>
      </div>
      <div className=" hidden md:flex flex-col gap-4">
        <div className="flex items-center gap-4 text-[14px]">
            <RatingCircle rating={Number(movie.imdb_rating) || 0} />
             {/* <div className="flex flex-col gap-2"> */}
             {imdbVotes && (
            <div className="flex flex-col">
              <span className="text-white font-roboto font-bold leading-[24px]">{imdbVotes}</span>
              <span className="text-white/60 text-[14px]">rating on IMDB</span>
            </div>
          )}
          </div>
          <div className=" flex flex-col leading-[10px] mt-4 gap-4">
           {rottenRating && (
            <div className="flex flex-row items-center text-{13px} gap-1">
              <span className="text-white/60 font-inter font-normal">{rottenRating}</span>
              <span className="text-white/60">on Rotten Tomatoes</span>
            </div>
          )}
          {metacriticRating && (
            <div className="flex flex-row items-center gap-1">
              <span className="text-white/60 font-inter font-normal">{metacriticRating}</span>
              <span className="text-white/60">on Metacritic</span>
            </div>
          )}
         </div>
      </div>
     </div>
   );
};

export default MovieRating;
