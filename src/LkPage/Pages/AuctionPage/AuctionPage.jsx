import React, { useState } from 'react'
import style from './AuctionPage.module.scss'
import axios from 'axios'
import { BASE_URL } from '../../../LaPage/API/requests'
import { useQuery } from 'react-query'
import AuctionCard from './AuctionCard/AuctionCard'
import CustomCard from '../../UI/CustomCard/CustomCard'
import moment from 'moment'

async function download(arr) {
   const response = await axios.put(`${BASE_URL}/auction/exportAuctionsToExcel`, arr, {
      responseType: 'blob'
   });
   const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', `Excel.xlsx`);
   document.body.appendChild(link);
   link.click();
}



async function fetchAuctions() {
   const data = await axios.get(`${BASE_URL}/auction/forClient`)
   return data.data
}

const AuctionPage = () => {
   const { data } = useQuery(['auctions'], fetchAuctions)
   console.log(data)
   const [selectedLots, setSelectedLots] = useState([])
   const displayed = data?.map((el) => {
      return (
         <AuctionCard selectedLots={selectedLots} setSelectedLots={setSelectedLots} key={el.id} id={el.id} name={el.name}>
            <div className={style.field}>
               Дата подачи заявки
               <span>{moment(el.expiryDate).format('DD.MM.YYYY')}</span>
            </div>
            <div className={style.field}>
               Начальная цена
               <span>{el.price}</span>
            </div>
            <div className={style.field}>
               Номер лота
               <span>{el.number}</span>
            </div>
         </AuctionCard>
      )
   })
   return (
      <div
         className={style.wrapper}>
         <button className={style.button} onClick={()=>download(selectedLots)}>
            Выгрузить в Excel
         </button>
         <div className={style.grid}>{displayed}</div>
      </div>
   )
}

export default AuctionPage