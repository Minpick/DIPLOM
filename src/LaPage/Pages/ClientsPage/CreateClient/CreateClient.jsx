import React from 'react'
import { redirect, useActionData, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import { useMutation } from 'react-query'
import axios from 'axios'

import './CreateClient.scss'
import ClientsForm from '../ClientsForm/ClientsForm'
import { queryClient } from '../../../../App'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'

export async function makeObject(request, fieldsArr) {
   const formData = await request.formData()
   const dataObject = fieldsArr.reduce((obj, field) => ({
      ...obj,
      [field]: formData.get(field),
   }), {});
   return dataObject
}
export const clientFields = [
   'email',
   'phone',
   'firstName',
   'lastName',
   'status',
   'login',
   'passwordForService',
   'birth',
   'comment',
   'passport',
   'patronymic',
   'passportIssued',
   'dateIssuePassport',
   'kp',
   'registrationAddress',
   'snils',
   'placeOfBirth'
]

export async function action({ request }) {
   const searchParams = new URL(request.url).searchParams.toString()
   const obj = await makeObject(request, fields)
   try {
      await axios.post(`${BASE_URL}/employee/clients/new`, obj)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      return err
   } finally {
      queryClient.invalidateQueries('clients')
   }

}

const CreateClient = () => {
   const action = useActionData()
   const statuses = [{
      'IN_PROGRESS': 'В работе'
   }, {
      'PLANNED': 'Планируемые'
   }, {
      'COMPLETED': 'Завершенные'
   }]

   return (
      <PopUpAdd>
         <ClientsForm
            statuses={statuses}
            action={action}
         />
      </PopUpAdd>
   )
}


export default CreateClient