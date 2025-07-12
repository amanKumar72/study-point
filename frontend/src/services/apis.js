const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const reviewApis = {
  getReviews: `${BASE_URL}/course/getReviews`,
  getAverageRating: `${BASE_URL}/course/getAverageRating`,
  createRating: `${BASE_URL}/course/createRating`,
};

export const authApis = {
  login: `${BASE_URL}/user/login`,
  signup: `${BASE_URL}/user/signup`,
  sendOtp: `${BASE_URL}/user/send-otp`,
  resetPasswordToken: `${BASE_URL}/user/reset-password-token`,
  resetPassword: `${BASE_URL}/user/reset-password`,
  changePassword: `${BASE_URL}/user/change-password`,
};

export const catagoryApi = {
  allCategories: `${BASE_URL}/course/showAllcategories`,
  categoryPage: `${BASE_URL}/course/getCategoryPageDetails`,
  createCategory: `${BASE_URL}/course/createCategory`,
};

export const courseApi = {
  createCourse: `${BASE_URL}/course/createCourse`,
  getFullCourseDetails: `${BASE_URL}/course/getFullCourseDetails`,
  editCourse: `${BASE_URL}/course/editCourse`,
  getCourseDetails: `${BASE_URL}/course/getCourseDetails`,
  updateCourseProgress: `${BASE_URL}/course/updateCourseProgress`,
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
};
export const profileApi = {
  getUserDetails: `${BASE_URL}/profile/getUserDetails`,
  updateDisplayPicture: `${BASE_URL}/profile/updateDisplayPicture`,
  updateProfile: `${BASE_URL}/profile/updateProfile`,
};
