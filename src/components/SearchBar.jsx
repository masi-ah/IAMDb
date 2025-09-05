import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/icons/search.svg";
import Microphone from "./Microphone";

const SearchBar = ({ initialValue = "", onSearch, delay = 500 }) => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const navigate = useNavigate();
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);


  useEffect(() => {
    setSearchQuery(initialValue);
    setDebouncedQuery(initialValue); 
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  useEffect(() => {
    if (!onSearch) return;
    if (debouncedQuery.trim() === "") return; 

    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return; 

    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/list?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[406px] md:max-w-[920px] mx-auto relative"
    >
      <input
        type="text"
        className="w-full bg-[#222C4F] text-white h-[48px] rounded-[16px] pl-10 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies"
      />
      <button type="submit">
        <img
          src={searchIcon}
          alt="search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2  mt-0.5 w-[24px] h-[24px]"
        />
      </button>
      <Microphone
        isListening={isListening}
        setIsListening={setIsListening}
        setSearchQuery={setSearchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
        }}
      />
    </form>
  );
};

export default SearchBar;
