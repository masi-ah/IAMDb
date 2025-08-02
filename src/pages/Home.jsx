import SearchBar from "../components/SearchBar";
// import GenreButtons from "../components/GenreButtons";
const Home = () => {
  return (
    <div className="min-h-screen bg-[#070D23]">
    <h1 className="text-center font-extrabold text-[100px] text-white mb-[12px] pt-[240px]">IAMDb</h1>
    <SearchBar/>
    {/* <GenreButtons/> */}
    </div>
  );
};

export default Home;