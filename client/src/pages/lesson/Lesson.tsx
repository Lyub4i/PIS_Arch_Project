import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Lesson.scss";
import { getCourseId } from "../../services/localStorage";

function Lesson() {
  const [lessonTitle, setLessonTitle] = useState("");
  const [courseId, setCourseId] = useState(0);
  const [lessonDescription, setLessonDescription] = useState("");

  useEffect(() => {
    if (!getCourseId()) {
      window.location.href = "http://localhost:3000/courses";
    }

    const courseId = parseInt(getCourseId()!);

    //TODO: Will do request to API
    setLessonTitle("Test1");
    setLessonDescription("Test1 description");
  }, []);

  return (
    <div className="lesson">
      <Header></Header>
      <div className="lessonContent">
        <div className="lessonTitle">{lessonTitle}</div>
        <div className="lessonDescription">{lessonDescription}</div>
      </div>
    </div>
  );
}

export default Lesson;
