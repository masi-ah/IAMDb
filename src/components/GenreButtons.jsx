import GenreButton from "./GenreButton";
import { useState } from 'react';

const GenreButtons = () => {
  const genres = ["Crime", "Drama", "Action", "Biography"];
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <div className="flex flex-wrap gap-[10px] justify-center mt-[30px]">
      {genres.map((genre) => (
        <GenreButton 
        key={genre} 
        genre={genre}
        isActive={selectedGenre === genre}
        onClick={() => setSelectedGenre(genre)}
        />
      ))}
    </div>
  );
};

export default GenreButtons;