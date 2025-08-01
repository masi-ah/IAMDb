import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";
import SearchBar from "./components/SearchBar";

import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Header/>
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail/:id" element={<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App
