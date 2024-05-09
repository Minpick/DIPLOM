import React, { useEffect, useState } from 'react'
import style from './MyTextarea.module.scss'

const MyTextarea = ({ name, defaultValue,placeholder }) => {
   const [value, setValue] = useState(defaultValue || '');
   useEffect(() => {
      setValue(defaultValue || '');
   }, [defaultValue]);
   return (
      <textarea
      className={style.textarea}
      placeholder={placeholder}
         name={name}
         value={value}
         onChange={(e) => setValue(e.target.value)}

      />
   )
}

export default MyTextarea