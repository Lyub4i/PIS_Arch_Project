import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Lesson.scss";
import {
  getCourseId,
  getIsCourseStarted,
  saveRedirectedPage,
} from "../../services/localStorage";
import { CourseService, Lesson, Material } from "../../services/courseService";

function LessonComponent() {
  const [lessonInfo, setLessonInfo] = useState<Lesson | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const courseIdValue = getCourseId();

      if (!courseIdValue) {
        window.location.href = "http://localhost:3000/courses";
        return;
      }

      const courseIdInt = parseInt(courseIdValue, 10);
      const lesson = await CourseService.getTrailerForCourse(courseIdInt);
      setLessonInfo(lesson);
      setIsStarted(getIsCourseStarted());
    };

    fetchData();
  }, []);

  if (!lessonInfo) {
    return null;
  }

  const { title, description, materials, content } = lessonInfo;

  const renderMaterial = (material: Material) => {
    switch (material.fileType) {
      case 1:
        return (
          <iframe
            key={material.id}
            src="https://drive.google.com/file/d/18FKmr0iQkEtas01M1DYzSN2OxVKWkpYi/preview"
            className="lessonVideo"
            title="Google Video Preview"
          />
        );
      case 2:
        return (
          <iframe
            key={material.id}
            width="560"
            height="315"
            src={material.link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        );
      case 3:
        return (
          <iframe
            key={material.id}
            src={material.link}
            className="lessonPDF"
            title="PDF Preview"
          />
        );
      default:
        return null;
    }
  };

  const redirectToRegisterPage = () => {
    saveRedirectedPage(window.location.href);
    window.location.href = "http://localhost:3000/register";
  };

  return (
    <div className="lesson">
      <Header />
      <div className="lessonContent">
        <div className="lessonTitle">{title}</div>
        <div className="lessonDescription">{description}</div>
        <div className="lessonMaterial">
          {materials.map((material) => renderMaterial(material))}
        </div>
        <div className="lessonDopContent">Додатковий контент {content}</div>
        <div className="registerPart">
          {isStarted ? (
            <>
              <button onClick={redirectToRegisterPage}>Try full course</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonComponent;
