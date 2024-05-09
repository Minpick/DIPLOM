import style from './DefaultForm.module.scss'
import React from 'react'
import { Form, useLocation } from 'react-router-dom'

const DefaultForm = ({left, right }) => {
   const location = useLocation().pathname
   return (
      <Form
         replace
         className={style.form}
         method='post'
      >
         <div className={style.left}>
            <div className={style.leftInputs}>
               {left}
            </div>
            <button className={style.btn}>
               {location.includes('new') ? 'Добавить' : 'Редактировать'}
            </button>
         </div>
         <div className={style.right}>
            {right}

         </div>
      </Form>
   )
}

export default DefaultForm