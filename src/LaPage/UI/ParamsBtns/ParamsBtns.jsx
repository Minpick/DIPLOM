import React from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import style from './ParamsBtns.module.scss'

const ParamsBtns = ({ statuses}) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const statusParam = searchParams.get('status')
   const displayed = statuses.map((status) => {
      return (
         <NavLink
         key={status.status}
            to={`?status=${status.status}`}
            style={() => {
               return {
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