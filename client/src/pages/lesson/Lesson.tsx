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
        <div className="lessonMaterial">
          <iframe
            src="https://drive.google.com/file/d/18FKmr0iQkEtas01M1DYzSN2OxVKWkpYi/preview"
            className="lessonVideo"
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MwPc-9VCJ2s?si=OKRaYqgLn2vkKmwv"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Lesson;
