import React, { useState } from "react";
import MovieContext from "./MovieContext";

const MovieState = (props) => {
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [similarMovies, setSimilarMovies] = useState({});
  const [recommendations, setRecommendations] = useState({})
  const [reviews, setReviews] = useState({});
  const [videos, setVideos] = useState({})

  const fetchMovie = async (value, id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${value}/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const json = await response.json();
    setMovie(json);
  };
  const fetchCredits = async (value, id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${value}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const json = await response.json();
    const directors = json.crew.filter((member)=>{return member.job==="Director" })
    setCredits({
      actors:json.cast,
      directors
    });
  };
  const fetchSimilarMovies = async (value, id) => {
    
    const response = await fetch(
      `https://api.themoviedb.org/3/${value}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const json = await response.json();
    setSimilarMovies( {page:json.page,
      movies:json.results});
  };
  const fetchRecommendations = async (value, id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${value}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const json = await response.json();
    setRecommendations(
      {page:json.page,
        movies:json.results}
    );
  };
  const fetchReviews = async (value, id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${value}/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`
    );

    const json = await response.json();
    setReviews(
      {page:json.page,
        results:json.results,
      total:json.total_results}
    );
  }; 

const fetchTrailers = async(value, id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${value}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const json = await response.json();
  const trailer= await json.results.filter((item)=>{return item.type==="Trailer"})
  setVideos(
    {
      trailer:trailer[0]
    }
  );
}; 
  return (
    <MovieContext.Provider value={{ movie, credits,similarMovies, recommendations,reviews,videos, fetchMovie, fetchCredits ,fetchSimilarMovies,fetchRecommendations,fetchReviews,fetchTrailers}}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
