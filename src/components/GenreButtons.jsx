import GenreButton from "./GenreButton";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const GenreButtons = () => {
  const genres = ["Crime", "Drama", "Action", "Biography"];
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate();
   
  const handleClick = (genre) => {
    setSelectedGenre(genre);
    navigate(`/list/${genre.toLowerCase()}`);
  };

  return (
    <div className="flex flex-wrap gap-[10px] justify-center mt-[30px]">
      {genres.map((genre) => (
        <GenreButton 
        key={genre} 
        genre={genre}
        isActive={selectedGenre === genre}
        onClick={() => handleClick(genre)}
        />
      ))}
    </div>
  );
};

export default GenreButtons;