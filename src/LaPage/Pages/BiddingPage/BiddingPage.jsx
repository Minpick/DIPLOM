import React from 'react'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import BiddingBar from './BiddingBar/BiddingBar'

const BiddingPage = () => {
  return (
   <>
   <BiddingBar/>
    <DefaultPage li={['Лот',"Начальная цена","Крайний срок"]}>
      BiddingPage
    </DefaultPage>
   </>
  )
}

export default BiddingPage