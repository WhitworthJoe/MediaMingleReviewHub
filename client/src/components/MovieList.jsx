// MovieList.jsx

import React, { useState, useEffect } from "react";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDc4YjAxMDZkNjc5NjIwMWJjOTg0OGVkYjZiODBiYiIsInN1YiI6IjY1YmEzYjFhMzM0NGM2MDE4NTkzOTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IfBM0uQogckcOhWDo1-WT5JtOqrm-weD-RFqyVnzpDQ",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 6 < movies.length ? prevIndex + 6 : prevIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 6 >= 0 ? prevIndex - 6 : 0));
  };

  return (
    <div className="movieListContainer">
      <h2 className="popularMovieHeader">Popular Movies</h2>

      <div className="moviePostersContainer">
        <button className="scrollButton prevButton" onClick={prevSlide} disabled={currentIndex === 0}>
          &#9664; Prev
        </button>

        <ul className="popularMoviePosters">
          {movies.slice(currentIndex, currentIndex + 6).map((movie) => (
            <li key={movie.id} className="popularMoviePosterContainer">
              <img
                className="popularMoviePosters"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster for ${movie.title}`}
              />
            </li>
          ))}
        </ul>

        <button
          className="scrollButton nextButton"
          onClick={nextSlide}
          disabled={currentIndex + 6 >= movies.length}
        >
          Next &#9654;
        </button>
      </div>
    </div>
  );
};

export default MovieList;
