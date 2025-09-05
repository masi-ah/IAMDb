import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try{
    const saved = localStorage.getItem("favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  } catch (error){
    console.error("Error loading favorites from localStorage:", error);
    return new Set();
  }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify([...favorites]));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
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
