import axios from "axios";

const LOCAL_HOST = "https://localhost:7050";

export interface Course {
  id: number;
  name: string;
  description: string;
  author: string;
  imageLink: string;
  courseType: number;
}

export class CourseService {
  constructor() {}

  static async getCourses(): Promise<Course[]> {
    const getRequest = `${LOCAL_HOST}/Course/courses`;
    let responseData: Course[] = [];

    try {
      const response = await axios.get<Course[]>(getRequest);
      responseData = response.data;
    } catch (error) {
      responseData = [];
    }

    return responseData;
  }

  static async getMyCourses(id: number): Promise<Course[]> {
    const getRequest = `${LOCAL_HOST}/Course/myCourses`;
    let responseData: Course[] = [];

    try {
      const response = await axios.get<Course[]>(getRequest, {
        data: {
          id: id,
        },
      });
      responseData = response.data;
    } catch (error) {
      responseData = [];
    }

    return responseData;
  }
}
