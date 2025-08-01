import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    const params = new URLSearchParams({ query: searchQuery });
    navigate(`/list?${params.toString()}`);
  };

}