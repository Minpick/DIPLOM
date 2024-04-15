import React, { useEffect, useState } from 'react'
import style from './BiddingBar.module.scss'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../../API/requests'
import { fetchBiddings } from '../BiddingList/BiddingList'
import { queryClient } from '../../../../App'

export async function fetchBiddingClients() {
   const data = await axios.get(`${BASE_URL}/auction/fullName`)
   return data.data
}
async function fetchMarks(id) {
   if (id) {
      const data = await axios.get(`${BASE_URL}/auction/getCheckMarks/${id}`)
      return data.data
   }
}


const BiddingBar = ({ selectedLots, setSelectedLots, biddingsIds }) => {
   const path = useLocation().pathname.substring(12, 15)
   const shown = ['new', 'edi']
   const { data } = useQuery('biddingClients', fetchBiddingClients)
   const saveToExcel = useMutation((arr) => {
      return axios.put(`${BASE_URL}/auction/exportAuctionsToExcel`, arr);
   }, {
      onSuccess: () => {
         setSelectedLots([])
         setSelectedValue('')
      },
   });
   const [selectedValue, setSelectedValue] = useState('');

   const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
      // queryClient.invalidateQueries('marks')
   };

   const marksData = useQuery(['marks', selectedValue], () => fetchMarks(selectedValue))

   useEffect(() => {
      if (marksData.data?.auctionsId.length) {
         setSelectedLots([...marksData.data.auctionsId])
         console.log(selectedLots)
      }
      else{
         
         setSelectedLots([])
      }
   }, [marksData.data?.auctionsId,selectedValue])

   const addClient = useMutation((arr) => {
      return axios.post(`${BASE_URL}/auction/addClient`, { userId: arr[1], auctionId: arr[0] });
   }, {
      onSuccess: () => {
         setSelectedValue('')
         setSelectedLots([])
      },
   });
   const options = data?.map((client) => {
      return (
         <option
            key={client.id}
            value={client.id}>
            {client.lastName} {client.firstName}
         </option>
      )
   })
   return (
      <div className={style.wrapper}>
         {shown.indexOf(path) >= 0 &&
            <div className={style.overlay}></div>}
         <div className={style.tickBar}>
            <div style={{ cursor: "pointer" }}
               onClick={() => setSelectedLots([...biddingsIds])}
            >Выбрать все</div>
            <div style={{ cursor: "pointer" }}
               onClick={() => setSelectedLots([])}
            >Снять все</div>
         </div>
         <div>
            <select
               value={selectedValue} onChange={handleSelectChange}
               className={style.select}>
               <option
                  value={''}>
                  ---
               </option>
               {options}
            </select>
            <button className={style.btn}
               onClick={() => selectedValue ? addClient.mutate([selectedLots, selectedValue]) : saveToExcel.mutate(selectedLots)}
            >
               {selectedValue ? 'Поделиться с клиентом' : 'Сформировать Excel'}
            </button>
         </div>
      </div>
   )
}

export default BiddingBar