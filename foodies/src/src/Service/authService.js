import axios from "axios";
import apiClient from './apiClient';

const API_URL = "http://localhost:8080/api/auth";

export const login = async (data) => {
  try {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response;
  } catch (error) {
    console.error("Error in registerUser:", error.response?.data || error.message);
    throw error;
  }
};