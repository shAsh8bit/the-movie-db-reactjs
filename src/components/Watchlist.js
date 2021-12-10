import React, { useContext } from "react";
import WatchlistContext from "../context/watchlist/WatchlistContext";
import { Link } from "react-router-dom";
import "../style/Watchlist.css";
const image_api = "https://image.tmdb.org/t/p/w1280";
const Watchlist = () => {
  const context = new useContext(WatchlistContext);
  const {
    state,
    selected,
    addToFavourite,
    removeFromWatchlist,
    removeFromFavourites,
  } = context;
  const movies = state.watchlist;
  return (
    <>
      <h1 className="mainheader">Watchlist</h1>
      {movies.length === 0 && <h2 className="nothing">WATCHLIST IS EMPTY</h2>}
      <div className="watchlist__container">
        {movies?.map((movie) => (
          <>
            <div className="watchlist__card" key={movie.id}>
              <div className="watchlist__img">
                <img src={`${image_api}${movie.poster_path}`} alt="" />
              </div>
              <div className="watchlist__info">
                <div className="icon_container">
                  <i
                    className={`fas fa-eye ${selected(movie.id, "watch")}`}
                    onClick={(e) => {
                      e.target.classList.contains("selected") &&
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
                <Link to={`/${movie.original_name?"tv":"movie"}/${movie.id}`}>
                  <div className="moviehead">
                    <h1>{movie.title || movie.original_title || movie.original_name}</h1>
                    <small>{movie.release_date || movie.first_air_date}</small>
                  </div>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Watchlist;
