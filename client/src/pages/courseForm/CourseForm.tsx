// CourseForm.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseForm.scss";
import Header from "../../components/header/Header";
import {
  getCourseId,
  getUserId,
  saveLessonId,
} from "../../services/localStorage";
import { CourseService } from "../../services/courseService";

const CourseForm = () => {
  const [courseData, setCourseData] = useState({
    id: 0,
    name: "",
    description: "",
    author: "",
    imageLink: "",
    price: 0,
    courseType: 1,
  });
  const [lessonsData, setLessonsData] = useState([
    {
      id: 0,
      title: "",
      description: "",
    },
  ]);

  const [isUpdatedMode, setIsUpdatedMode] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const updateMode = window.location.href.includes("update");

      if (updateMode) {
        console.log("Update mode");

        const courseId = getCourseId();
        setIsUpdatedMode(true);
        const course = await CourseService.getCourseInfo(
          Number.parseInt(courseId!)
        );

        const lessons = await CourseService.getLessons(
          Number.parseInt(courseId!)
        );

        console.log("Lessons: " + lessons);

        setLessonsData(lessons);
        setCourseData(course);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "courseType" ? parseFloat(value) : value,
    }));
  };

  const moveToLessonUpdate = (id: any) => {
    saveLessonId(id);
    window.location.href = "http://localhost:3000/lessonForm?update";
  };

  const deleteLesson = async (id: any) => {
    try {
      const response = await axios.delete(
        `https://localhost:7050/Lesson/lesson`,
        {
          params: {
            lessondId: id,
          },
        }
      );
      console.log("Lesson deleted successfully:", response);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }

    window.location.reload();
  };

  const addToLesson = () => {
    window.location.href = "http://localhost:3000/lessonForm";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const currentUserId = getUserId();

      console.log(courseData);
      console.log(currentUserId);

      const response = isUpdatedMode
        ? await axios.put("https://localhost:7050/Course/course", courseData, {
            params: {
              userId: currentUserId,
            },
          })
        : await axios.post("https://localhost:7050/Course/course", courseData, {
            params: {
              userId: currentUserId,
            },
          });

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="course-form-container">
        {isUpdatedMode ? <h1>Update Course</h1> : <h1>Add Course</h1>}
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={courseData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={courseData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image Link:</label>
            <input
              type="text"
              name="imageLink"
              value={courseData.imageLink}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={courseData.price.toString()}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Course Type:</label>
            <select
              name="courseType"
              value={courseData.courseType.toString()}
              onChange={handleChange}
              required
            >
              <option value="1">Type 1</option>
              <option value="2">Type 2</option>
            </select>
          </div>
          {isUpdatedMode ? (
            <>
              <button type="submit">Update</button>
            </>
          ) : (
            <>
              <button type="submit">Submit</button>
            </>
          )}
        </form>
        {isUpdatedMode ? (
          <div className="lessons-container">
            <button onClick={() => addToLesson()}>Add Lesson</button>
            {lessonsData.map((lesson: any) => (
              <div className="lesson-card" key={lesson.id}>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
                <button onClick={() => moveToLessonUpdate(lesson.id)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteLesson(lesson.id)}
                  style={{ marginLeft: "20px" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CourseForm;
