import React, { useEffect, useRef } from 'react'
import { Form, redirect, useParams } from 'react-router-dom'
import style from './EditBidding.module.scss'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import BiddingForm from '../BiddingForm/BiddingForm'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../../API/requests'
import { queryClient } from '../../../../App'

async function fetchBidding(id) {
   const data = await axios.get(`${BASE_URL}/auction/${id}`)
   return data
}

export async function action({ request,params }) {
   const searchParams = new URL(request.url)
      .searchParams.toString()
   const formData = await request.formData()
   const number = formData.get("number")
   const initialPrice = formData.get("initialPrice")
   const deposit = formData.get("deposit")
   const name = formData.get("name")
   const marketValue = formData.get("marketValue")
   // const expiryDate = moment(formData.get("expiryDate").replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')).toISOString()

   const expiryDate = formData.get("expiryDate") + "T07:26:07.507Z"
   const auctionDate = formData.get("auctionDate") + "T07:26:07.507Z"
   // console.log(auctionDate)
   const auctionForm = formData.get("auctionForm")
   const auctionType = formData.get("auctionType")
   const limitations = formData.get("limitations")
   const limitationDate = formData.get("limitationDate")+ "T07:26:07.507Z"
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
      auctionType: auctionType,
      limitations: limitations,
      limitationDate: limitationDate,
      link: link,
      areaName: areaName
   }

   try {
      const data = await axios.patch(`${BASE_URL}/auction/${params.id}`, bidding)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      console.log(err)
      return err
   }
   finally {
      queryClient.invalidateQueries('biddings')
   }
}

const EditBidding = () => {
   const { id } = useParams()
   const { data } = useQuery({ queryKey: ['bidding'], queryFn: () => fetchBidding(id) })
   return (
      <PopUpAdd>
         <BiddingForm data={data} />
      </PopUpAdd>
   )
}

export default EditBidding