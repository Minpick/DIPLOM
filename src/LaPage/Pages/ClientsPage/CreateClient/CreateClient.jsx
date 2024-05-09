import React from 'react'
import { redirect, useActionData, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import { useMutation } from 'react-query'
import axios from 'axios'

import './CreateClient.scss'
import ClientsForm from '../ClientsForm/ClientsForm'
import { queryClient } from '../../../../App'
import Loading from '../../../UI/Loading/Loading'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import moment from 'moment'


export async function action({ request }) {
   // console.log(params)
   // return redirect(`..`)
   const searchParams = new URL(request.url)
   .searchParams.toString()
   console.log(searchParams)
   // return redirect(`..?${searchParams}`)
   const formData = await request.formData()
   const email = formData.get("email")
   const phone = formData.get("phone")
   const firstName = formData.get("firstName")
   const lastName = formData.get("lastName")
   const status = formData.get("status")
   const login = formData.get("login")
   const password = formData.get("password")
   const birth = moment.utc(formData.get("birth"), 'DD.MM.YYYY').format('YYYY-MM-DD')
   const comment = formData.get("comment")
   const passport = formData.get("passport")
   const patronymic = formData.get("patronymic")
   const passportIssued = formData.get("passportIssued")
   const dateIssuePassport = moment.utc(formData.get("dateIssuePassport"), 'DD.MM.YYYY').format('YYYY-MM-DD')
   const kp = formData.get("kp")
   const registrationAddress = formData.get("registrationAddress")
   const snils = formData.get("snils")
   const placeOfBirth = formData.get("placeOfBirth")
   
   const user = {
      firstName: firstName,
      lastName: lastName,
      email:email,
      phone:phone,
      status: status,
      patronymic: patronymic,
      login: login,
      password: password,
      birth: birth,
      comment: comment,
      passport: passport,
      passportIssued: passportIssued,
      dateIssuePassport: dateIssuePassport,
      kp: kp,
      registrationAddress: registrationAddress,
      snils: snils,
      placeOfBirth: placeOfBirth

   }
   
   console.log(user)
   try {
      const data = await axios.post(`${BASE_URL}/employee/clients/new`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      // return <Loading/>
      console.log(err.response.data.phone)
      return err
   }
   finally{
      queryClient.invalidateQueries('clients')
   }
}

const CreateClient = () => {
   const action = useActionData()

   // console.log(action)
   // const createClient = useMutation((user) => {
   //    return axios.post(`${BASE_URL}/employee/clients/new`, user);
   // }, {
   //    onSuccess: () => {
   //       queryClient.invalidateQueries('clients')
   //    },
   // });
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
               action = {action}
            />
      </PopUpAdd>
   )
}


export default CreateClient