import React, { useEffect, useRef } from 'react'
import style from './MyInput.module.scss'

const MyInput = ({ name, text,type, defaultValue }) => {
   const ref = useRef()
   useEffect(() => {
      if (defaultValue) {
         ref.current.defaultValue = defaultValue
      }
   }, [defaultValue])
   return (
      <>
         <label
            htmlFor={name}
            className={style.label}>
            {text}
         </label>
         <input
            name={name}
            ref={ref}
            type={type||'text'}
            className={style.input}
         />
      </>
   )
}

export default MyInput