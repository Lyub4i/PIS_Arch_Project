function saveCourseData(id: number, isStarted: boolean): boolean {
  if (typeof id == "number") {
    localStorage.setItem("courseId", id.toString());
    localStorage.setItem("isStarted", isStarted ? "true" : "false");
    return true;
  }

  return false;
}

function saveIsStarted(isStarted: boolean) {
  localStorage.setItem("isStarted", isStarted ? "true" : "false");
}

function saveUserId(userId: number) {
  localStorage.setItem("userId", userId.toString());
}

function saveLessonId(lessonId: number) {
  localStorage.setItem("lessonId", lessonId.toString());
}

function getLessonId() {
  let userId = localStorage.getItem("lessonId");
  if (userId) {
    return Number.parseInt(userId);
  }
}

function getUserId() {
  let userId = localStorage.getItem("userId");
  if (userId) {
    return Number.parseInt(userId);
  }
}

function isAuthorized() {
  let userId = localStorage.getItem("userId");
  if (userId && userId != null) {
    if (Number.parseInt(userId) != 0) {
      return true;
    }
  }

  return false;
}

function saveCourseId(courseId: number) {
  localStorage.setItem("courseId", courseId.toString());
}

function saveRedirectedPage(lstPage: string) {
  localStorage.setItem("redirectedPage", lstPage);
}

function getRedirectedPage() {
  return localStorage.getItem("redirectedPage");
}

function getCourseId() {
  return localStorage.getItem("courseId");
}

function getIsCourseStarted() {
  return localStorage.getItem("isStarted") == "true" ? true : false;
}

function getMaterialId() {
  let userId = localStorage.getItem("materialId");
  if (userId) {
    return Number.parseInt(userId);
  }
}

function saveMaterialId(id: any) {
  localStorage.setItem("materialId", id.toString());
}

export {
  saveCourseData,
  getCourseId,
  getIsCourseStarted,
  saveRedirectedPage,
  getRedirectedPage,
  saveUserId,
  getUserId,
  isAuthorized,
  saveIsStarted,
  saveCourseId,
  saveLessonId,
  getLessonId,
  getMaterialId,
  saveMaterialId,
};
