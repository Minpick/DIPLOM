import React, { useEffect, useRef } from 'react'
import style from './CustomInput.module.scss'

const CustomInput = ({ name, text, defaultValue,disabled }) => {
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
         disabled={disabled}
            name={name}
            ref={ref}
            type='text'
            className={style.input}
         />
      </>
   )
}

export default CustomInput