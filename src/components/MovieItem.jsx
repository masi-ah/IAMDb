import { useState } from "react";

const MovieItem = ({movie}) => {
  return (
    <>
      <img 
      src={movie.poster} alt={movie.title}
      className="w-[122px] h-[122px] rounded-[18px] object-cover"
      />
    </>
  )
}

export default MovieItem;