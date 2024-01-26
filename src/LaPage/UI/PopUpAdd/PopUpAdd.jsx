import React from 'react'
import style from './PopUpAdd.module.scss'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const PopUpAdd = ({ children,noClick }) => {
   const navigate = useNavigate()
   const [searchParams,setSearchParams]= useSearchParams()
   return (
      <div className={style.wrapper}>
         <div className={style.overlay}
            onClick={() => noClick?'':navigate(`..?${searchParams.toString()}`)}
            >
         </div>
         <div className={style.content}>
            {children}
         </div>
      </div>
   )
}

export default PopUpAdd