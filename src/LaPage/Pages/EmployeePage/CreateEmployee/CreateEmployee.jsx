import React from 'react'
import { useMutation } from 'react-query';
import { queryClient } from '../../../../App';
import axios from 'axios';
import ClientsForm from '../../ClientsPage/ClientsForm/ClientsForm';
import { redirect } from 'react-router';
import { BASE_URL } from '../../../API/requests';
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd';
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
   const birth = formData.get("birth")
   const passport = formData.get("passport")
   const patronymic = formData.get("patronymic")
   const role = formData.get("role")

   const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      patronymic: patronymic,
      birth: birth,
      passport: passport,
      role: role,
      status: "IN_PROGRESS"
   }

   console.log(user)
   try {
      const data = await axios.post(`${BASE_URL}/employee/info/new`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      // return <Loading/>
      return err
      console.log(err.response.data.phone)
   }
   finally {
      queryClient.invalidateQueries('employees')
   }
}
const CreateEmployee = () => {
   const createEmployee = useMutation((user) => {
      return axios.post(`${BASE_URL}/employee/info/new`, user);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('employees')
      },
   });


   return (
      <PopUpAdd>
         <div className='form_wrapper'>
            <ClientsForm func={createEmployee} role={'ROLE_EMPLOYEE'} />
            </div>
      </PopUpAdd>
   )
}

export default CreateEmployee


