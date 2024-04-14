import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Courses.scss";
import CourseInfo from "../../components/courseInfoContent/CourseInfo";
import { Course, CourseService } from "../../services/courseService";

function Courses() {
  const emptyCourses: Course[] = [];
  const [courses, setCourses] = useState<Course[]>(emptyCourses);
  const [myCourses, setMyCourses] = useState<Course[]>(emptyCourses);

  useEffect(() => {
    const fetchData = async () => {
      const myCoursesData = await CourseService.getMyCourses(1);
      const allCourses = await CourseService.getCourses();

      setMyCourses(myCoursesData);

      const filteredCourses = allCourses.filter(
        (course) => !myCoursesData.some((myCourse) => myCourse.id === course.id)
      );

      setCourses(filteredCourses);
    };

    fetchData();
  }, []);

  return (
    <div className="courses">
      <Header />
      {myCourses != null && myCourses.length !== 0 ? (
        <div className="mainContent">
          <div className="mainContentTitle">{"My courses"}</div>
          <div className="coursesContent">
            {myCourses.map((course) => (
              <CourseInfo
                key={course.id}
                id={course.id}
                name={course.name}
                description={course.description}
                author={course.author}
                imageLink={course.imageLink}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="mainContent">
        <div className="mainContentTitle">{"Courses"}</div>
        <div className="coursesContent">
          {courses.map((course) => (
            <CourseInfo
              key={course.id}
              id={course.id}
              name={course.name}
              description={course.description}
              author={course.author}
              imageLink={course.imageLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
