import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import Home from "./pages/homepage/Home";
import PokeInfo from "./pages/details/PokeInfo";
import "./shared/components/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info:id" element={<PokeInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
