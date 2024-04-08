import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../../API/requests'
import { useParams } from 'react-router'
import { useMutation, useQuery } from 'react-query'
import style from './DealMail.module.scss'
import moment from 'moment'
import { Form } from 'react-router-dom'
import {  DatePicker, Space } from 'antd'
import { queryClient } from '../../../../App'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import classNames from 'classnames'
import { locale } from '../../../API/locale'

export async function action({ request, params }) {
   const formData = await request.formData()
   const dateComponents = formData.get("date").split(/[./-]/)
   const createdAt = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}` + "T00:00:00Z"
   const name = formData.get("name")
   const rpo = formData.get("rpo")
   const destination = formData.get("destination")
   const sum = formData.get("sum")
   const deal = params.deal
   const mail = {
      createdAt: createdAt,
      name: name,
      rpo: rpo,
      destination: destination,
      sum: sum
   }

   console.log(deal, mail)
   try {
      const data = await axios.post(`${BASE_URL}/deal/mail/new/${deal}`, mail)
      // return redirect(`/la/clients/${id}/edit`)
   } catch (err) {
      // return <Loading/>
      console.log(err)
      return err
   }
   finally {
      queryClient.invalidateQueries('dealMail')
   }
}

async function fetchDealMail(deal) {
   const data = await axios.get(`${BASE_URL}/deal/mail/${deal}`)
   return data
}
const DealMail = () => {
   const { deal } = useParams()
   const [showInput, setShowInput] = useState(false)
   const { data } = useQuery({ queryKey: ['dealMail'], queryFn: () => fetchDealMail(deal) })
   console.log(data?.data)
   const deleteDealMail = useMutation((id) => {
      return axios.delete(`${BASE_URL}/deal/mail/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('dealMail')
      },
   });
   const displayed = data?.data.map((el) => {
      return (
         <li className={classNames(style.item, 'dealItem')} key={el.id}>
            <div className={style.date}>
               {moment(el.createdAt).format('DD.MM.YYYY')}
            </div>
            <div className={style.comment}>
               {el.name}
            </div>
            <div className={style.comment}>
               {el.rpo}
            </div>
            <div className={style.comment}>
               {el.destination}
            </div>
            <div className={style.comment}>
               {el.sum}
            </div>
            <DeleteButton onClick={() => deleteDealMail.mutate(el.id)} />
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
            Название
          </li>
          <li className={style.li}>
            РПО
          </li>
          <li className={style.li}>
            Адрес
          </li>
          <li className={style.li}>
            Сумма
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
                  name='name'
                  type='text'
                  placeholder='Название' />
               <input
                  className={style.input}
                  name='rpo'
                  type='text'
                  placeholder='РПО' />
               <input
                  className={style.input}
                  name='destination'
                  type='text'
                  placeholder='Адрес' />
               <input
                  className={style.input}
                  name='sum'
                  type='text'
                  placeholder='Сумма' />

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

export default DealMail