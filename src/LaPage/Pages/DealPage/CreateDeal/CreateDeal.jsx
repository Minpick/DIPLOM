import React from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import style from './CreateDeal.module.scss'
import { Form, redirect } from 'react-router-dom'
import { queryClient } from '../../../../App'
import axios from 'axios'
import { BASE_URL } from '../../../API/requests'


export async function action({ request, params }) {
   const formData = await request.formData()
   const name = formData.get("name")
   const id = params.id
   const deal = {
      name: name
   }

   console.log(deal)
   try {
      const data = await axios.post(`${BASE_URL}/deal/new/${id}`, deal)
      return redirect(`/la/clients/${id}/edit`)
   } catch (err) {
      // return <Loading/>
      console.log(err)
      return err
   }
   finally {
      queryClient.invalidateQueries('deals')
   }
}

const CreateDeal = () => {
   return (
      <PopUpAdd>
         <Form
            // onSubmit={(event) => onSubmit(event)}
            method="post"
            className={style.form}
            replace
         >
            <label htmlFor="name" className="add_label">Введите название сделки</label>
            <input
               required
               name="name"
               type="text"
               className={style.input}
            />
            <button
            className={style.btn}
            >Создать сделку</button>
         </Form>
      </PopUpAdd>
   )
}

export default CreateDeal