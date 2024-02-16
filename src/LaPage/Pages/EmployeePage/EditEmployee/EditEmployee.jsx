import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { redirect, useParams } from 'react-router'
import { BASE_URL, fetchEmployee } from '../../../API/requests'
import axios from 'axios'
import { queryClient } from '../../../../App'
import ClientsForm from '../../ClientsPage/ClientsForm/ClientsForm'
import Loading from '../../../UI/Loading/Loading'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'

export async function action({request,params}) {
   const searchParams = new URL(request.url)
      .searchParams.toString()
  
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
      const data = await axios.patch(`${BASE_URL}/employee/info/${params.id}`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      return err
   }
   finally {
      queryClient.invalidateQueries('employees')
   }
}

const EditEmployee = () => {

   const { id } = useParams()
   const { data, isLoading } = useQuery({ queryKey: ['employee'], queryFn: () => fetchEmployee(id) })
   // const editEmployee = useMutation((user) => {
   //    return axios.patch(`${BASE_URL}/employee/info/${id}`, user);
   // }, {
   //    onSuccess: () => {
   //       queryClient.invalidateQueries('employees')
   //    },
   // });
   if (isLoading) {
      return (
         <Loading />
      )
   }
   return (
      <PopUpAdd>
         <div className='form_wrapper'>
            <ClientsForm data={data} isLoading={isLoading} />
         </div>
      </PopUpAdd>
   )

}

export default EditEmployee