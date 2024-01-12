const BASE_URL = 'http://localhost:8085/employee'

export async function fetchClients() {

   const data = await axios.get(`${BASE_URL}/clients`)
   return data
}