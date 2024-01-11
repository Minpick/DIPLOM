import React from 'react'
import style from './TeamSection.module.scss'
import ks from '../../images/team/ks.jpg'
import ma from '../../images/team/ma.jpg'
import ol from '../../images/team/ol.jpg'


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
                     <img src={ks} alt=""/>
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
                     <img src={ma} alt=""/>
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
                     <img src={ol} alt=""/>
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