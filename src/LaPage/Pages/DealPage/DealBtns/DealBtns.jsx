import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import style from './DealBtns.module.scss'
import classNames from 'classnames'


async function fetchDeals(id) {
   const data = await axios.get(`${BASE_URL}/deal/${id}`)
   return data
}

const DealBtns = () => {
   const { id } = useParams()
   const { data } = useQuery({ queryKey: ['deals'], queryFn: () => fetchDeals(id) })
   const [showList, setShowList] = useState(false)
   const list = data?.data.map((el, index, arr) => {
      return (
         <>
            <Link
               className={style.list_item}
               to={`/la/clients/${id}/deal`}
               onClick={() => setShowList(false)}
            >
               {el.name}
            </Link>
            {index === arr.length - 1 &&
               <Link
               to={`/la/clients/${id}/deal/new`}
                  className={style.plus}>
                  <span>&#43;</span>
               </Link>
            }
         </>
      )
   })
   return (
      <>
         {data?.data.length !== 0 &&
            <div className={classNames('form_btn', style.wrapper)}>
               {!showList && <Link
                  className={style.link}
                  to={`/la/clients/${id}/deal`}
               >
                  {data?.data[0].name}
               </Link>}
               {showList && <div className={style.list}>{list}</div>}
               <div
                  onClick={() => setShowList((prev) => !prev)}
                  className={style.triangle_down}>

               </div>
            </div>
         }
         {data?.data.length === 0 &&
            <div
               className='form_btn'
            >Создать сделку
            </div>}
      </>
   )
}

export default DealBtns