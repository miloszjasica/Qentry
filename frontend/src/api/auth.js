import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

export const login = (email, password) => {
  return axios.post(`${API_URL}/login/`, { email, password });
};

export const registerUser = (data) => {
  return axios.post(`${API_URL}/register/`, data);
};

export const logout = () => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  return axios.post(
    `${API_URL}/logout/`,
    {
      refresh: refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};