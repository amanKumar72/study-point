
const BASE_URL =import.meta.env.VITE_BACKEND_URL
export const reviewApis={
    getReviews: `${BASE_URL}/api/v1/course/getReviews`,
    getAverageRating: `${BASE_URL}/api/v1/course/getAverageRating`,
    createRating: `${BASE_URL}/api/v1/course/createRating`,

}