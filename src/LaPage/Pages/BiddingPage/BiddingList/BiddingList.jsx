import React, { useState } from 'react'
import { BASE_URL } from '../../../API/requests'
import Loading from '../../../UI/Loading/Loading'
import { queryClient } from '../../../../App'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import classNames from 'classnames'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import { Link, useSearchParams } from 'react-router-dom'
import style from './BiddingList.module.scss'
import moment from 'moment'

export async function fetchBiddings() {
   const data = await axios.get(`${BASE_URL}/auction`)
   return data
}


const BiddingList = ({ func, selectedLots,data,isLoading }) => {
   const [searchParams, setSearchParams] = useSearchParams()
  
   const deleteBidding = useMutation((id) => {
      return axios.delete(`${BASE_URL}/auction/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('biddings')
      },
   });

   if (isLoading) {
      return (
         <Loading />
      )
   }
   const biddings = data?.data?.map(bidding => {
      return (
         <li key={bidding.id}
            className={classNames('clients__item')}>

            <div className={style.checkboxWrapper}>
               <input
                  type="checkbox"
                  id='myCheckBox'
                  className={style.tick}
                  checked={selectedLots.includes(bidding.id)}
                  onChange={() => func(bidding.id)}
               />
               <label 
               onClick={() => func(bidding.id)}
               htmlFor="myCheckbox" className={style.customCheckbox}><span>&#10003;</span></label>
            </div>
            <Link to={`edit/${bidding.id}?${searchParams.toString()}`}
               className={classNames(style.clients__item, 'clients__item')}>
               <div className={style.clients__field}>
                  {bidding.name}
               </div>
               <div href="#" className={style.clients__field}>
                  {bidding.price}
               </div>
               <div className={style.clients__field}>
                  {moment(bidding.expiryDate).format('DD.MM.YYYY hh:mm')}
               </div>
            </Link>
            <DeleteButton onClick={() => deleteBidding.mutate(bidding.id)} />
         </li>
      )
   })
   return (
      <div className={style.list}>
         {biddings}
      </div>
   )
}

export default BiddingList