const GenreButton = ({ genre, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`font-inter text-white transition
        bg-[#222C4F]
        active:bg-[#16203d75]
        hover:bg-[#394b75] 
        rounded-[8px] 
        px-3 py-1.5
        text-[12px] font-normal
        ${isActive ? "bg-[#16203d]" : ""}`}
    >
      {genre}
    </button>
  );
};

export default GenreButton;
