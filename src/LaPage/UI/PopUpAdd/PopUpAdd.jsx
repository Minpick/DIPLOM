import React from 'react'
import style from './PopUpAdd.module.scss'
import { useNavigate } from 'react-router'

const PopUpAdd = ({ children }) => {
   const navigate = useNavigate()
   return (
      <>
         <div className={style.overlay}
            onClick={() => navigate('..')}
         >
         </div>
         {/* <div className={style.content}> */}
            {children}
         {/* </div> */}
      </>
   )
}

export default PopUpAdd