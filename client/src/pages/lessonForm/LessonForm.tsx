import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LessonForm.scss";
import Header from "../../components/header/Header";
import {
  getCourseId,
  getLessonId,
  getUserId,
  saveMaterialId,
} from "../../services/localStorage";
import { CourseService } from "../../services/courseService";

const LessonForm = () => {
  const [lessonData, setLessonData] = useState({
    id: 0,
    title: "",
    description: "",
    content: "",
    courseId: 0,
  });
  const [materialData, setMaterialData] = useState([
    {
      id: 0,
      link: "",
      description: "",
      fileType: 0,
      lessonId: 0,
    },
  ]);

  const [isUpdatedMode, setIsUpdatedMode] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const updateMode = window.location.href.includes("update");

      if (updateMode) {
        console.log("Update mode");

        const lessonId = getLessonId();
        setIsUpdatedMode(true);
        const course = await CourseService.getLessonInfo(lessonId!);
        const materials = await CourseService.getMaterials(lessonId!);

        setMaterialData(materials);
        setLessonData(course);
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
    setLessonData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "courseType" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const currentUserId = getUserId();
      const currentCourseId = getCourseId();

      lessonData.courseId = Number.parseInt(currentCourseId!);

      console.log(lessonData);
      console.log(currentUserId);

      const response = isUpdatedMode
        ? await axios.put("https://localhost:7050/Lesson/lesson", lessonData, {
            params: {
              userId: currentUserId,
              courseId: currentCourseId,
            },
          })
        : await axios.post("https://localhost:7050/Lesson/lesson", lessonData, {
            params: {
              userId: currentUserId,
              courseId: currentCourseId,
            },
          });

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    window.location.href = "http://localhost:3000/courseForm?update";
  };

  const moveToMaterialUpdate = (id: any) => {
    saveMaterialId(id);
    window.location.href = "http://localhost:3000/materialForm?update";
  };

  const deleteMaterial = async (id: any) => {
    try {
      const response = await axios.delete(
        `https://localhost:7050/Lesson/material`,
        {
          params: {
            materialId: id,
          },
        }
      );
      console.log("Lesson deleted successfully:", response);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }

    window.location.reload();
  };

  const addToMaterial = () => {
    window.location.href = "http://localhost:3000/materialForm";
  };

  return (
    <div>
      <Header />
      <div className="course-form-container">
        {isUpdatedMode ? <h1>Update Lesson</h1> : <h1>Add Lesson</h1>}
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={lessonData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <input
              type="text"
              name="content"
              value={lessonData.content}
              onChange={handleChange}
              required
            />
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
            <button onClick={() => addToMaterial()}>Add material</button>
            {materialData.map((lesson: any) => (
              <div className="lesson-card" key={lesson.id}>
                <p>{lesson.description}</p>
                <button onClick={() => moveToMaterialUpdate(lesson.id)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteMaterial(lesson.id)}
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

export default LessonForm;
