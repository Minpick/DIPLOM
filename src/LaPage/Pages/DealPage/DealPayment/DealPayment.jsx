import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../../API/requests'
import { useParams } from 'react-router'
import { useMutation, useQuery } from 'react-query'
import style from './DealPayment.module.scss'
import moment from 'moment'
import { Form } from 'react-router-dom'
import { DatePicker, Space } from 'antd'
import { queryClient } from '../../../../App'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import classNames from 'classnames'
import { locale } from '../../../API/locale'

export async function action({ request, params }) {
  const formData = await request.formData()
  const dateComponents = formData.get("date").split(/[./-]/)
  const createdAt = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}` + "T00:00:00Z"
  const sum = formData.get("sum")
  const bank = formData.get("bank")
  const status = formData.get("status")
  const deal = params.deal
  const payment = {
    createdAt: createdAt,
    sum: sum,
    bank: bank,
    status: status
  }

  console.log(deal, payment)
  try {
    const data = await axios.post(`${BASE_URL}/deal/payment/new/${deal}`, payment)
    // return redirect(`/la/clients/${id}/edit`)
  } catch (err) {
    // return <Loading/>
    console.log(err)
    return err
  }
  finally {
    queryClient.invalidateQueries('dealPayment')
  }
}

async function fetchDealPayment(deal) {
  const data = await axios.get(`${BASE_URL}/deal/payment/${deal}`)
  return data
}
const DealPayment = () => {
  const { deal } = useParams()
  const [showInput, setShowInput] = useState(false)
  const { data } = useQuery({ queryKey: ['dealPayment'], queryFn: () => fetchDealPayment(deal) })
  console.log(data?.data)
  const deleteDealPayment = useMutation((id) => {
    return axios.delete(`${BASE_URL}/deal/payment/${id}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('dealPayment')
    },
  });
  const displayed = data?.data.map((el) => {
    return (
      <li className={classNames(style.item, 'dealItem')} key={el.id}>
        <div className={style.date}>
          {moment(el.createdAt).format('DD.MM.YYYY')}
        </div>
        <div className={style.comment}>
          {el.sum}
        </div>
        <div className={style.comment}>
          {el.status === 'CARD' ? 'Картой' : el.status === 'CASH' ? 'Наличными' : ''}
        </div>
        <div className={style.comment}>
          {el.bank}
        </div>
        <DeleteButton onClick={() => deleteDealPayment.mutate(el.id)} />
      </li>
    )
  })
  return (
    <div className={style.wrapper}>
      <ul className={style.ul}>
        <li className={style.li}>
          Дата
        </li>
        <li className={style.li}>
          Сумма
        </li>
        <li className={style.li}>
          Статус
        </li>
        <li className={style.li}>
          Банк
        </li>
      </ul>
      <ul>{displayed}
        {!showInput && <div className={style.plus}
          onClick={() => setShowInput(true)}>
          <span>&#43;</span>
        </div>}
        {showInput && <Form method="post" replace onSubmit={() => setShowInput(false)} className={style.form}>

          <Space direction='vertical'>

            <DatePicker
              name='date'
              format={{
                format: 'DD.MM.YYYY'
              }}
              locale={locale}
              className={style.datePicker}
              size='large'
            />



          </Space>
          <input
            className={style.input}
            name='sum'
            type='text'
            placeholder='Сумма' />
          <select name='status' className={style.select}>
            <option
              value='CARD'>
              Картой
            </option>
            <option
              value='CASH'>
              Наличными
            </option>
          </select>
          <select name='bank' className={style.select}>
            <option
              value='Альфа Банк'>
              Альфа Банк
            </option>
            <option
              value='Сбербанк'>
              Сбербанк
            </option>
            <option
              value='Точка Банк'>
              Точка Банк
            </option>
            <option
              value='ВТБ'>
              ВТБ
            </option>
            <option
              value='Тинькофф'>
              Тинькофф
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
  )
}

export default DealPayment