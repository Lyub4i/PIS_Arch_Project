import React, { useEffect, useState } from "react";
import "./Header.scss";
import userIcon from "./images/user.png";

function Header() {
  const iconName = "{Fast}IT";

  const [urlName, seturlName] = useState("");

  useEffect(() => {
    const url = window.location.href;

    const match = url.match(/\/(\w+)$/);
    const word = match ? match[1] : null;

    console.log(word);

    seturlName(word!);
  }, []);

  return (
    <div className="Header">
      <div className="headerIcon">
        <a href="/">{iconName}</a>
      </div>
      <div className="mainTabs">
        <a
          className={`right ${urlName === "courses" ? "tabColor" : ""}`}
          href="/courses"
        >
          Courses
        </a>
        <a
          className={`right ${urlName === "mentors" ? "tabColor" : ""}`}
          href="/mentors"
        >
          Mentors
        </a>
        <a
          className={`${urlName === "aboutUs" ? "tabColor" : ""}`}
          href="/aboutUs"
        >
          About Us
        </a>
      </div>
      <div className="userIcon">
        <a href="/user">
        <img src={userIcon} width={"42px"} height={"42px"} />
        </a>
      </div>
    </div>
  );
}

export default Header;
