
const BASE_URL =import.meta.env.VITE_BACKEND_URL
export const reviewApis={
    getReviews: `${BASE_URL}/api/v1/course/getReviews`,
    getAverageRating: `${BASE_URL}/api/v1/course/getAverageRating`,
    createRating: `${BASE_URL}/api/v1/course/createRating`,

}

export const authApis={
    login:`${BASE_URL}/api/v1/user/login`,
    signup:`${BASE_URL}/api/v1/user/signup`,
    sendOtp:`${BASE_URL}/api/v1/user/send-otp`,
    resetPasswordToken:`${BASE_URL}/api/v1/user/reset-password-token`,
    resetPassword:`${BASE_URL}/api/v1/user/reset-password`,
    changePassword:`${BASE_URL}/api/v1/user/change-password`,
}