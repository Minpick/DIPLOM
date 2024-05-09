import axios from 'axios'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import style from './DealBtns.module.scss'
import classNames from 'classnames'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import { queryClient } from '../../../../App'


async function fetchDeals(id) {
   const data = await axios.get(`${BASE_URL}/deal/${id}`)
   return data
}

const DealBtns = () => {
   const { id, deal } = useParams()
   const navigate = useNavigate()
   const deleteDeal = useMutation((id) => {
      return axios.delete(`${BASE_URL}/deal/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('deals')
         navigate(`/la/clients/${id}/edit`)
      },
   });
   const { data } = useQuery({ queryKey: ['deals'], queryFn: () => fetchDeals(id) })
   const [showList, setShowList] = useState(false)
   const list = data?.data.map((el) => {
      return (

         <Link
            key={el.id}
            className={style.list_item}
            to={`/la/clients/${id}/deal/${el.id}`}
            onClick={() => setShowList(false)}
         >
            {el.name}
         </Link>


      )
   })
   list?.push(<Link
      key={'plus-sign'}
      to={`/la/clients/${id}/deal/new`}
      className={style.plus}>
      <span>&#43;</span>
   </Link>)
   if (deal) {
      var displayed = data?.data.map((el) => {
         if (el.id == deal) {
            return (
               <NavLink
                  key={el.id}
                  className={({ isActive }) =>
                     isActive ? classNames(style.active, style.link) : style.link
                  }
                  to={`/la/clients/${id}/deal/${el.id}`}
               >
                  <DeleteButton onClick={() => deleteDeal.mutate(el.id)} shown={true} toLeft={true}/>
                  {el.name}
               </NavLink>
            )
         }
      })
   }
   return (
      <>
         {data?.data.length !== 0 &&
            <div className={classNames(style.btn, style.wrapper)}>
               {!showList && !deal && <NavLink
                  className={({ isActive }) =>
                     isActive ? classNames(style.active, style.link) : style.link
                  }
                  to={`/la/clients/${id}/deal/${data?.data[0].id}`}
               >
                  {data?.data[0].name}
               </NavLink>}
               {deal && displayed}
               {showList && <div className={style.list}>{list}</div>}
               <div
                  onClick={() => setShowList((prev) => !prev)}
                  className={style.triangle_down}>

               </div>
            </div>
         }
         {data?.data.length === 0 &&
            <Link
               to={`/la/clients/${id}/deal/new`}
               className={style.btn}
            >Создать сделку
            </Link>}
         {/* <div className={classNames('form_btn', style.wrapper)}>
            {!showList && { displayed }}
            {showList && <div className={style.list}>{list}</div>}
            <div
               onClick={() => setShowList((prev) => !prev)}
               className={style.triangle_down}>

            </div>
         </div> */}

      </>
   )
}

export default DealBtns