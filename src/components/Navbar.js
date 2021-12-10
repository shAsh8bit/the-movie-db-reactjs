import React from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import Media from "react-media";

const Navbar = () => {
  const handleonClick = () => {
    const ul = document.querySelector("ul");
    const menu__icon = document.getElementsByClassName("menu__icon");
    ul.classList.toggle("display");
    menu__icon[0].classList.toggle("display")

    
  };
  


  return (
    <div className="nav">
      <Media query="(max-width:500px)">
        {(matches) =>
          matches ? (
            <>
              <div className="menu">
                <div className="menu__icon">
                  <i onClick={handleonClick} className="fas fa-ellipsis-v"></i>
                  
                </div>

                <ul>
                  <li>
                    <Link to="/" >Home</Link>
                  </li>
                  <hr />
                  <li>
                    <Link to="/watchlist">
                      <i className="fas fa-eye"></i> WatchList
                    </Link>
                  </li>
                  <hr />
                  <li>
                    <Link to="/favourite">
                      <i className="fas fa-heart"></i> Favourites
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="navbar">
              <ul>
                <li>
                  <Link to="/" >Home</Link>
                </li>
                <hr />
                <li>
                  <Link to="/watchlist">
                    <i className="fas fa-eye"></i> WatchList
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to="/favourite">
                    <i className="fas fa-heart"></i> Favourites
                  </Link>
                </li>
              </ul>
            </div>
          )
        }
      </Media>
    </div>
  );
};

export default Navbar;
