import React from 'react'
import PopUpAdd from '../../UI/PopUpAdd/PopUpAdd'
import style from './DealPage.module.scss'
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import DealBtns from './DealBtns/DealBtns'
import { fetchClient } from '../../API/requests'
import DealLinks from './DealLinks/DealLinks'

const DealPage = () => {
   const { id } = useParams()
   const [searchParams, setSearchParams] = useSearchParams()
   const { data, isLoading } = useQuery({ queryKey: ['client'], queryFn: () => fetchClient(id) })
   return (
      <PopUpAdd>
         <div className={style.wrapper}>
            <div className={style.btnsWrapper}>
               <Link
                  to={`/la/clients/${id}/edit?${searchParams.toString()}`}
                  className={style.btn}>
                  {data ? data?.data.lastName + ' ' + data?.data.firstName : 'Клиент'}
               </Link>
               <DealBtns />
            </div>
            <DealLinks />
            <div className={style.dealPage}>
               <Outlet />
            </div>
         </div>
      </PopUpAdd>
   )
}

export default DealPage