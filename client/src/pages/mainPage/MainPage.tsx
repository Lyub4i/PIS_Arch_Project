import React from "react";
import Header from "../../components/header/Header";
import "./MainPage.scss";

function MainPage() {
  return (
    <div className="mainPage">
      <Header></Header>
      <div className="mainWelcome">
        {"Welcome"}
      </div>
    </div>
  );
}

export default MainPage;
