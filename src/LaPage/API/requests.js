import axios from "axios"
import { redirect } from "react-router";


export const BASE_URL = 'http://localhost:8085'

axios.interceptors.request.use(
   config => {
      setAuthorizationHeader();
      return config;
   },
   error => {
      return Promise.reject(error);
   }
);
const setAuthorizationHeader = () => {
   const token = localStorage.getItem('token');
   if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   } else {
      delete axios.defaults.headers.common['Authorization'];
   }
};
const refreshToken = async () => {
   try {
      const response = await axios.post('http://localhost:8085/refreshToken', {
         refreshToken: localStorage.getItem('refreshToken'),
      })
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      return response.data.token;
   } catch (error) {
      localStorage.clear()
      throw error;
   }
};


axios.interceptors.response.use(
   (response) => response,
   async (error) => {
      if (error.response?.data === 'Нужна повторная авторизация') {
         localStorage.clear();
         return Promise.reject(error);
      }
      const originalRequest = error.config;
      originalRequest._retryCount = originalRequest._retryCount || 0;
      if ((error.response.status === 401||error.response.status === 500 )&& originalRequest._retryCount < 1) {
         originalRequest._retryCount++;
         try {
            if (localStorage.length) {
               const newAccessToken = await refreshToken();
               originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
               if (newAccessToken) {
                  return axios(originalRequest);
               }
            }
         } catch (refreshError) {
            localStorage.clear()
            throw refreshError
         }
      }
      return Promise.reject(error);
   }
);

export async function fetchClients(page = 0, status, pageSize = 12) {
   const data = await axios.get(`${BASE_URL}/employee/clients?offset=${page}&pageSize=${pageSize}&status=${status ? status : 'in_progress'}`)
   return data
}
export async function fetchTasks(page, status) {
   const data = await axios.get(`${BASE_URL}/task?offset=${page}&pageSize=20&status=${status}`)
   return data
}
export async function fetchAdminTasks(page, status, id) {
   const data = await axios.get(`${BASE_URL}/task/admin?offset=${page}&pageSize=20&status=${status}&id=${id}`)
   return data
}
export async function fetchTask(id) {
   const data = await axios.get(`${BASE_URL}/task/${id}`)
   return data
}
export async function fetchClient(id) {
   const data = await axios.get(`${BASE_URL}/employee/clients/${id}`)
   return data
}
export async function fetchRecipients() {
   const data = await axios.get(`${BASE_URL}/task/fullName`)
   return data
}
export async function fetchEmployees(page) {

   const data = await axios.get(`${BASE_URL}/employee/info?offset=${page}&pageSize=20`)
   return data
}
export async function fetchEmployee(id) {
   const data = await axios.get(`${BASE_URL}/employee/info/${id}`)
   return data
}