import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response;
  } catch (error) {
    console.error("Error in registerUser:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response;
  } catch (error) {
    console.error("Error in login:", error.response?.data || error.message);
    throw error;
  }
};
