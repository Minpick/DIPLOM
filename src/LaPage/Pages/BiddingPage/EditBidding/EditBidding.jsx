import React, { useEffect, useRef, useState } from 'react'
import { Form, redirect, useParams } from 'react-router-dom'
import style from './EditBidding.module.scss'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import BiddingForm from '../BiddingForm/BiddingForm'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BASE_URL } from '../../../API/requests'
import { queryClient } from '../../../../App'
import Loading from '../../../UI/Loading/Loading'
import moment from 'moment'

async function fetchBidding(id) {
   const data = await axios.get(`${BASE_URL}/auction/${id}`)
   return data
}

export async function action({ request, params }) {
   const searchParams = new URL(request.url)
      .searchParams.toString()
   const formData = await request.formData()
   const number = formData.get("number")
   const initialPrice = formData.get("initialPrice").replace(/\s+/g, '')
   const deposit = formData.get("deposit").replace(/\s+/g, '')
   const name = formData.get("name")
   const marketValue = formData.get("marketValue").replace(/\s+/g, '')
   // const expiryDate = moment(formData.get("expiryDate").replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1')).toISOString()
   console.log(formData.get("expiryDate"))
   const expiryDate = moment.utc(formData.get("expiryDate"), 'DD.MM.YYYY HH:mm').toISOString()
   console.log(expiryDate)
   const auctionDate = moment.utc(formData.get("auctionDate"), 'DD.MM.YYYY HH:mm').toISOString()
   // console.log(auctionDate)
   const auctionForm = formData.get("auctionForm")
   const auctionType = formData.get("auctionType")
   const limitations = formData.get("limitations")
   const limitationDate = moment.utc(formData.get("limitationDate"), 'DD.MM.YYYY').toISOString()
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
   console.log(bidding)
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
   const [key, setKey] = useState(['bidding']);
   const { data, isPending, isSuccess, isFetched } = useQuery({ queryKey: key, queryFn: () => fetchBidding(id) })
   console.log(data?.data)
   if (isPending) {
      return <Loading />
   }
   console.log(data?.data.auctionDate)
   return (
      <>
         <PopUpAdd>
            <BiddingForm data={data?.data} />
         </PopUpAdd>
      </>
   )
}

export default EditBidding