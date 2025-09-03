import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/icons/search.svg";
import Microphone from "./Microphone";

const SearchBar = ({ initialValue = "", onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    navigate(`/list?query=${encodeURIComponent(searchQuery)}`);
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
          if (onSearch) {
            onSearch(query);
          } else {
            navigate(`/list?query=${encodeURIComponent(query)}`);
          }
        }}
      />
    </form>
  );
};

export default SearchBar;
