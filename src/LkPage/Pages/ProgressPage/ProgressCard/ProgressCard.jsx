import React from 'react'
import style from './ProgressCard.module.scss'
import classNames from 'classnames'
import moment from 'moment'

const ProgressCard = ({ arr }) => {
   const displayed = arr.map((el, index, array) => {
      return (
         <div
         key={el.comment+el.createdAt}
            className={classNames(style.item,index+1===array.length?style.hidebottom:index===0?style.hidetop:'')}
         >
            <div className={style.minibox}>
               {moment(el.createdAt).format('DD.MM.YYYY')}
            </div>
            <div className={style.comment}>
               {el.comment}
            </div>

         </div>
      )
   })
   return (
      <div className={style.wrapper}>
         <div className={style.box} />
         <div className={style.content}>
            <div className={style.heading}>
               Сделка
               <span>
                  {arr[0].nameDeal}
               </span>
            </div>
            {displayed}

         </div>
      </div>
   )
}

export default ProgressCard