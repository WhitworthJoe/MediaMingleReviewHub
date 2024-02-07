import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "./FilterComponent.css";

const FilterComponent = ({
  onGenreChange,
  onDateRangeChange,
  onSortChange,
  onSearchResults,
  onPersonSearch,
  onPersonSelect,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [peopleResults, setPeopleResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    onDateRangeChange(event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    onDateRangeChange(startDate, event.target.value);
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    onGenreChange(selectedGenre);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort);
  };

  const handleSearchInputChange = debounce((query) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
      onSearchResults([]);
    }
  }, 30);

  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    setSearchQuery("");
    setPeopleResults([]);
    onPersonSelect(person.id);
  };

  const handlePersonSearchInputChange = debounce(async (query) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
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
        setPeopleResults(people);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    } else {
      setPeopleResults([]);
    }
  }, 30);

  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: { language: "en-US", query: query },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDc4YjAxMDZkNjc5NjIwMWJjOTg0OGVkYjZiODBiYiIsInN1YiI6IjY1YmEzYjFhMzM0NGM2MDE4NTkzOTA2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IfBM0uQogckcOhWDo1-WT5JtOqrm-weD-RFqyVnzpDQ",
          },
        }
      );
      const movies = response.data.results;
      setSearchResults(movies);
      onSearchResults(movies);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="filterComponent">
      <label id="StartDate" htmlFor="startDate">
        Released From:
      </label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleStartDateChange}
      />

      <label id="EndDate" htmlFor="endDate">
        to
      </label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={handleEndDateChange}
      />

      <label id="Genre" htmlFor="genre">
        Genre:
      </label>
      <select id="genre" onChange={handleGenreChange}>
        <option value="all">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="10770">TV Movie</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>

      <label id="Sort" htmlFor="sort">
        Sort:
      </label>
      <select id="sort" onChange={handleSortChange}>
        <option value="popularity.desc">Popularity</option>
        <option value="primary_release_date.desc">Latest</option>
        <option value="primary_release_date.asc">Oldest</option>
        <option value="vote_average.desc">Highest Average Rating</option>
        <option value="vote_average.asc">Lowest Average Rated</option>
        <option value="title.asc">Title A-Z</option>
        <option value="title.desc">Title Z-A</option>
      </select>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => handleSearchInputChange(e.target.value)}
        placeholder="Search for movies..."
      />
      {searchResults.length < 0 && (
        <ul className="searchResults">
          {searchResults.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
      <label htmlFor="personSearch">Search for People:</label>
      <div className="personSearchContainer">
        <input
          type="text"
          id="personSearch"
          value={searchQuery}
          onChange={(e) => handlePersonSearchInputChange(e.target.value)}
          placeholder="Search for people..."
        />
        <ul className="peopleResults">
          {peopleResults.map((person) => (
            <li
              key={person.id}
              onClick={() => handlePersonSelect(person)}
              className={
                selectedPerson && selectedPerson.id === person.id
                  ? "selected"
                  : ""
              }
            >
              {person.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterComponent;
