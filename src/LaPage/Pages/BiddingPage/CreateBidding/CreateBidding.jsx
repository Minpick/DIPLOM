import React from 'react'
import { redirect} from 'react-router-dom'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import BiddingForm from '../BiddingForm/BiddingForm'
import  axios  from 'axios'
import { BASE_URL } from '../../../API/requests'
import { queryClient } from '../../../../App'
import moment from 'moment'


export async function action({request}){
   const searchParams = new URL(request.url)
      .searchParams.toString()
   const formData = await request.formData()
   const number = formData.get("number")
   const initialPrice = formData.get("initialPrice")
   const deposit = formData.get("deposit")
   const name = formData.get("name")
   const marketValue = formData.get("marketValue")
   const expiryDate = moment(formData.get("expiryDate").replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')).toISOString()
   console.log(formData.get("expiryDate"),expiryDate)
   const auctionDate = formData.get("auctionDate")+"T07:26:07.507Z"
   const auctionForm = formData.get("auctionForm")
   const auctionType = formData.get("auctionType")
   const limitations = formData.get("limitations")
   const limitationDate = formData.get("limitationDate")
   const link = formData.get("link")
   const areaName = formData.get("areaName")

   const bidding = {
      number: number,
      initialPrice: initialPrice,
      deposit: deposit,
      name: name,
      marketValue: marketValue,
      expiryDate: expiryDate,
      auctionDate: auctionDate,
      auctionForm: auctionForm,
      auctionType:auctionType,
      limitations:limitations,
      limitationDate:limitationDate,
      link:link,
      areaName:areaName
   }

   console.log(bidding)
   try {
      const data = await axios.post(`${BASE_URL}/auction/create`, bidding)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      console.log(err)
      return err
   }
   finally {
      queryClient.invalidateQueries('biddings')
   }
}

const CreateBidding = () => {
  return (
    <PopUpAdd>
      <BiddingForm/>
    </PopUpAdd>
  )
}

export default CreateBidding