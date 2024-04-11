import React from 'react'
import style from './BiddingBar.module.scss'

const BiddingBar = () => {
   return (
      <div className={style.wrapper}>
         <div className={style.tickBar}>
            <div>Выбрать все</div>
            <div>Снять все</div>
         </div>
         <select className={style.select}>
            <option>
               ---
            </option>
            <option>
               Бусарев Кирилл
            </option>
            <option>
               Георгий Курбатов
            </option>
         </select>
      </div>
   )
}

export default BiddingBar