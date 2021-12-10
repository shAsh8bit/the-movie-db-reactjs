import React, { useContext, useEffect, useState } from "react";
import MovieContext from "../context/movie/MovieContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Media from "react-media";
import WatchlistContext from "../context/watchlist/WatchlistContext";
import "../style/MovieDetails.css";
import Trailer from "./Trailer";

const image_api = "https://image.tmdb.org/t/p/w1280";
const MovieDetails = () => {
  const { value, movieId } = useParams();
  const context = useContext(MovieContext);
  const {
    movie,
    credits,
    similarMovies,
    recommendations,
    reviews,
    fetchMovie,
    fetchCredits,
    fetchSimilarMovies,
    fetchRecommendations,
    fetchReviews,
  } = context;
  //watchList context api
  const context2 = useContext(WatchlistContext);
  const {
    selected,
    addToWatchlist,
    addToFavourite,
    removeFromWatchlist,
    removeFromFavourites,
  } = context2;
  const [trailerActive, setTrailerActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const handleOnclickReview = () => {
    const element = document.getElementById("show_reviews");
    if (element.classList.contains("show_reviews")) {
      element.classList.remove("show_reviews");
      setDropdownActive(true);
    } else {
      element.classList.add("show_reviews");
      setDropdownActive(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovie(value, movieId);
    value !== "person" && fetchReviews(value, movieId);
    fetchCredits(value, movieId);
    fetchSimilarMovies(value, movieId);
    fetchRecommendations(value, movieId);
    // eslint-disable-next-line
  }, [movieId]);

  return (
    <>
      {value !== "person" && (
        <>
          {trailerActive && (
            <Trailer
              setTrailerActive={setTrailerActive}
              value={value}
              id={movie.id}
            />
          )}
          <div className="movieDetails">
            <section
              className="movieDetails__section"
              style={{
                backgroundImage: `url(${image_api}${movie.backdrop_path})`,
              }}
            >
              <div className="movieDetails__container">
                <div className="movie__card">
                  <img src={image_api + movie.poster_path} alt="" />
                </div>
                <Media query="(max-width:768px)">
                  {(matches) =>
                    !matches && (
                      <div className="movieDetails__info">
                        <div className="moviehead">
                          <h1>
                            {movie.title ||
                              movie.original_title ||
                              movie.original_name}
                            <small
                              style={{
                                color:
                                  movie.vote_average > 6 ? "yellow" : "red",
                              }}
                            >
                              {movie.vote_average
                                ? `(Rating: ${movie.vote_average})`
                                : ""}
                            </small>
                          </h1>
                          <h5
                            className="play_trailer"
                            onClick={() => {
                              setTrailerActive(true);
                            }}
                          >
                            <i class="fas fa-play"></i> Play Trailer
                          </h5>
                          <small className="tagline">{movie.tagline}</small>
                          <h5>Overview</h5>
                          <p>{movie.overview} </p>

                          <div className={`icon_container `}>
                            <i
                              className={`fas fa-eye ${selected(
                                movie.id,
                                "watch"
                              )}`}
                              onClick={(e) => {
                                e.target.classList.contains("fa-eye") &&
                                  addToWatchlist(movie);
                                e.target.classList.contains("selected") &&
                                  removeFromWatchlist(movie);
                                e.target.classList.toggle("selected");
                              }}
                            ></i>
                            <i
                              className={`fas fa-heart ${selected(
                                movie.id,
                                "fav"
                              )}`}
                              onClick={(e) => {
                                e.target.classList.contains("fa-heart") &&
                                  addToFavourite(movie);
                                e.target.classList.contains("selected") &&
                                  removeFromFavourites(movie);
                                e.target.classList.toggle("selected");
                              }}
                            ></i>
                          </div>
                          <h5>
                            {credits.directors?.map((director) => (
                              <Link to={`/person/${director.id}`}>
                                {director.name}
                              </Link>
                            ))}
                          </h5>
                          <p>{value === "movie" && "Director"}</p>
                        </div>
                      </div>
                    )
                  }
                </Media>
              </div>

              <div className="gradientOverlay"></div>
            </section>
            <Media query="(max-width:768px)">
              {(matches) =>
                matches && (
                  <div
                    className="movieDetails__info"
                    style={{ padding: "0 10px" }}
                    key={movie.id}
                  >
                    <div className="moviehead">
                      <h1>
                        {movie.title ||
                          movie.original_title ||
                          movie.original_name ||
                          movie.name}
                      </h1>
                      <h5
                        className="play_trailer"
                        onClick={() => {
                          setTrailerActive(true);
                        }}
                      >
                        <i class="fas fa-play"></i> Play Trailer
                      </h5>
                      <small
                        style={{
                          color: movie.vote_average > 6 ? "yellow" : "red",
                        }}
                      >
                        {movie.vote_average
                          ? `(Rating: ${movie.vote_average})`
                          : ""}
                      </small>
                      <small style={{ display: "block", fontStyle: "italic" }}>
                        {movie.tagline}
                      </small>
                      <h5>Overview</h5>
                      <p>{movie.overview} </p>

                      <span className={`icon_container `}>
                        <i
                          className={`fas fa-eye ${selected(
                            movie.id,
                            "watch"
                          )}`}
                          onClick={(e) => {
                            e.target.classList.contains("fa-eye") &&
                              addToWatchlist(movie);
                            e.target.classList.contains("selected") &&
                              removeFromWatchlist(movie);
                            e.target.classList.toggle("selected");
                          }}
                        ></i>
                        <i
                          className={`fas fa-heart ${selected(
                            movie.id,
                            "fav"
                          )}`}
                          onClick={(e) => {
                            e.target.classList.contains("fa-heart") &&
                              addToFavourite(movie);
                            e.target.classList.contains("selected") &&
                              removeFromFavourites(movie);
                            e.target.classList.toggle("selected");
                          }}
                        ></i>
                      </span>

                      <h5>
                        {credits.directors?.map((director) => (
                          <Link to={`/person/${director.id}`}>
                            {director.name}
                          </Link>
                        ))}
                      </h5>
                      <p>{value === "movie" && "Director"}</p>
                    </div>
                  </div>
                )
              }
            </Media>

            <div className="container">
              <h2>Cast</h2>
              <div className="content">
                {credits.actors?.map((actor) => (
                  <div className={`movie__cards`} key={actor.id}>
                    <Link to={`/person/${actor.id}`}>
                      <img
                        src={
                          actor.profile_path !== null
                            ? `${image_api}${actor.profile_path}`
                            : `../nouser.jpg`
                        }
                        alt=""
                      />
                      <div className="movie__info">
                        <span>{actor.name}</span>
                        <small>{actor.character}</small>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <h2>
                Review{reviews.total === 1 ? "" : "s"} ({reviews.total})
                {reviews.total !== 0 && (
                  <>
                    {dropdownActive ? (
                      <i
                        onClick={handleOnclickReview}
                        className="fas fa-chevron-circle-up"
                      ></i>
                    ) : (
                      <i
                        onClick={handleOnclickReview}
                        className="fas fa-chevron-circle-down"
                      ></i>
                    )}
                  </>
                )}
              </h2>
              <div className="content show_reviews" id="show_reviews">
                {reviews.results?.map((review) => (
                  <div className={`review_card`} key={review.id}>
                    <div className="review_main">{review.content}</div>

                    <div className="review_author-info">
                      <span>by {review.author}</span>
                      <small
                        style={{
                          color:
                            review.author_details.rating > 6 ? "yellow" : "red",
                        }}
                      >
                        {" "}
                        {review.author_details.rating
                          ? `(Rating: ${review.author_details.rating}/10)`
                          : ""}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <h2>Recommendations</h2>
              <div className="content" id="content">
                {recommendations.movies?.map((movie) => (
                  <div className={`similarmovie__cards`} key={movie.id}>
                    <Link
                      to={`/${movie.original_name ? "tv" : "movie"}/${
                        movie.id
                      }`}
                    >
                      <img src={`${image_api}${movie.backdrop_path}`} alt="" />
                    </Link>
                    <div className="movie__info">
                      <span>
                        {movie.title ||
                          movie.original_title ||
                          movie.original_name ||
                          movie.name}
                        <div className={`icon_container `}>
                          <i
                            className={`fas fa-eye ${selected(
                              movie.id,
                              "watch"
                            )}`}
                            onClick={(e) => {
                              e.target.classList.contains("fa-eye") &&
                                addToWatchlist(movie);
                              e.target.classList.contains("selected") &&
                                removeFromWatchlist(movie);
                              e.target.classList.toggle("selected");
                            }}
                          ></i>
                          <i
                            className={`fas fa-heart ${selected(
                              movie.id,
                              "fav"
                            )}`}
                            onClick={(e) => {
                              e.target.classList.contains("fa-heart") &&
                                addToFavourite(movie);
                              e.target.classList.contains("selected") &&
                                removeFromFavourites(movie);
                              e.target.classList.toggle("selected");
                            }}
                          ></i>
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <h2>Similar {value === "movie" ? "Movies" : "TV Shows"}</h2>
              <div className="content">
                {similarMovies.movies?.map((movie) => (
                  <div className={`similarmovie__cards`} key={movie.id}>
                    <Link
                      to={`/${
                        movie.original_name || movie.name ? "tv" : "movie"
                      }/${movie.id}`}
                    >
                      <img src={`${image_api}${movie.backdrop_path}`} alt="" />
                    </Link>{" "}
                    <div className="movie__info">
                      <span>
                        {movie.title ||
                          movie.original_title ||
                          movie.original_name ||
                          movie.name}
                        <div className={`icon_container `}>
                          <i
                            className={`fas fa-eye ${selected(
                              movie.id,
                              "watch"
                            )}`}
                            onClick={(e) => {
                              e.target.classList.contains("fa-eye") &&
                                addToWatchlist(movie);
                              e.target.classList.contains("selected") &&
                                removeFromWatchlist(movie);
                              e.target.classList.toggle("selected");
                            }}
                          ></i>
                          <i
                            className={`fas fa-heart ${selected(
                              movie.id,
                              "fav"
                            )}`}
                            onClick={(e) => {
                              e.target.classList.contains("fa-heart") &&
                                addToFavourite(movie);
                              e.target.classList.contains("selected") &&
                                removeFromFavourites(movie);
                              e.target.classList.toggle("selected");
                            }}
                          ></i>
                        </div>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {/* {value === "person" && (
      
      )} */}
    </>
  );
};

export default MovieDetails;
