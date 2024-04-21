import React, { useEffect, useRef } from 'react'
import style from './MySelect.module.scss'

const MySelect = ({ name,text,defaultValue, children }) => {
   const ref = useRef()
   useEffect(() => {
      if (defaultValue) {
         ref.current.value = defaultValue
      }
   }, [defaultValue])
   return (
     <>
         {text&&<label
               htmlFor={name}
               className={style.label}>
               {text}
            </label>}
         <select
         name={name}
         ref={ref}
         className={style.select}
         >
            {children}
         </select>
     </>
   )
}

export default MySelect