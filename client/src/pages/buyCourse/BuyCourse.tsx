import React, { useEffect, useState } from "react";
import "./BuyCourse.scss";
import Header from "../../components/header/Header";
import { UserService } from "../../services/userService";
import { getRedirectedPage, saveIsStarted, saveUserId } from "../../services/localStorage";
import { Course, CourseService } from "../../services/courseService";

export interface BuyCourseProps {
  userId: number;
  courseId: number;
}

function BuyCourse({ userId, courseId }: BuyCourseProps) {
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    const fetchData = async () => {
      const course = await CourseService.getCourseInfo(courseId);

      setCourse(course);
    };

    fetchData();
  }, []);

  const buyCourse = async () => {
    await CourseService.startCourse(userId, courseId);
    window.location.href = "http://localhost:3000/lesson"
    saveIsStarted(true);
  };

  return (
    <div className="buyCourseContent">
      <Header />
      <div className="buyCourseImageBlock">
        <img src={course?.imageLink} alt="" width="600px" />
      </div>
      <div className="buyCourseInfoBlock">
        <div className="courseInfoTitle">Назва: {course?.name}</div>
        <div className="courseInfoDescription">Ціна: {course?.price}грн</div>
        <div className="courseInfoButton">
          <button onClick={buyCourse}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default BuyCourse;
