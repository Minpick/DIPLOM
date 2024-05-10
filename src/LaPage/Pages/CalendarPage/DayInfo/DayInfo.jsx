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
import { TimePicker } from 'antd'
import { fetchBiddingClients } from '../../BiddingPage/BiddingBar/BiddingBar'


export async function action({ request }) {
  const formData = await request.formData()
  const year = new URL(request.url).searchParams.get("year")
  const month = new URL(request.url).searchParams.get("month")
  const day = new URL(request.url).searchParams.get("day")
  const time = formData.get("time")
  // console.log(time)
  const createdAt = moment(`${year}-${month.padStart(2, 0)}-${day.padStart(2, 0)}`).format('YYYY-MM-DD') + 'T' + time + '.996Z'
  const nameEvent = formData.get("nameEvent")
  const comment = formData.get("comment")
  const statusEvent = formData.get("statusEvent")
  const userId = formData.get("userId")
  const dayInfo = {
    time: createdAt,
    name: nameEvent,
    comment: comment,
    statusEvent: statusEvent,
    userId:userId
  }
  console.log(dayInfo)
  try {
    const data = await axios.post(`${BASE_URL}/calendar/event`, dayInfo)
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
  const clientsData = useQuery('biddingClients', fetchBiddingClients)
  const { data } = useQuery({ queryKey: ['days', year, month, day], queryFn: () => fetchDayInfo(year, month, day) })
  const deleteEvent = useMutation((id) => {
    return axios.delete(`${BASE_URL}/calendar/${id}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('days')
    },
  });
  const options = clientsData?.data?.map((client) => {
    return (
      <option
        key={client.id}
        value={client.id}>
        {client.lastName} {client.firstName}
      </option>
    )
  })
  console.log(clientsData?.data,data)
  const li = data?.map((el) => {
    return (
      <li className={classNames(style.item, 'dealItem')} key={el.id}>
        <div className={style.event}>
          {el.name}
        </div>
        <div className={style.comment}>
          {el.time.substring(11, 19)}
        </div>
        <div className={style.comment}>
          {el.comment}
        </div>
        <div className={style.comment}>
          {clientsData?.data?.filter(elem=>elem.id === el.userId)[0]?.firstName}
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
              Время
            </li>
            <li className={style.li}>
              Комментарий
            </li>
            <li className={style.li}>
              Клиент
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
              <TimePicker className={style.datePicker} name='time' />
              <input
                className={style.input}
                name='comment'
                type='text'
                placeholder='Комментарий' />
              <select name='userId' className={style.select}>
                <option
                  value={''}>
                  ---
                </option>
                {options}
              </select>
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
          {`${day.padStart(2, 0)}.${month.padStart(2, 0)}.${year}`}
        </div>
      </div>

    </PopUpAdd>
  )
}

export default DayInfo