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

export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string;
  materials: Material[];
  course: Course;
  courseId: number;
}

export interface Material {
  id: number;
  link: string;
  description: string;
  fileType: number;
  lesson: Lesson | null;
  lessonId: number;
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
      console.error("Error fetching courses:", error);
    }

    return responseData;
  }

  static async getMyCourses(id: number): Promise<Course[]> {
    const getRequest = `${LOCAL_HOST}/Course/myCourses`;
    let responseData: Course[] = [];

    try {
      const response = await axios.get<Course[]>(getRequest, {
        params: {
          id: id,
        },
      });
      responseData = response.data;
    } catch (error) {
      console.error("Error fetching my courses:", error);
    }

    return responseData;
  }

  static async getTrailerForCourse(courseId: number): Promise<Lesson> {
    const getRequest = `${LOCAL_HOST}/Lesson/getFirstLesson`;
    let responseData: Lesson | null = null;

    try {
      const response = await axios.get<Lesson>(getRequest, {
        params: {
          courseId: courseId,
        },
      });
      responseData = response.data;
    } catch (error) {
      console.error("Error fetching trailer for course:", error);
    }

    return responseData as Lesson;
  }
}
