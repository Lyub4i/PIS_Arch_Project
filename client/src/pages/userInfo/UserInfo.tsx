import React, { useEffect, useState } from "react";
import "./UserInfo.scss";
import Header from "../../components/header/Header";
import { User, UserService } from "../../services/userService";
import {
  getRedirectedPage,
  getUserId,
  isAuthorized,
  saveIsStarted,
  saveRedirectedPage,
  saveUserId,
} from "../../services/localStorage";
import { Course, CourseService } from "../../services/courseService";

export interface BuyCourseProps {
  userId: number;
  courseId: number;
}

function UserInfo() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthorized()) {
        saveRedirectedPage(window.location.href);
        window.location.href = "http://localhost:3000/register";
      } else {
        const userId = getUserId();

        const currentUser = await UserService.getUserInfoById(userId!);

        setUser(currentUser);
      }
    };

    fetchData();
  }, []);

  const logout = async () => {
    await UserService.logout(user?.id!);
    saveUserId(0);

    window.location.href = "http://localhost:3000";
  };

  const moveToAdminPanel = () => {
    window.location.href = "http://localhost:3000/admin";
  };

  return (
    <div>
      <Header />
      <div className="userInfo">
        <div className="userInfoContent">
          <div className="userInfoInfo">
            <div className="userName">Name: {user?.username}</div>
            <div className="userRole">Role: {user?.role}</div>
          </div>
          <div className="userButton">
            <button onClick={logout}>Logout</button>
          </div>
          {user?.role! == "Admin" ? (
            <>
              <button onClick={moveToAdminPanel}>Admin panel</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
