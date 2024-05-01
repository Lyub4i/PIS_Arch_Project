import axios from "axios";

const LOCAL_HOST = "https://localhost:7050";

export interface Course {
  id: number;
  name: string;
  description: string;
  author: string;
  imageLink: string;
  courseType: number;
  price: number;
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
          userId: id,
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

  static async getCurrentLesson(
    courseId: number,
    userId: number
  ): Promise<Lesson> {
    const getRequest = `${LOCAL_HOST}/Lesson/currentLesson`;
    let responseData: Lesson | null = null;

    try {
      const response = await axios.get<Lesson>(getRequest, {
        params: {
          courseId: courseId,
          userId: userId
        },
      });
      responseData = response.data;
      console.log(responseData);
      
    } catch (error) {
      console.error("Error fetching trailer for course:", error);
    }

    return responseData as Lesson;
  }

  static async getCourseInfo(courseId: number) {
    console.log("start");

    const getRequest = `${LOCAL_HOST}/Course/courseInfo`;
    let responseData: any;

    try {
      const response = await axios.get(getRequest, {
        params: {
          courseId: courseId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseData = response.data;
      console.log("Course info received:", responseData);
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

    return responseData as Course;
  }

  static async getLessonInfo(lessonId: number) {
    console.log("start");

    const getRequest = `${LOCAL_HOST}/Lesson/lessonInfo`;
    let responseData: any;

    try {
      const response = await axios.get(getRequest, {
        params: {
          lessonId: lessonId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseData = response.data;
      console.log("Course info received:", responseData);
    } catch (error: any) {
    }

    return responseData as Lesson;
  }

  static async getMaterialInfo(materialId: number) {
    console.log("start");

    const getRequest = `${LOCAL_HOST}/Lesson/MaterialInfo`;
    let responseData: any;

    try {
      const response = await axios.get(getRequest, {
        params: {
          materialId: materialId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      responseData = response.data;
      console.log("Course info received:", responseData);
    } catch (error: any) {
    }

    return responseData as Material;
  }

  static async startCourse(userId: number, courseId: number) {
    console.log("start");

    const getRequest = `${LOCAL_HOST}/Course/startCourse`;

    try {
      const response = await axios.post(getRequest, null, {
        params: {
          userId: userId,
          courseId: courseId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
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
  }

  static async goToTheNext(courseId: number, userId: number) {
    const getRequest = `${LOCAL_HOST}/Lesson/goToTheNext`;
    let responseData: any;

    try {
      const response = await axios.post(getRequest, null, {
        params: {
          courseId: courseId,
          userId: userId,
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

  static async getLessons(courseId: number): Promise<Lesson[]> {
    const getRequest = `${LOCAL_HOST}/Lesson/lessons`;
    let responseData: Lesson[] | null = null;

    try {
      const response = await axios.get<Lesson[]>(getRequest, {
        params: {
          courseId: courseId,
        },
      });
      console.log("Lessons response: " + response);
      
      responseData = response.data;
    } catch (error) {
      console.error("Error fetching trailer for course:", error);
    }

    return responseData as Lesson[];
  }

  static async getMaterials(lessonId: number): Promise<Material[]> {
    const getRequest = `${LOCAL_HOST}/Lesson/materials`;
    let responseData: Material[] | null = null;

    try {
      const response = await axios.get<Material[]>(getRequest, {
        params: {
          lessonId: lessonId,
        },
      });
      console.log("Lessons response: " + response);
      
      responseData = response.data;
    } catch (error) {
      console.error("Error fetching trailer for course:", error);
    }

    return responseData as Material[];
  }
}
