import axios from "axios";
const API_URL = "http://localhost:8080";

const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const signupUser = async (credentials) => {
  return axios.post(`${API_URL}/signup`, credentials);
};

export { loginUser, signupUser };
