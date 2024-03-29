import React from "react";
import "./CourseInfo.scss";

export interface CourseInfoProps {
  id: number;
  name: string;
  description: string;
  author: string;
  imageLink: string;
}

function CourseInfo({
  id,
  name,
  description,
  author,
  imageLink,
}: CourseInfoProps) {
  return (
    <div className="courseInfo">
      <div className="courseInfoImageBlock">
        <img src={imageLink} alt="" width="255px" />
      </div>
      <div className="courseInfoBlock">
        <div className="courseInfoTitle">{name}</div>
        <div className="courseInfoDescription">{description}</div>
      </div>
    </div>
  );
}

export default CourseInfo;
