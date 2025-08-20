const MovieDetails = ({ movie }) => {
  // console.log("Directors:", movie.directors, "writers:", movie.writers)
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(",");
    }
    return value || "";
  };
  const details = [
    { label: "Directors", value: formatValue(movie.director) },
    { label: "Writers", value: formatValue(movie.writer) },
    { label: "Actors", value: formatValue(movie.actors) },
    { label: "Country", value: movie.country },
    { label: "Language", value: movie.language },
    { label: "Awards", value: movie.awards },
  ].filter(item => item.value && item.value.trim() !== "");

  return (
    <div className="text-white">
      <h2 className="font-bold text-[24px] mb-2">Details</h2>
        <div className="flex flex-col">
        {details.map((item, index) => (
          <div 
            key={index}  
            className="flex border-b py-2 last:border-b-0"
            style={{borderColor: "#222c4f"}}
          >
            <span className=" text-[14px] text-white w-[120px]">{item.label}</span>
            <span className="text-gray-500 flex-1 text-[12px]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;