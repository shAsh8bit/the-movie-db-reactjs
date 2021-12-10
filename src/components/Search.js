import React, { useEffect, useState , useContext} from "react";
import {Link} from "react-router-dom";
import WatchlistContext from "../context/watchlist/WatchlistContext";
import "../style/Search.css";

const image_api = "https://image.tmdb.org/t/p/w1280";
const buttonItems = [
  { value: "movie", text: "Movies" },
  { value: "tv", text: "TV shows" },
  { value: "person", text: "People" },
];
const Search = ({ searchterm }) => {
  const [searchItem, setSearchItem] = useState([]);
  const [filterInitial, setFilterInitial] = useState("movie");
  const [totalresults, setTotalresults] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const SEARCH_API = `https://api.themoviedb.org/3/search/${filterInitial}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=`;

  //watchList context api
  const context = useContext(WatchlistContext);
  const {   selected,
    addToWatchlist,
    addToFavourite,
    removeFromWatchlist,
    removeFromFavourites,} = context;
 
  const fetchSearch = async () => {
    const response = await fetch(SEARCH_API + searchterm);
    const data = await response.json();
    setTotalPages(data.total_pages);
    setSearchItem(data.results);
    setTotalresults(data.total_results);
  };

  const handleOnclick = (e) => {
    e.preventDefault();

    //to remove selected class from other siblings
    let siblings = e.target.parentElement.children;
    for (let sib of siblings) {
      sib.classList.remove("selected");
    }
    //adding selected class
    e.target.classList.add("selected");
    setPage(1);
    setFilterInitial(e.target.value);
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  }, [searchterm, filterInitial, page]);


  return (
    <div className="searchcontainer">
      <div className="button__container">
        
        {buttonItems.map((item) => (
          <>
            <button
              value={item.value}
              onClick={handleOnclick}
              className={
                (filterInitial && item.value) === "movie" && "selected"
              }
            >
              {item.text}
              {filterInitial === item.value ? <span>{totalresults}</span> : ""}
            </button>
          </>
        ))}
      </div>
      <div className="searchcontent">
      {totalresults===0 && <h2>🤔 Nothing to show</h2>}
        {searchItem.map((item) => (
          <>
            <div 
              className="movie__searchcards"
              key={item.id}
            >
              <span className="rating" style={{color:item.vote_average > 6 || "null" ? "yellow" : "red"}}>{item.vote_average?`(${item.vote_average})` : "--"}</span>
              <Link to={`/${filterInitial}/${item.id}`} >
              <img
                src={`${image_api}${
                  item.poster_path || item.backdrop_path || item.profile_path
                }`}
                alt=""
              />
              
              </Link> 
         {filterInitial!=="person" && <div className={`icon_container `}>
                  <i
                    className={`fas fa-eye ${selected(item.id, "watch")}`}
                    onClick={(e) => {
                      e.target.classList.contains("fa-eye") &&
                        addToWatchlist(item);
                      e.target.classList.contains( "selected") &&
                        removeFromWatchlist(item);
                      e.target.classList.toggle("selected");
                    }}
                  ></i>
                  <i
                    className={`fas fa-heart ${selected(item.id, "fav")}`}
                    onClick={(e) => {
                      e.target.classList.contains("fa-heart") &&
                        addToFavourite(item);
                      e.target.classList.contains("selected") &&
                        removeFromFavourites(item);
                        e.target.classList.toggle("selected");
                    }}
                  ></i>
                </div>}  
            
              <div className="movie__searchinfo" style={{color:"black"}}>
                <span>
                  {item.original_name || item.original_title || item.name}
                </span>
            </div>
              </div> 
          </>
        ))}
      </div>  
      
      {totalresults!==0 &&
      <div className="button__bottomContainer">
    
        <button disabled={page <= 1 } className={page <= 1 && "disable"}
          onClick={() => {
            let pagevalue = page;
            window.scrollTo(0,250);
            setPage((pagevalue -= 1));
          }}
        >
          Previous
        </button>
         <button disabled={page === totalPages} className={page === totalPages && "disable"}
          onClick={() => {
            let pagevalue = page;
           
            window.scrollTo(0,250);
            setPage((pagevalue += 1));
          }}
        >
          Next
        </button>
      </div>}
    </div>
  );
};

export default Search;
