import React from 'react'
import style from './TemplateCard.module.scss'
import { Link } from 'react-router-dom'
// import img from '../TemplateImages/IPcontract.png'

const TemplateCard = ({ name,image,doc}) => {

   return (
      <Link
      to={`generate?doc=${doc}`}
         className={style.wrapper}>
         <div className={style.imgwrapper}>
            <img
               src={image}
            ></img>
         </div>
         <div className={style.name}>
            {name}
         </div>
      </Link>
   )
}

export default TemplateCard