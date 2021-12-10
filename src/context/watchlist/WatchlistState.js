import React, { useState, useEffect } from "react";
import WatchlistContext from "./WatchlistContext";

const WatchlistState = (props) => {
  const initialState = {
    watchlist: localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : [],
    favourite: localStorage.getItem("favourite")
      ? JSON.parse(localStorage.getItem("favourite"))
      : [],
  };
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("favourite", JSON.stringify(state.favourite));
  }, [state]);

  const selected = (Id, value) => {
    const stored =
      value === "watch"
        ? state.watchlist.find((i) => i.id === Id)
        : state.favourite.find((i) => i.id === Id);
    if (stored) {
      return "selected";
    } else {
      return "";
    }
  };

  const addToWatchlist = (movie) => {
    
    setstate({
      watchlist: [...state.watchlist, movie],
      favourite: [...state.favourite],
    });
  };

  const addToFavourite = (movie) => {
    setstate({
    
      watchlist: [...state.watchlist],
      favourite: [...state.favourite, movie],
    });
  };

  const removeFromWatchlist = (movie) => {
    
   setstate({
   
      watchlist: [...state.watchlist.filter((i) => i !== movie)],
      favourite: [...state.favourite]
    });
  };
  const removeFromFavourites = (movie) => {
  
    setstate({  
      watchlist: [...state.watchlist],
      favourite: [...state.favourite.filter((i) => i !== movie)]
    });
  };

  return (
    <WatchlistContext.Provider
      value={{
        state,
        selected,
        addToWatchlist,
        addToFavourite,
        removeFromWatchlist,
        removeFromFavourites
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};
export default WatchlistState;
