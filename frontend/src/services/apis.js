const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const reviewApis = {
  getReviews: `${BASE_URL}/api/v1/course/getReviews`,
  getAverageRating: `${BASE_URL}/api/v1/course/getAverageRating`,
  createRating: `${BASE_URL}/api/v1/course/createRating`,
};

export const authApis = {
  login: `${BASE_URL}/api/v1/user/login`,
  signup: `${BASE_URL}/api/v1/user/signup`,
  sendOtp: `${BASE_URL}/api/v1/user/send-otp`,
  resetPasswordToken: `${BASE_URL}/api/v1/user/reset-password-token`,
  resetPassword: `${BASE_URL}/api/v1/user/reset-password`,
  changePassword: `${BASE_URL}/api/v1/user/change-password`,
};

export const catagoryApi = {
  allCategories: `${BASE_URL}/api/v1/course/showAllcategories`,
  categoryPage: `${BASE_URL}/api/v1/course/getCategoryPageDetails`,
  createCategory: `${BASE_URL}/api/v1/course/createCatefory`,
};

export const courseApi = {
  createCourse: `${BASE_URL}/api/v1/course/createCourse`,
  getFullCourseDetails: `${BASE_URL}/api/v1/course/getFullCourseDetails`,
  getCourseDetails: `${BASE_URL}/api/v1/course/getCourseDetails`,
  updateCourseProgress:`${BASE_URL}/api/v1/course/updateCourseProgress`
};
export const profileApi = {
  getUserDetails: `${BASE_URL}/api/v1/profile/getUserDetails`,
  updateDisplayPicture: `${BASE_URL}/api/v1/profile/updateDisplayPicture`,
  updateProfile: `${BASE_URL}/api/v1/profile/updateProfile`,
};
