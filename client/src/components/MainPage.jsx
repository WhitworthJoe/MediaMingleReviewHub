import React from "react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="mainPageContainer">
      <div className="backgroundContainer"></div>
      <div className="contentContainer">
        <div className="headline">
          <a>Track films you've watched.</a>
          <a>Store films to watch.</a>
          <a>Share thoughts with friends!</a>
        </div>
        <div className="headlineRegisterButtonContainer">
          <button className="headlineRegisterButton">GET STARTED - IT'S FREE!</button>
        </div>
        <div className="underHeadline">A social media platform for film and TV lovers!
            </div>
      </div>
    </div>
  );
};

export default MainPage;
