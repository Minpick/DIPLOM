import React from 'react'
import style from './AdvSection.module.scss'

const AdvSection = () => {
  return (
   <section className={style.adv} id="adv">
   <div className={style.container}>
     <div className={style.adv__inner}>
       <div className={style.adv__item}>
         <svg className={style.adv__check} width="80px" height="80px" viewBox="0 0 24 24" >

           <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
             <g id="Check">
               <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24">

               </rect>
               <circle id="Oval" stroke="#cda05f" strokeWidth="2" strokeLinecap="round" cx="12" cy="12" r="9">

               </circle>
               <path d="M8.5,12.5 L10.151,14.5638 C10.3372,14.7965 10.6843,14.8157 10.895,14.605 L15.5,10"
                 id="Path" stroke="#cda05f" strokeWidth="2" strokeLinecap="round">

               </path>
             </g>
           </g>
         </svg>
         <h5 className={style.adv__heading}>
           Результативность
         </h5>
         <div className={style.adv__text}>
           Находим наиболее выгодное, рациональное решение и добиваемся положительных результатов
         </div>
       </div>
       <div className={style.adv__item}>
         <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path fillRule="evenodd" clipRule="evenodd"
             d="M12.444 1.35396C11.6474 0.955692 10.6814 1.33507 10.3687 2.16892L7.807 9.00001L4 9.00001C2.34315 9.00001 1 10.3432 1 12V20C1 21.6569 2.34315 23 4 23H18.3737C19.7948 23 21.0208 22.003 21.3107 20.6119L22.9773 12.6119C23.3654 10.7489 21.9433 9.00001 20.0404 9.00001H14.8874L15.6259 6.7846C16.2554 4.89615 15.4005 2.8322 13.62 1.94198L12.444 1.35396ZM9.67966 9.70225L12.0463 3.39119L12.7256 3.73083C13.6158 4.17595 14.0433 5.20792 13.7285 6.15215L12.9901 8.36755C12.5584 9.66261 13.5223 11 14.8874 11H20.0404C20.6747 11 21.1487 11.583 21.0194 12.204L20.8535 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H20.4369L20.0202 17H17C16.4477 17 16 17.4477 16 18C16 18.5523 16.4477 19 17 19H19.6035L19.3527 20.204C19.2561 20.6677 18.8474 21 18.3737 21H8V10.9907C8.75416 10.9179 9.40973 10.4221 9.67966 9.70225ZM6 11H4C3.44772 11 3 11.4477 3 12V20C3 20.5523 3.44772 21 4 21H6V11Z"
             fill="#cda05f" />
         </svg>
         <h5 className={style.adv__heading}>
           Честность
         </h5>
         <div className={style.adv__text}>

           Не даем лишних надежд и озвучиваем реальные шансы на положительный исход дела
         </div>
       </div>
       <div className={style.adv__item}>
         <svg className={style.adv__light} width="80px" height="80px" viewBox="0 0 24 24" 
         >
           <title>Lightning-Bolt</title>
           <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
             <g id="Lightning-Bolt">
               <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24">

               </rect>
               <path
                 d="M6.8618,11.2764 L10.8618,3.27639 C10.9465,3.107 11.1196,3 11.309,3 L17.0397,3 C17.4442,3 17.6813,3.45534 17.4493,3.78673 L15.0507,7.21327 C14.8187,7.54466 15.0558,8 15.4603,8 L16.9129,8 C17.3401,8 17.5705,8.50106 17.2925,8.8254 L7.96557,19.7068 C7.59763,20.1361 6.91173,19.7207 7.1217,19.1957 L9.72572,12.6857 C9.85709,12.3573 9.61522,12 9.26148,12 L7.30902,12 C6.93733,12 6.69558,11.6088 6.8618,11.2764 Z"
                 id="Path" stroke="#cda05f" strokeWidth="2" strokeLinecap="round">

               </path>
             </g>
           </g>
         </svg>
         <h5 className={style.adv__heading}>
           Профессионализм
         </h5>
         <div className={style.adv__text}>
           В нашем центре работают специалисты с опытом работы более 15 лет
         </div>
       </div>
     </div>
   </div>
 </section>
  )
}

export default AdvSection