import { useState} from "react"
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/icons/search.svg";
import Microphone from "./Microphon";

const SearchBar = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    const params = new URLSearchParams({ query: searchQuery });
    navigate(`/list?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xs sm:max-w-md mx-auto relative">
      <input 
        type="text"  
        className="w-full bg-[#222C4F] text-white h-[48px] rounded-[16px] pl-10 outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies"
      />
      <button type="submit">
        <img src={searchIcon} 
          alt="search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2  mt-0.5 w-[24px] h-[24px]"
        />
      </button>
      <Microphone
        isListening={isListening}
        setIsListening={setIsListening}
        setSearchQuery={setSearchQuery}
      />
    </form>
  );
};

export default SearchBar;