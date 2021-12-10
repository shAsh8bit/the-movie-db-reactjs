import React, { useEffect, useState } from "react";
import Movieshome from "./Movieshome";
import "../style/Home.css";
import Search from "./Search";

const IMAGES_API = "https://image.tmdb.org/t/p/w1280";
const MOVIES_API =
  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`;
const Home = () => {
  const [searchterm, setSearchTerm] = useState("");
  const [randomImage, setRandomImage] = useState("");
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const fetchMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRandomImage(
      data.results[random(0, data.results.length - 1)]?.backdrop_path
    );
  };

  useEffect(() => {
    // setInterval(() => fetchMovies(MOVIES_API), 10000);

    fetchMovies(MOVIES_API); // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="header__main">
        <header
          className="header"
          style={{
            backgroundImage: `url(${IMAGES_API}${randomImage})`,
          }}
        >
          <div className="header__text">
            <h1>Welcome.</h1>
            <h2>
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>
             <div className="input">
            <input
                type="text"
                placeholder="Search for a movie,tv show..."
                value={searchterm}
                onChange={handleSearchChange}
                onClick={()=>window.scrollTo(0,140)}
              />
              <button>
                <i className="fas fa-search"></i>
              </button>
            </div> 
          </div>
        </header>
      </div>
      {searchterm !== "" ? (
       <Search searchterm={searchterm} />
      ) : (
        <>
      
          <Movieshome
            status="What's Popular"
            url={`https://api.themoviedb.org/3/movie/popular?api_key=9e57d34c9d5f40f3d7d677700fa03101`}
          />

          <Movieshome
            status="Now Playing in Cinemas"
            backdrop
            url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`}
          />

          <Movieshome
            status="Weekly Trending"
            url={`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`}
          />
          <Movieshome
            status="Top Rated"
            url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`}
          />
          <Movieshome
            status="Upcoming"
            url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`}
          />
        </>
      )}
    </div>
  );
};

export default Home;
