import React from 'react'
import style from './PopUpAdd.module.scss'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const PopUpAdd = ({ children }) => {
   const navigate = useNavigate()
   const [searchParams,setSearchParams]= useSearchParams()
   return (
      <>
         <div className={style.overlay}
            onClick={() => navigate(`..?${searchParams.toString()}`)}
            >
         </div>
         <div className={style.content}>
            {children}
         </div>
      </>
   )
}

export default PopUpAdd