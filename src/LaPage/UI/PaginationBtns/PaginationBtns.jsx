import React from 'react'
import style from './PaginationBtns.module.scss'

const PaginationBtns = ({page,setPage}) => {
  return (
   <div className={style.arrow}
   >
   <svg 
   onClick={()=>setPage(page => Math.max(page - 1, 0))}
   className={page===0?style.disabled:''}
   
   width="18px" height="17px" viewBox="0 0 18 17"  >
   <g transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
       <polygon className={style.arrow_pl} points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
       <polygon className={style.arrow_pl_fixed} points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
       <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
   </g>
</svg>
   <svg 
   onClick={()=>setPage(page=>page+1)}
   width="18px" height="17px" viewBox="-1 0 18 17" >
   <g>
       <polygon className={style.arrow_pl} points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
       <polygon className={style.arrow_pl_fixed} points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
       <path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
   </g>
</svg>
   </div>
  )
}

export default PaginationBtns