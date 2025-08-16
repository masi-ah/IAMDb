import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import List from "./pages/List";
import Detail from "./pages/Detail";

import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:genre" element={<List />} />
          <Route path="/detail/:id" element={<Detail/>} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
