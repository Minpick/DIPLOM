import style from './MyNumberInput.module.scss'
import React, { useState, useEffect } from 'react';

const MyInput = ({ name, text, defaultValue }) => {
   const [value, setValue] = useState(defaultValue || '');
   useEffect(() => {
      setValue(formatNumber(defaultValue) || '');
   }, [defaultValue]);

   function formatNumber(value) {
      const strValue = String(value);
      const numericValue = strValue.replace(/\D+/g, '');
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
   }
   return (
      <>
         <label htmlFor={name} className={style.label}>
            {text}
         </label>
         <input
            name={name}
            value={value}
            onChange={(e)=>setValue(formatNumber(e.target.value))}
            className={style.input}
            type={text}
         />
      </>
   );
};

export default MyInput;
