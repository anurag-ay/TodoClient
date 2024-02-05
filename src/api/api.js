import axios from "axios";

let BASE_URL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://task-manager-server-lake.vercel.app";
}

// Axios Instance
export default axios.create({ baseURL: BASE_URL });

// Routes

// User Routes
export const registerUserRoute = "/api/v1/user/register";
export const logInRoute = "/api/v1/user/login";
export const getUserRoute = "/api/v1/user/getUser"; //:userId

// Category Routes
export const addCategoryRoute = "/api/v1/category";
export const getCategoriesByUserIdRoute = "/api/v1/category"; //:userId
export const deleteCategoryRoute = "/api/v1/category"; //:userId/:categoryId/
export const updateCategoryRoute = "/api/v1/category";

// Task Routes
export const addTaskRoute = "/api/v1/task";
export const deleteTaskRoute = "/api/v1/task"; // /:userId/:categoryId/:taskId
export const updateTaskRoute = "/api/v1/task";
export const getAllTaskRoute = "/api/v1/task";
export const getTaskByIdRoute = "/api/v1/task"; //:taskId

// decodeToken Routes
export const decodeTokenRoute = "/api/v1/decodeToken";
