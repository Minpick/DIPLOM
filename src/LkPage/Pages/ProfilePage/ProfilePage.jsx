import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BASE_URL } from '../../../LaPage/API/requests'
import { useNavigate } from 'react-router'
import style from './ProfilePage.module.scss'
import ProfilePageForm from './ProfilePageForm/ProfilePageForm'
import UploadDocs from './UploadDocs/UploadDocs'
import { queryClient } from '../../../App'
import moment from 'moment'


async function fetchProfileInfo() {
   const data = await axios.get(`${BASE_URL}/employee/clients/showForClient`)
   return data.data
}
export async function action({request}){
   const formData = await request.formData()
   const email = formData.get("email")
   const firstName = formData.get("firstName")
   const lastName = formData.get("lastName")
   const birth = moment(formData.get("birth"),'DD.MM.YYYY').format('YYYY-MM-DD')
   const patronymic = formData.get("patronymic")
   const user = {
      firstName: firstName,
      lastName: lastName,
      email:email,
      patronymic: patronymic,
      birth: birth,
   }
   try {
      const data = await axios.post(`${BASE_URL}/employee/clients/updateForClient`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      return err
   }
   finally{
      queryClient.invalidateQueries('profileInfo')
   }
}

const ProfilePage = () => {
   const navigate = useNavigate()
   const { data, isLoading } = useQuery({ queryKey: ['profileInfo'], queryFn: () => fetchProfileInfo() })
   console.log(data)
   return (
      <div className={style.wrapper}>
         <div className={style.block}>
            <div
               className={style.heading}
            >Личная информация</div>
            <ProfilePageForm data={data} />
         </div>
         <div className={style.block}>
            <div className={style.heading}>
               Загрузка документов
            </div>
            <UploadDocs />
         </div>
      </div>
   )
}

export default ProfilePage