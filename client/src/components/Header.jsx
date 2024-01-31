import React from "react";
import "./Header.css";
import searchIcon from "./assets/Magnifying_glass_icon.svg"

const Header = () => {
  return (
    <header className="headerContainer">
      <div className="headerLogo">LOGO</div>
      <div className="headerMenu">
        MENU
        <div className="dropdownContent">
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
      </div>
      <div className="headerSearchBar">
        <input type="text" className="searchInput" placeholder="Search..." />
        <img src={searchIcon} alt="Search" className="searchIcon" />
      </div>
      <div className="headerWatchlist">WATCHLIST</div>
      <div className="headerSignIn">SIGNIN</div>
    </header>
  );
};

export default Header;
