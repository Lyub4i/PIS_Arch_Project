import { number } from "yargs";

function saveCourseData(id: number): boolean {
  if (typeof id == "number") {
    localStorage.setItem("courseId", id.toString());
    return true;
  }

  return false;
}

function getCourseId() {
  return localStorage.getItem("courseId");
}

export { saveCourseData, getCourseId };
