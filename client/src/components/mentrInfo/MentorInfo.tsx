import React from "react";
import Header from "../../components/header/Header";
import "./MentorInfo.scss";
import CourseInfo from "../../components/courseInfoContent/CourseInfo";

export interface MentorInfoProps {
  fullName: string;
  photoLink: string;
  description: string;
}

function MentorInfo({ fullName, photoLink, description }: MentorInfoProps) {
  return (
    <div className="mentorInfo">
      <div className="mentorPhoto">
        <img src={photoLink} className="mentorAvatarSettings" />
      </div>
      <div className="mentorMain">
        <div className="mentorTitle">{fullName}</div>
        <div className="mentorDescription">{description}</div>
      </div>
    </div>
  );
}

export default MentorInfo;
