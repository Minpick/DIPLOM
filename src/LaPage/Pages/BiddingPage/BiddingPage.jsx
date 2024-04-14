import React, { useState } from 'react'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import BiddingBar from './BiddingBar/BiddingBar'
import BiddingList, { fetchBiddings } from './BiddingList/BiddingList'
import { useQuery } from 'react-query'

const BiddingPage = () => {
   const [selectedLots, setSelectedLots] = useState([]);
   const { data, isLoading } = useQuery({ queryKey: ['biddings'], queryFn: () => fetchBiddings() })
   const toggleLotSelection = (lotId) => {
      if (selectedLots.includes(lotId)) {
         setSelectedLots(selectedLots.filter(id => id !== lotId));
      } else {
         setSelectedLots([...selectedLots, lotId]);
      }
   };
   const biddingsIds = data?.data.map(el => el.id)
   return (
      <>
         <BiddingBar selectedLots={selectedLots} setSelectedLots={setSelectedLots} biddingsIds={biddingsIds}/>
         <DefaultPage li={['Лот', "Начальная цена", "Крайний срок"]}>
            <BiddingList func={toggleLotSelection}  selectedLots={selectedLots} data={data} isLoading={isLoading}/>
         </DefaultPage>
      </>
   )
}

export default BiddingPage