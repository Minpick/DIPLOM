import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BASE_URL } from '../../../LaPage/API/requests'


async function fetchProfileInfo(){
   const data = await axios.get(`${BASE_URL}/employee/clients/showForClient`)
   return data.data
}

const ProfilePage = () => {
   const {data,isLoading} = useQuery({ queryKey: ['profileInfo'], queryFn: () => fetchProfileInfo() })
   console.log(data)
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage