function saveCourseData(id: number, isStarted: boolean): boolean {
  if (typeof id == "number") {
    localStorage.setItem("courseId", id.toString());
    localStorage.setItem("isStarted", "true");
    return true;
  }

  return false;
}

function saveUserId(userId: number){
  localStorage.setItem("userId", userId.toString());
}

function getUserId(){
  let userId = localStorage.getItem("userId");
  if(userId){
    return Number.parseInt(userId);
  }
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

export {
  saveCourseData,
  getCourseId,
  getIsCourseStarted,
  saveRedirectedPage,
  getRedirectedPage,
  saveUserId,
  getUserId
};
