import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

service.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return request;
  }
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

// Function to call the backend endpoint for generating artwork
export const generateArtwork = async (prompt) => {
  try {
    const response = await service.post("/api/openai/generate-artwork", { prompt });
    return response.data.url;
  } catch (error) {
    console.error("Error generating artwork: ", error);
    throw error;
  }
};

// Function to call the backend endpoint for generating poems
export const generatePoem = async (prompt) => {
  try {
    const response = await service.post("/api/openai/generate-poem", { prompt });
    return response.data.poem;
  } catch (error) {
    console.error("Error generating poem: ", error);
    throw error;
  }
};

export default service;