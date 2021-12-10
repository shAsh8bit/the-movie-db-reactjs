import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MovieState from "./context/movie/MovieState";
import WatchlistState from "./context/watchlist/WatchlistState";
import MovieDetails from "./components/MovieDetails";
import Watchlist from "./components/Watchlist";
import Favourite from "./components/Favourite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
      <BrowserRouter>
      <WatchlistState>
        <MovieState>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:value/:movieId" element={<MovieDetails/>} />
            <Route path="/watchlist" element={<Watchlist/>} />
            <Route path="/favourite" element={<Favourite/>} />
          </Routes>
        </MovieState>
       </WatchlistState>
      </BrowserRouter>
    </>
  );
}

export default App;
