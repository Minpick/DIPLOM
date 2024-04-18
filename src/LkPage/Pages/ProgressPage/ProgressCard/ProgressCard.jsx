import React from 'react'
import style from './ProgressCard.module.scss'
import classNames from 'classnames'
import moment from 'moment'
import CustomCard from '../../../UI/CustomCard/CustomCard'

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
      <CustomCard heading={'Сделка'} name={arr[0].nameDeal}>
         {displayed}
      </CustomCard>
   )
}

export default ProgressCard