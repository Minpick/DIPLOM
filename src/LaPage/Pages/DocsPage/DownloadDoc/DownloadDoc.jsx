import React, { useState } from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { fetchBiddingClients } from '../../BiddingPage/BiddingBar/BiddingBar'
import { useQuery } from 'react-query'
import style from './DownloadDoc.module.scss'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../../API/requests'

async function download(id, name) {
   const response = await axios.get(`${BASE_URL}/documentGeneration/${id}`, {
      responseType: 'blob'
   })
   const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', `${name}.docx`);
   document.body.appendChild(link);
   link.click();

}


const DownloadDoc = () => {
   const { data } = useQuery('biddingClients', fetchBiddingClients)
   const [selectedValue, setSelectedValue] = useState('');
   const [searchParams, setSearchParams] = useSearchParams()
   const doc = searchParams.get('doc')
   console.log(doc)
   const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
   };
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
      <PopUpAdd>
         <div className={style.wrapper}>
            <select
               value={selectedValue} onChange={handleSelectChange}
               className={style.select}>
               <option
                  value={''}>
                  ---
               </option>
               {options}
            </select>
            <button
               onClick={() => download(selectedValue, doc)}
            >
               Сформировать документ
            </button>
         </div>
      </PopUpAdd>
   )
}

export default DownloadDoc