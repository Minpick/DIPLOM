import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../../API/requests'
import { useParams } from 'react-router'
import { useMutation, useQuery } from 'react-query'
import style from './DealProgress.module.scss'
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
   const comment = formData.get("comment")
   const deal = params.deal
   const progress = {
      createdAt: createdAt,
      comment: comment
   }

   console.log(deal, progress)
   try {
      const data = await axios.post(`${BASE_URL}/deal/progress/new/${deal}`, progress)
      // return redirect(`/la/clients/${id}/edit`)
   } catch (err) {
      // return <Loading/>
      console.log(err)
      return err
   }
   finally {
      queryClient.invalidateQueries('dealProgress')
   }
}

async function fetchDealProgress(deal) {
   const data = await axios.get(`${BASE_URL}/deal/progress/${deal}`)
   return data
}
const DealProgress = () => {
   const { deal } = useParams()
   const [showInput, setShowInput] = useState(false)
   const { data } = useQuery({ queryKey: ['dealProgress'], queryFn: () => fetchDealProgress(deal) })
   console.log(data?.data)
   const deleteDealProgress = useMutation((id) => {
      return axios.delete(`${BASE_URL}/deal/progress/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('dealProgress')
      },
   });
   const displayed = data?.data.map((el) => {
      return (
         <li className={classNames(style.item, 'dealItem')} key={el.id}>
            <div className={style.date}>
               {moment(el.createdAt).format('DD.MM.YYYY')}
            </div>
            <div className={style.comment}>
               {el.comment}
            </div>
            <DeleteButton onClick={() => deleteDealProgress.mutate(el.id)} />
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
                  name='comment'
                  type='text'
                  placeholder='Событие' />

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

export default DealProgress