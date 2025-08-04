import { useState} from "react"
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/icons/search.svg";
// import microphoneIcone from "../assets/icons/microphone.svg";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [isListening, setIsListening] = useState(false);
  // const [error, setError] = useState(null);
  // const [isSupported, setIsSupported] = useState(true);
  // const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
  //     setIsSupported(false);
  //     setError("Your browser does not support speech recognition.");
  //     return;
  //   }
  //   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  //   recognitionRef.current = new SpeechRecognition();
  //   recognitionRef.current.continuous = false;
  //   recognitionRef.current.lang = "en-US";

  //   recognitionRef.current.onstart = () => {
  //     setIsListening(true);
  //     setError(null);
  //   };
  //   recognitionRef.current.onend = () => setIsListening(false);
  //   recognitionRef.current.onresult = (event) => {
      
  //   }
  // },[]);
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
      {/* <button 
        type="button" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center"
      >
        <div className="w-[2px] h-[24px]  bg-[#070D23] mr-[16px]"></div>
        <img 
          src={microphoneIcone} alt="voice search" 
          className="w-[24px] h-[24px] "
        />
      </button> */}
    </form>
  );
};

export default SearchBar;