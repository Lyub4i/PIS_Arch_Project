import axios from "axios";
import { saveUserId } from "./localStorage";
import { Course } from "./courseService";

const LOCAL_HOST = "https://localhost:7050";

export interface User {
  id: number;
  username: string;
  role: string;
  passwordHash: string;
  email: string;
  tokens: UserToken[];
  userProgresses: UserProgresses[];
}

export interface UserToken {
  refreshToken: string;
  refreshTokenExpTime: Date;
  userId: number;
}

export interface UserProgresses {
  courseId: number;
  progress: number;
}


export class UserService {
  constructor() {}

  static async register(username: string, password: string) {
    console.log("start");

    const getRequest = `${LOCAL_HOST}/User/register`;
    let responseData: any;

    try {
      const response = await axios.post(getRequest, null, {
        params: {
          username: username,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseData = response.data;
      console.log("Registration successful:", responseData);
    } catch (error: any) {
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }

    return responseData;
  }

  static async login(username: string, password: string) {
    console.log("start");

    const loginRequest = `${LOCAL_HOST}/User/login`;
    let responseData: any;

    try {
      const response = await axios.post(loginRequest, null, {
        params: {
          username: username,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseData = response.data;
      console.log("Login successful:", responseData);
    } catch (error: any) {
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }

    saveUserId(responseData.userId);

    return responseData;
  }

  static async getUserInfoById(userId: number) {
    const getRequest = `${LOCAL_HOST}/User/getUserInfoById`;
    let responseData: User;

    try {
      const response = await axios.get<User>(getRequest, {
        params: {
          userId: userId,
        },
      });
      responseData = response.data as User;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }

    return responseData;
  }

  static async logout(userId: number) {
    const postRequest = `${LOCAL_HOST}/User/logout`;
    
    try {
      await axios.post(postRequest, {
        userId: userId,
      });
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}
