// AllMovies.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterComponent from "./FilterComponent";
import "./AllMovies.css";

const AllMovies = () => {
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState({ releaseYear: "", genre: "all" });
  const [sort, setSort] = useState("popularity.desc");

  const formatDate = (releaseDate) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(releaseDate);
    return date.toLocaleDateString("en-UK", options);
  };

  const fetchPeople = async (query) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/person",
        {
          params: {
            query: query,
            include_adult: "false",
            language: "en-US",
            page: 1,
          },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDc4YjAxMDZkNjc5NjIwMWJjOTg0OGVkYjZiODBiYiIsInN1YiI6IjY1YmEzYjFhMzM0NGM2MDE4NTkzOTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IfBM0uQogckcOhWDo1-WT5JtOqrm-weD-RFqyVnzpDQ",
          },
        }
      );
      const people = response.data.results;
      setLoadedPeople(people);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  const fetchMovies = async (personName) => {
    try {
      const apiKey =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDc4YjAxMDZkNjc5NjIwMWJjOTg0OGVkYjZiODBiYiIsInN1YiI6IjY1YmEzYjFhMzM0NGM2MDE4NTkzOTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IfBM0uQogckcOhWDo1-WT5JtOqrm-weD-RFqyVnzpDQ";
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            include_adult: "false",
            language: "en-UK",
            page: currentIndex + 1,
            sort_by: sort,
            "vote_average.gte": 1,
            "vote_count.gte": 100,
            "primary_release_date.gte": filter.startDate,
            "primary_release_date.lte": filter.endDate,
            with_genres: filter.genre !== "all" ? filter.genre : "",
            with_cast: personName,
          },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const newMovies = response.data.results;
  
      setLoadedMovies((prevLoadedMovies) => [
        ...prevLoadedMovies,
        ...newMovies,
      ]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchMoviesByPerson = async (personId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits`,
        {
          params: {
            language: "en-US",
          },
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDc4YjAxMDZkNjc5NjIwMWJjOTg0OGVkYjZiODBiYiIsInN1YiI6IjY1YmEzYjFhMzM0NGM2MDE4NTkzOTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IfBM0uQogckcOhWDo1-WT5JtOqrm-weD-RFqyVnzpDQ",
          },
        }
      );
      const movies = response.data.cast;
  
      movies.sort((a, b) => b.popularity - a.popularity);
  
      setLoadedMovies(movies);
    } catch (error) {
      console.error("Error fetching movies by person:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentIndex, sort, filter]);

  const loadMore = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleFilterChange = (type, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
    setCurrentIndex(0);
    setLoadedMovies([]);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      startDate,
      endDate,
    }));
    setCurrentIndex(0);
    setLoadedMovies([]);
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
    setCurrentIndex(0);
    setLoadedMovies([]);
  };

  const handleSearchResults = (movies) => {
    setLoadedMovies(movies);
  };

  const handlePersonSearch = (query) => {
    fetchPeople(query);
  };

  const handlePersonSelect = (personId) => {
    setSelectedPersonId(personId);
    fetchMoviesByPerson(personId);
  };

  return (
    <div className="allMoviesContainer">
      <FilterComponent
        onGenreChange={(genre) => handleFilterChange("genre", genre)}
        onDateRangeChange={handleDateRangeChange}
        onSortChange={handleSortChange}
        onSearchResults={handleSearchResults}
        onPersonSearch={handlePersonSearch}
        onPersonSelect={handlePersonSelect}
      />
      <ul className="allMoviesList">
        {loadedMovies.map((movie) => (
          <li key={movie.id} className="movieItem">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Poster for ${movie.title}`}
            />
            <p className="movieTitle">{movie.title}</p>
            <p className="movieReleaseDate">{formatDate(movie.release_date)}</p>
          </li>
        ))}
      </ul>
      <button className="loadMoreButton" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default AllMovies;
