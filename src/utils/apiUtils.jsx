import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}`;

const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/users/login`, credentials);
};

const signupUser = async (credentials) => {
  return axios.post(`${API_URL}/users/signup`, credentials);
};

const addProfile = async (profileData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.post(`${API_URL}/profile`, profileData, config);
};

const getProfile = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.get(`${API_URL}/profile`, config);
};

const getRequests = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.get(`${API_URL}/requests`, config);
};

const initializeDonation = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return axios.post(
    `${API_URL}/donations/initialize/${id}`,
    {
      buttonClicked: "respond",
    },
    config
  );
};

const countDonations = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.get(`${API_URL}/donations/count/${id}`, config);
};

const postRequest = async (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.post(`${API_URL}/requests`, data, config);
};

const editProfile = async (profile) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.put(`${API_URL}/profile`, profile, config);
};

export {
  loginUser,
  signupUser,
  addProfile,
  getProfile,
  getRequests,
  initializeDonation,
  countDonations,
  postRequest,
  editProfile,
};
