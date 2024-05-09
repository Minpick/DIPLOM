import style from './MyInput.module.scss'
import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

const MyInput = ({ name, text, type, defaultValue, mask, maskChar, required }) => {
   const [value, setValue] = useState(defaultValue || '');
   useEffect(() => {
      setValue(defaultValue || '');
   }, [defaultValue]);

   return (
      <>
         <label htmlFor={name} className={style.label}>
            {text}
         </label>
         <InputMask
            required={required}
            mask={mask || ''}
            maskChar={maskChar || '_'}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={style.input}
            type={type || ''}
         >
         </InputMask>
      </>
   );
};

export default MyInput;
