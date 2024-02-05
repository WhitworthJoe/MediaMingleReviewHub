import React, { useState, useEffect } from "react";
import "./ShowList.css";

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTVShows = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer YOUR_API_KEY", // Replace with your actual API key
        },
      };

      try {
        const pagesToFetch = [1, 2, 3];
        const results = [];

        for (const page of pagesToFetch) {
          const response = await fetch(
            `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            options
          );
          const data = await response.json();

          const uniqueShows = data.results.filter(
            (show) => !results.some((r) => r.id === show.id)
          );

          results.push(...uniqueShows);
        }

        setShows(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  const nextSlide = (event) => {
    event.preventDefault();
    setCurrentIndex((prevIndex) =>
      prevIndex + 6 < shows.length ? prevIndex + 6 : prevIndex
    );
  };

  const prevSlide = (event) => {
    event.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex - 6 >= 0 ? prevIndex - 6 : 0));
  };

  return (
    <div className="showListContainer">
      <h2 className="popularShowHeader">Popular TV Shows</h2>

      <div className="showPostersContainer">
        <button
          className="scrollButton prevButton"
          onClick={prevSlide}
          disabled={currentIndex === 0 || loading}
        >
          &#9664; Prev
        </button>

        {!loading && (
          <ul className="popularShowPosters">
            {shows.slice(currentIndex, currentIndex + 6).map((show) => (
              <li key={show.id} className="popularShowPosterContainer">
                <img
                  className="popularShowPosters"
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={`Poster for ${show.name}`}
                />
              </li>
            ))}
          </ul>
        )}

        <button
          className="scrollButton nextButton"
          onClick={nextSlide}
          disabled={currentIndex + 6 >= shows.length || loading}
        >
          Next &#9654;
        </button>
      </div>
    </div>
  );
};

export default ShowList;