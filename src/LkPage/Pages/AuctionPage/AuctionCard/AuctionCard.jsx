import React from 'react'
import style from './AuctionCard.module.scss'
import CustomCard from '../../../UI/CustomCard/CustomCard'

const AuctionCard = ({ id, name,selectedLots,setSelectedLots, children }) => {
   return (
      <CustomCard selectedLots={selectedLots} setSelectedLots={setSelectedLots} heading={"Лот"} id={id} name={name} customStyle={{minHeight:'300px'}}>
         {children}
      </CustomCard>
   )
}

export default AuctionCard