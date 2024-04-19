import React from "react";
import "./CourseInfo.scss";
import {saveCourseData} from "../../services/localStorage";

export interface CourseInfoProps {
  id: number;
  name: string;
  description: string;
  author: string;
  imageLink: string;
  isStarted: boolean;
}

function CourseInfo({
  id,
  name,
  description,
  author,
  imageLink,
  isStarted,
}: CourseInfoProps) {

  const redirectToLessonPage = () => {
    if (saveCourseData(id, isStarted)) {
      setTimeout(() => {
        window.location.href = "http://localhost:3000/lesson";
      }, 500);
    }
  };

  return (
    <div className="courseInfo">
      <div className="courseInfoImageBlock">
        <img src={imageLink} alt="" width="255px" />
      </div>
      <div className="courseInfoBlock">
        <div className="courseInfoTitle">{name}</div>
        <div className="courseInfoDescription">{description}</div>
        <button onClick={redirectToLessonPage}>Go to this course</button>
      </div>
    </div>
  );
}

export default CourseInfo;
