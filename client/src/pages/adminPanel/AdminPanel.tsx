import React, { useEffect, useState } from "react";
import "./AdminPanel.scss";
import Header from "../../components/header/Header";
import axios from "axios";
import { getUserId } from "../../services/localStorage";

function AdminPanel() {
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(getUserId());

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get("https://localhost:7050/Course/courses");
      setCourses(response.data);
    };

    fetchCourses();
  }, []);

  const deleteCourse = async (courseId: number) => {
    try {
      await axios.delete(
        `https://localhost:7050/Course/course?userId=${userId}&courseId=${courseId}`
      );
      setCourses(courses.filter((course: any) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const updateCourse = async (courseId: number) => {
    window.location.href = "http://localhost:3000/courseForm?update";
  };

  const addCourse = () => {
    window.location.href = "http://localhost:3000/courseForm";
  };

  return (
    <div>
      <Header></Header>
      <div className="course-list">
        <h1 className="course-list__title">Courses</h1>
        <button
          className="course-item__button"
          onClick={() => addCourse()}
        >
          Add course
        </button>
        <ul className="course-list__items">
          {courses.map((course: any) => (
            <li key={course.id} className="course-item">
              <div className="course-item__content">
                <h2 className="course-item__title">{course.name}</h2>
                <p className="course-item__description">{course.description}</p>
                <p className="course-item__author">Author: {course.author}</p>
                <img
                  src={course.imageLink}
                  alt={course.name}
                  className="course-item__image"
                />
                <p className="course-item__price">Price: {course.price}</p>
                <button
                  className="course-item__button"
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete
                </button>

                <button
                  className="course-item__button"
                  onClick={() => updateCourse(course.id)}
                  style={{marginLeft: '20px'}}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
