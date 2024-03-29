import React from "react";
import Header from "../../components/header/Header";
import "./Courses.scss";
import CourseInfo from "../../components/courseInfoContent/CourseInfo";

function Courses() {
  return (
    <div className="courses">
      <Header></Header>
      <div className="mainContent">
        <div className="mainContentTitle">{"Courses"}</div>
      </div>
      <div className="coursesContent">
        <CourseInfo
          id={1}
          name="Test1"
          description="Test description"
          author="Test Author"
          imageLink="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
        ></CourseInfo>
      </div>
    </div>
  );
}

export default Courses;
