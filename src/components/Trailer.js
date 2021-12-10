import React, { useContext, useEffect } from "react";
import "../style/Trailer.css";
import MovieContext from "../context/movie/MovieContext";

const Trailer = ({ setTrailerActive, value, id }) => {
  const context = useContext(MovieContext);
  const { videos, fetchTrailers } = context;
  useEffect(() => {
    fetchTrailers(value, id);
    // eslint-disable-next-line
  }, [id]);
  const key = videos.trailer?.key;
  return (
    <div>
      <div className="modal_container">
        <div className="modal_info">
          <h5>Play Trailer</h5>
          <i
            onClick={() => {
              setTrailerActive(false);
            }}
            className="fas fa-times"
          ></i>
        </div>
        <iframe title="" src={`https://www.youtube.com/embed/${key}`}></iframe>
      </div>
    </div>
  );
};

export default Trailer;
