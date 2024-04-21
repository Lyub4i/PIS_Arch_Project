import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Lesson.scss";
import {
  getCourseId,
  getIsCourseStarted,
  getUserId,
  isAuthorized,
  saveRedirectedPage,
} from "../../services/localStorage";
import { CourseService, Lesson, Material } from "../../services/courseService";

function LessonComponent() {
  const [lessonInfo, setLessonInfo] = useState<Lesson | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const courseIdValue = getCourseId();

      if (!courseIdValue) {
        window.location.href = "http://localhost:3000/courses";
        return;
      }

      const courseIdInt = parseInt(courseIdValue, 10);
      const currentuUserId = getUserId();

      const currentIsStarted = getIsCourseStarted();
      setIsStarted(currentIsStarted);

      setUserId(currentuUserId!);

      console.log("IsStarted: " + currentIsStarted);
      console.log("CourseId: " + courseIdInt + " userId: " + currentuUserId);

      const lesson = currentIsStarted
        ? await CourseService.getCurrentLesson(courseIdInt, currentuUserId!)
        : await CourseService.getTrailerForCourse(courseIdInt);
      setLessonInfo(lesson);
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
            src={`https://drive.google.com/file/d/${material.link}/preview`}
            className="lessonVideo"
            title="Google Video Preview"
          />
        );
      case 2:
        return (
          <iframe
            key={material.id}
            width="840"
            height="480"
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
    if (isAuthorized()) {
      window.location.href = "http://localhost:3000/buyCourse";
    } else {
      saveRedirectedPage("http://localhost:3000/courses");
      window.location.href = "http://localhost:3000/register";
    }
  };

  const goToTheNextLesson = async () => {
    const course = getCourseId()!;
    const courseIdInt = parseInt(course);

    const result = await CourseService.goToTheNext(courseIdInt, userId);

    if (result) {
      window.location.reload();
    } else {
      alert("Ви завершили курс. Вітаємо!");
    }
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
          {!isStarted ? (
            <>
              <button onClick={redirectToRegisterPage}>Get full course</button>
            </>
          ) : (
            <>
              <button onClick={goToTheNextLesson}>Go to the next lesson</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonComponent;
