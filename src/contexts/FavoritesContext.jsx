import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const switchFavorite = (movieId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (movieId) => favorites.has(movieId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, switchFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  return useContext(FavoritesContext);
};

export { FavoritesProvider, useFavorites };
export default FavoritesContext;
