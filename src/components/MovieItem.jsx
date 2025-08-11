import { useState } from "react";

const MovieItem = ({movie}) => {
  return (
    <>
      <img src={movie.poster} alt={movie.title}/>
    </>
  )
}

export default MovieItem;