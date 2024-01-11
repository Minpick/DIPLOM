import React from 'react'
import style from './TeamSection.module.scss'


const TeamSection = () => {
   return (
      <section className={style.team} id="team">
         <div className={style.team__heading}>
            <div className={style.container}>
               <div className={style.team__heading_content}>
                  Наша команда
               </div>
            </div>
         </div>
         <div className={style.container}>
            <ul className={style.team__list}>
               <li className={style.team__item}>
                  <div className={style.team__image}>
                     <img src="src/LandingPage/images/team/ks.jpg" alt=""/>
                  </div>
                  <div className={style.team__content}>
                     <div className={style.team__name}>
                        Альховская Ксения
                     </div>
                     <div className={style.team__pos}>
                        Руководитель
                     </div>
                  </div>
               </li>
               <li className={style.team__item}>
                  <div className={style.team__image}>
                     <img src="src/LandingPage/images/team/ma.jpg" alt=""/>
                  </div>
                  <div className={style.team__content}>
                     <div className={style.team__name}>
                        Абрамова Мария
                     </div>
                     <div className={style.team__pos}>
                        Ведущий юрист
                     </div>
                  </div>
               </li>
               <li className={style.team__item}>
                  <div className={style.team__image}>
                     <img src="src/LandingPage/images/team/ol.jpg" alt=""/>
                  </div>
                  <div className={style.team__content}>
                     <div className={style.team__name}>
                        Воробьева Олеся
                     </div>
                     <div className={style.team__pos}>
                        Юрист
                     </div>
                  </div>
               </li>
            </ul>
         </div>
      </section>
   )
}

export default TeamSection