import React from 'react'
import style from './CustomCard.module.scss'

const CustomCard = ({heading,name,children}) => {
  return (
   <div className={style.wrapper}>
   <div className={style.box} />
   <div className={style.content}>
      <div className={style.heading}>
         {heading}
         <span>
            {name}
         </span>
      </div>
      {children}

   </div>
</div>
  )
}

export default CustomCard