import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import MainPage from "./components/MainPage";
import MovieList from "./components/MovieList";
import ShowList from "./components/ShowList";
import TopMovieList from "./components/TopMovieList";
import TopShowList from "./components/TopShowList";
import Footer from "./components/Footer";
import AllMovies from "./components/AllMovies"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Header />
              <MainPage />
              <MovieList />
              <ShowList />
              <TopMovieList />
              <TopShowList />
              <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/movies"
          element={
            <div>
              <Header />
              <AllMovies />
              <Footer />
            </div>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
