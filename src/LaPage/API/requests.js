import axios from "axios"

export const BASE_URL = 'http://localhost:8085/employee'

export async function fetchClients() {
   const data = await axios.get(`${BASE_URL}/clients?offset=0&pageSize=20`)
   return data
}
export async function fetchClient(id) {
   const data = await axios.get(`${BASE_URL}/clients/${id}`)
   return data
}
export async function fetchEmployees() {
   const data = await axios.get(`${BASE_URL}/info`)
   return data
}
export async function fetchEmployee(id) {
   const data = await axios.get(`${BASE_URL}/info/${id}`)
   return data
}