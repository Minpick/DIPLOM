import axios from "axios"
import { redirect } from "react-router";


export const BASE_URL = 'http://localhost:8085/employee'

const refreshToken = async () => {
   try {
      const response = await axios.post('http://localhost:8085/refreshToken', {
         // Передайте необходимые данные для обновления токена
         refreshToken: localStorage.getItem('refreshToken'),
      })
      // Обновите токен в axios или в localStorage, в зависимости от вашей логики
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // Верните новый токен, чтобы его можно было использовать в месте вызова refreshToken
      return response.data.token;
   } catch (error) {
    

      // Обработайте ошибку обновления токена, например, выход пользователя или другие действия
      localStorage.clear()
      throw error;
   }
};

axios.interceptors.response.use(
   (response) => response,
   async (error) => {
      if(error.response.data==='Нужна повторная авторизация'){
         localStorage.clear();
         return Promise.reject(error);
      }
      const originalRequest = error.config;
      originalRequest._retryCount = originalRequest._retryCount || 0;
      if (error.response.status === 401 && originalRequest._retryCount < 1) {
         originalRequest._retryCount++;
         try {
            if(localStorage.length){
               const newAccessToken = await refreshToken();
               // Повторите оригинальный запрос с обновленным токеном
               originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
               if (newAccessToken) {
                  return axios(originalRequest);
               }
            }
         } catch (refreshError) {

            // Обработайте ошибку обновления токена, например, перенаправьте пользователя на страницу входа
            localStorage.clear()
            throw refreshError
         }
      }
      return Promise.reject(error);
   }
);

export async function fetchClients(page,status) {
   const data = await axios.get(`${BASE_URL}/clients?offset=${page}&pageSize=20&status=${status}`)
   return data
}
export async function fetchClient(id) {
   const data = await axios.get(`${BASE_URL}/clients/${id}`)
   return data
}
export async function fetchEmployees(page) {

   const data = await axios.get(`${BASE_URL}/info?offset=${page}&pageSize=20`)
   return data
}
export async function fetchEmployee(id) {
   const data = await axios.get(`${BASE_URL}/info/${id}`)
   return data
}