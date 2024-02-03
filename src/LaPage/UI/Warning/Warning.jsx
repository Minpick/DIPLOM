import React from 'react'
import style from './Warning.module.scss'

const Warning = ({ message,onClick }) => {

   return (
      <div className={style.wrapper}
      >
         <div className={style.overlay}
         onClick={()=>onClick()}

         >
         </div>
         <div className={style.content}>
            <div className={style.message}>
               {message}
            </div>
         </div>
      </div>
   )
}

export default Warning