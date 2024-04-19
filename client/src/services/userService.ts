import axios from "axios";
import { saveUserId } from "./localStorage";

const LOCAL_HOST = "https://localhost:7050";

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
}
