import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import style from './ParamsBtns.module.scss'

const ParamsBtns = ({ statuses}) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const statusParam = searchParams.get('status')
   const recipientId=searchParams.get('recipientId')
   const displayed = statuses.map((status) => {
      return (
         <NavLink
         
         key={status.status}
            to={`?status=${status.status}${recipientId?`&recipientId=${recipientId}`:''}`}
            style={() => {
               return {
                  color:"#5a5a5a",
                  fontSize:'1.1rem',
                  fontWeight:'700',
                  border: statusParam == status.status ? "1px solid #c1c1c1" : "",
                  backgroundColor: statusParam == status.status ? "transparent" : ""
               }
            }}
            end
            className={style.page__navbar_btn}>{status.name}</NavLink>
      )
   })
   return (
      <ul className={style.page__navbar_btns}>
         {displayed}
      </ul>
   )
}

export default ParamsBtns