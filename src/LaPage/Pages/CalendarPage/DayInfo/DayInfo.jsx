import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../../API/requests'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Form, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import style from './DayInfo.module.scss'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import { queryClient } from '../../../../App'
import classNames from 'classnames'
import moment from 'moment'


export async function action({ request}) {
  const formData = await request.formData()
  const year = new URL(request.url).searchParams.get("year")
  const month = new URL(request.url).searchParams.get("month")
  const day = new URL(request.url).searchParams.get("day")
  const createdAt = moment(`${year}-${month.padStart(2,0)}-${day.padStart(2,0)}`).format('YYYY-MM-DD')
  const nameEvent = formData.get("nameEvent")
  const comment = formData.get("comment")
  const statusEvent = formData.get("statusEvent")
  const dayInfo = {
    createdAt: createdAt,
    nameEvent: nameEvent,
    comment: comment,
    statusEvent: statusEvent
  }
  console.log(dayInfo)
  try {
    const data = await axios.post(`${BASE_URL}/calendar/create`, dayInfo)
  } catch (err) {
    return err
  }
  finally {
    queryClient.invalidateQueries('days')
  }
}


async function fetchDayInfo(year, month, day) {
  const data = await axios.get(`${BASE_URL}/calendar/${year}/${month}/${day}`)
  return data.data
}



const DayInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const statusObj = {
    'COURT': "Судебное заседание",
    'CONSULT': 'Консультация',
    'ETC': "Другое"
  }
  const year = searchParams.get('year')
  const month = searchParams.get('month')
  const day = searchParams.get('day')
  const [showInput, setShowInput] = useState(false)
  const { data } = useQuery({ queryKey: ['days', year, month, day], queryFn: () => fetchDayInfo(year, month, day) })
  const deleteEvent = useMutation((id) => {
    return axios.delete(`${BASE_URL}/calendar/${id}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('days')
    },
  });
  const li = data?.map((el) => {
    return (
      <li className={classNames(style.item, 'dealItem')} key={el.id}>
        <div className={style.event}>
          {el.nameEvent}
        </div>
        <div className={style.comment}>
          {el.comment}
        </div>
        <div className={style.status}>
          {statusObj[el.statusEvent]}
        </div>
        <DeleteButton onClick={() => deleteEvent.mutate(el.id)} />
      </li>
    )
  })
  return (
    <PopUpAdd>
      <div className={style.wrapper}>
       
        <div>
          <ul className={style.ul}>
            <li className={style.li}>
              Событие
            </li>
            <li className={style.li}>
              Комментарий
            </li>
            <li className={style.li}>
              Тип
            </li>
          </ul>
          <ul>
            {li}
            {!showInput && <div className={style.plus}
              onClick={() => setShowInput(true)}>
              <span>&#43;</span>
            </div>}
            {showInput && <Form method="post" replace onSubmit={() => setShowInput(false)} className={style.form}>
  
              <input
                className={style.input}
                name='nameEvent'
                type='text'
                placeholder='Событие' />
              <input
                className={style.input}
                name='comment'
                type='text'
                placeholder='Комментарий' />
              <select name='statusEvent' className={style.select}>
                <option
                  value='COURT'>
                  Судебное заседание
                </option>
                <option
                  value='CONSULT'>
                  Консультация
                </option>
                <option
                  value='ETC'>
                  Другое
                </option>
              </select>
  
              <button
                className={style.btn}
                type='submit'
              // onClick={() => setShowInput(false)}
              >
                &#10003;
              </button>
              <DeleteButton onClick={() => setShowInput(false)} shown={true} />
            </Form>
            }
          </ul>
        </div>
        <div className={style.data}>
          {`${day.padStart(2,0)}.${month.padStart(2,0)}.${year}`}
        </div>
      </div>

    </PopUpAdd>
  )
}

export default DayInfo