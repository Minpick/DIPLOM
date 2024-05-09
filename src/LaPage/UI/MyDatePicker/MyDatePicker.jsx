import React, { useEffect, useRef } from 'react'
import './MyDatePicker.scss'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import "dayjs/locale/ru"
import { DatePicker } from 'antd'

dayjs.extend(utc)

const MyDatePicker = ({ name, text, defaultValue, format }) => {
   return (
      <LocalizationProvider key={defaultValue} dateAdapter={AdapterDayjs}
         adapterLocale='ru'
      >
         <label
            htmlFor={name}
            style={{ textAlign: 'start', color: '#5a5a5a', fontWeight: '600', marginLeft: '1px' }}>
            {text}
         </label>
         <DateTimePicker
            className='MyDateTimePicker'
            sx={{
               '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                     borderColor: '#5a5a5a',
                  },
               },
            }}
            viewRenderers={format === 'DD.MM.YYYY' && {
               hours: null,
               minutes: null,
               seconds: null,
            }}
            name={name}
            defaultValue={dayjs(defaultValue).utc() || ''}
            inputFormat={format}
            format={format}
            ampm={false}
         />
      </LocalizationProvider>
   )
}

export default MyDatePicker