import React, { useEffect, useRef, useState } from 'react'
import './MySelect.scss'
import { InputLabel, MenuItem, Select } from '@mui/material'

const MySelect = ({ name, text, defaultValue, options }) => {
   const [value, setValue] = useState('');
   useEffect(() => {
      setValue(defaultValue || '');
   }, [defaultValue]);
   const myOptions = options?.map((el) => {
      return (
         <MenuItem
            key={Object.keys(el)[0]}
            value={Object.keys(el)[0]}>
            {el[Object.keys(el)[0]]}
         </MenuItem>
      )
   })
   return (
      <>
         {text && <InputLabel id={name}>{text}</InputLabel>}
         <Select
            labelId={name}
            value={value}
            name={name}
            defaultValue={defaultValue}
            onChange={(e) => setValue(e.target.value)}
         >
            {myOptions}
         </Select>
      </>
   )
}

export default MySelect