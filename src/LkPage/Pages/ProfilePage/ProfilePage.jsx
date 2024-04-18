import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BASE_URL } from '../../../LaPage/API/requests'
import { useNavigate } from 'react-router'
import style from './ProfilePage.module.scss'
import ProfilePageForm from './ProfilePageForm/ProfilePageForm'
import UploadDocs from './UploadDocs/UploadDocs'


async function fetchProfileInfo() {
   const data = await axios.get(`${BASE_URL}/employee/clients/showForClient`)
   return data.data
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
         <button
            className={style.exitbtn}
            onClick={() => { localStorage.clear(); navigate('/auth') }}
         >
            Выйти
         </button>
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