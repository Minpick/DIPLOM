import React from 'react'
import style from './AuctionPage.module.scss'
import axios from 'axios'
import { BASE_URL } from '../../../LaPage/API/requests'
import { useQuery } from 'react-query'
import AuctionCard from './AuctionCard/AuctionCard'


async function fetchAuctions() {
   const data = await axios.get(`${BASE_URL}/auction/forClient`)
   return data.data
}

const AuctionPage = () => {
   const { data } = useQuery(['auctions'], fetchAuctions)
   console.log(data)
   return (
      <div
         className={style.wrapper}>
         <AuctionCard />
      </div>
   )
}

export default AuctionPage