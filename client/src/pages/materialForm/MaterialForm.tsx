import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MaterialForm.scss";
import Header from "../../components/header/Header";
import { getLessonId, getMaterialId, getUserId } from "../../services/localStorage";
import { CourseService } from "../../services/courseService";

const MaterialForm = () => {
  const [materialData, setMaterialData] = useState({
    id: 0,
    link: "",
    description: "",
    fileType: 0,
    lessonId: 0,
  });

  const [isUpdatedMode, setIsUpdatedMode] = useState(false);

  useEffect(() => {
    const fetchMaterial = async () => {
      const updateMode = window.location.href.includes("update");

      if (updateMode) {
        console.log("Update mode");

        const materialId = getMaterialId();
        setIsUpdatedMode(true);
        const material = await CourseService.getMaterialInfo(materialId!);

        setMaterialData(material);
      }
    };

    fetchMaterial();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMaterialData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "fileType" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const currentUserId = getLessonId();

      console.log(materialData);
      console.log(currentUserId);

      materialData.lessonId = currentUserId!;

      const response = isUpdatedMode
        ? await axios.put("https://localhost:7050/Lesson/material", materialData)
        : await axios.post("https://localhost:7050/Lesson/material", materialData);

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
      <div className="material-form-container">
        {isUpdatedMode ? <h1>Update Material</h1> : <h1>Add Material</h1>}
        <form onSubmit={handleSubmit} className="material-form">
          <div className="form-group">
            <label>Link:</label>
            <input
              type="text"
              name="link"
              value={materialData.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={materialData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>File Type:</label>
            <input
              type="number"
              name="fileType"
              value={materialData.fileType}
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
      </div>
    </div>
  );
};

export default MaterialForm;
