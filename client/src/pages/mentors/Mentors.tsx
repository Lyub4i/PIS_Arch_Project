import React from "react";
import Header from "../../components/header/Header";
import "./Mentors.scss";
import CourseInfo from "../../components/courseInfoContent/CourseInfo";
import MentorInfo from "../../components/mentrInfo/MentorInfo";

function Mentors() {
  return (
    <div className="mentors">
      <Header></Header>
      <div className="mentorsInfoPart">
        <MentorInfo
          fullName="Liubomyr Bilak"
          photoLink="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
          description="The best dev in the world"
        ></MentorInfo>
      </div>
    </div>
  );
}

export default Mentors;
