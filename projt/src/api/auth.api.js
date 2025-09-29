import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';
const TOKEN_KEY = 'recruiter_token';
const USER_KEY = 'recruiter_user';

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getUser = () => {
  const v = localStorage.getItem(USER_KEY);
  try { return v ? JSON.parse(v) : null; } catch { return null; }
}
export const clearUser = () => localStorage.removeItem(USER_KEY);

export const isAuthenticated = () => !!getToken();
export const getAuthHeader = () => ({ Authorization: `Bearer ${getToken()}` });

export const loginRecruiter = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  if (data?.success && data.token) {
    setToken(data.token);
    if (data.recruiter) setUser(data.recruiter);
  }
  return data;
};

export const registerRecruiter = async ({ name, address, email, password }) => {
  const { data } = await axios.post(`${API_URL}/register`, { name, address, email, password });
  if (data?.success && data.token) {
    setToken(data.token);
    if (data.recruiter) setUser(data.recruiter);
  }
  return data;
};

export const logoutRecruiter = () => {
  clearToken();
  clearUser();
};
