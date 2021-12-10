import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import WatchlistContext from "../context/watchlist/WatchlistContext";
import "../style/Movieshome.css";

const image_api = "https://image.tmdb.org/t/p/w1280";

const Movieshome = ({ status, url, backdrop }) => {
  const [movies, setMovies] = useState([]);
  const [shadow, setShadow] = useState(false);

  //watchList context api
  const context = useContext(WatchlistContext);
  const {
    selected,
    addToWatchlist,
    addToFavourite,
    removeFromWatchlist,
    removeFromFavourites,
  } = context;

  const fetchMovies = async () => {
    setShadow(true);
    const getMovies = await fetch(url);
    const data = await getMovies.json();
    setMovies(data.results);
    setShadow(false);
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container">
        <h2>{status}</h2>
        {shadow === true && (
          <>
            <div className="shadow__container ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <div className="shadow__body ">
                  <div
                    className="shadow__img 
            shadow"
                  />
                  <div
                    className="shadow__text
            shadow"
                  />
                  <div
                    className="shadow__text
            shadow"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="content">
          {movies.map((movie) => (
            <>
              <div
                className={`movie__cards  ${backdrop && "backdrop__cards"}`}
                key={movie.id}
              ><span className="rating" style={{color:movie.vote_average > 6 || "null"? "yellow" : "red"}}>{movie.vote_average?`(${movie.vote_average})` : "--"}</span>
                <Link to={`/${movie.original_name?"tv":"movie"}/${movie.id}`}>
                  <img
                    src={`${image_api}${
                      backdrop ? movie.backdrop_path : movie.poster_path
                    }`}
                    alt={movie.title}
                  />
                </Link>
                <div className={`icon_container `}>
                  
                  <i
                    className={`fas fa-eye ${selected(movie.id, "watch")}`}
                    onClick={(e) => {
                      e.target.classList.contains("fa-eye") &&
                        addToWatchlist(movie);
                      e.target.classList.contains( "selected") &&
                        removeFromWatchlist(movie);
                      e.target.classList.toggle("selected");
                    }}
                  ></i>
                  <i
                    className={`fas fa-heart ${selected(movie.id, "fav")}`}
                    onClick={(e) => {
                      e.target.classList.contains("fa-heart") &&
                        addToFavourite(movie);
                      e.target.classList.contains("selected") &&
                        removeFromFavourites(movie);
                        e.target.classList.toggle("selected");
                       
                    }}
                  ></i>
                </div>
                <div className="movie__info">
                  <span>{movie.title.slice(0,20)}{movie.title.length>20&& "..."}</span> 
                  <small>{movie.release_date}</small>
                 
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Movieshome;
